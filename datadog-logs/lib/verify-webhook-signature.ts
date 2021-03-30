import crypto from 'crypto'
import { NextApiRequest } from 'next'

const verifyWebhookSignature = (req: NextApiRequest): boolean => {
  const payload = JSON.stringify(req.body)

  const signature = crypto
    .createHmac('sha1', process.env.CLIENT_SECRET)
    .update(payload)
    .digest('hex')

  return signature === req.headers['x-vercel-signature']
}

export default verifyWebhookSignature