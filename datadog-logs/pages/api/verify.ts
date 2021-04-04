import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import exchangeCodeForAccessToken from 'lib/exchange-code-for-access-token'
import { NextApiRequest, NextApiResponse } from 'next'
import { init } from 'lib/sentry'

init()

export default async function verify(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.body

  const { userId, configurationId } = await exchangeCodeForAccessToken(code)

  const auth = jwt.sign({ userId, configurationId }, process.env.CLIENT_SECRET)

  res.setHeader('set-cookie', cookie.serialize('auth', auth, { path: '/' }))

  res.status(200).send({ message: 'Verified.' })
}