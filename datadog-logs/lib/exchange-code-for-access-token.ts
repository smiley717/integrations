import qs from 'querystring'

type AccessTokenResponse = {
  configurationId: string
  accessToken: string
  userId: string
  teamId: string
}

const exchangeCodeForAccessToken = async (code: string): Promise<AccessTokenResponse> => {
  const res = await fetch('https://api.vercel.com/v2/oauth/access_token', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    body: qs.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code,
      redirect_uri: `${process.env.HOST}/callback`
    })
  })

  const json = await res.json()

  if (!res.ok) {
    throw new Error(
      json?.error_description || 'Could not exchange Code for Access Token.'
    )
  }

  return {
    configurationId: json.installation_id,
    accessToken: json.access_token,
    userId: json.user_id,
    teamId: json.team_id
  }
}

export default exchangeCodeForAccessToken
