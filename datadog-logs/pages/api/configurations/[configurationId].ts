import cosmos, { Collections } from 'lib/cosmos'
import mapConfiguration from 'lib/map-configuration'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration } from 'types'
import jwt from 'jsonwebtoken'

export default async function configurations(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.cookies.auth) {
    return res.status(403).json({
      message: 'Forbidden.'
    })
  }

  let auth

  try {
    auth = jwt.verify(req.cookies.auth, process.env.CLIENT_SECRET)
  } catch (e) {
    if (e.name === 'JsonWebTokenError') {
      return res.status(403).json({
        message: 'Forbidden.'
      })
    } else {
      return res.status(500).json({
        message: 'Something went wrong.'
      })
    }
  }

  if (auth.configurationId !== req.query.configurationId) {
    return res.status(404).json({
      message: 'Not found.'
    })
  }

  if (req.method === 'GET') {
    const configuration = await cosmos.getDocumentByIdOrNull<Configuration>(
      Collections.CONFIGURATIONS,
      req.query.configurationId as string
    )

    if (!configuration) {
      return res.status(404).json({
        message: 'Not found.'
      })
    }

    return res.status(200).json(mapConfiguration(configuration))
  }

  return res.status(405).send({
    message: 'Method not allowed.'
  })
}
