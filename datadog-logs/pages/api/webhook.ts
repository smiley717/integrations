import { LOG_FORMAT } from 'lib/constants'
import cosmos, { Collections } from 'lib/cosmos'
import getDatadogLogEndpoint from 'lib/get-datadog-log-endpoint'
import VercelClient from 'lib/vercel-client'
import verifyWebhookSignature from 'lib/verify-webhook-signature'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration } from 'types'

export default async function webhook(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    if (!verifyWebhookSignature(req)) {
      return res.status(403).json({
        code: 'invalid-signature',
        message: 'Signature of payload did not match.'
      })
    }

    if (req.body.type === 'integration-configuration-permission-updated') {
      const configurationId = req.body.payload.configuration.id

      const config = await cosmos.getDocumentByIdOrNull<Configuration>(
        Collections.CONFIGURATIONS,
        configurationId
      )

      if (!config) {
        return res.status(200).send('Received.')
      }

      const { accessToken, region, apiKey, teamId } = config
      const datadogLogEndpoint = getDatadogLogEndpoint(region, apiKey)

      const vercel = new VercelClient({ accessToken, teamId })

      const { projectSelection } = await vercel.getConfiguration(
        configurationId
      )
      const logDrains = await vercel.getLogDrains()

      const logDrainForAllProjects = logDrains.find(
        logDrain => logDrain.projectId === null
      )

      // project selection changed from "all" to "selected" or list of projects has changed
      if (projectSelection !== 'all') {
        // project selection changed from "all" to "selected"
        if (logDrainForAllProjects) {
          await vercel.deleteLogDrain(logDrainForAllProjects.id)
        }

        // project selection is "selected" but list of projects has changed
        for (const projectId of req.body.payload.projects.added) {
          const logDrainForProjectId = logDrains.find(
            logDrain => logDrain.projectId === projectId
          )

          if (!logDrainForProjectId) {
            await vercel.createLogDrain(LOG_FORMAT, datadogLogEndpoint, projectId)
          }
        }

        for (const projectId of req.body.payload.projects.removed) {
          const logDrainForProjectId = logDrains.find(
            logDrain => logDrain.projectId === projectId
          )

          if (logDrainForProjectId) {
            await vercel.deleteLogDrain(logDrainForProjectId.id)
          }
        }
      }

      // project selection changed from "selected" to "all"
      if (projectSelection === 'all') {
        for (const logDrain of logDrains) {
          if (logDrain.projectId) {
            await vercel.deleteLogDrain(logDrain.id)
          }
        }

        if (!logDrainForAllProjects) {
          await vercel.createLogDrain(LOG_FORMAT, datadogLogEndpoint)
        }
      }
    }

    if (req.body.type === 'integration-configuration-removed') {
      const configurationId = req.body.payload.configuration.id

      await cosmos.deleteDocumentById(
        Collections.CONFIGURATIONS,
        configurationId
      )
    }
  }

  return res.status(200).send('Received.')
}
