import { LOG_FORMAT } from 'lib/constants'
import cosmos, { Collections } from 'lib/cosmos'
import exchangeCodeForAccessToken from 'lib/exchange-code-for-access-token'
import getDatadogLogEndpoint from 'lib/get-datadog-log-endpoint'
import validateApiKey from 'lib/validate-api-key'
import VercelClient from 'lib/vercel-client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration } from 'types'
import { init } from 'lib/sentry'

init()

export default async function setup(req: NextApiRequest, res: NextApiResponse) {
  const { region, apiKey, code } = req.body

  const apiKeyIsValid = await validateApiKey({ region, apiKey })

  if (!apiKeyIsValid) {
    return res.status(422).json({
      code: 'invalid-api-key',
      message: 'Please provide a valid API key.'
    })
  }

  try {
    const {
      configurationId,
      accessToken,
      userId,
      teamId
    } = await exchangeCodeForAccessToken(code)

    const vercel = new VercelClient({
      accessToken,
      teamId
    })

    const configuration = await vercel.getConfiguration(configurationId)
    const datadogLogEndpoint = getDatadogLogEndpoint(region, apiKey)

    if (configuration.projectSelection === 'all') {
      await vercel.createLogDrain(LOG_FORMAT, datadogLogEndpoint)
    } else {
      const { projects } = configuration

      for (const projectId of projects) {
        await vercel.createLogDrain(LOG_FORMAT, datadogLogEndpoint, projectId)
      }
    }

    await cosmos.createDocument<Configuration>(Collections.CONFIGURATIONS, {
      id: configurationId,
      userId,
      teamId,
      accessToken,
      region,
      apiKey,
      createdAt: Date.now(),
      updatedAt: Date.now()
    })

    return res.status(201).json({
      message: 'Integration added.'
    })
  } catch (e) {
    console.error(e)

    return res.status(500).json({
      message: 'Could not add integration.'
    })
  }
}
