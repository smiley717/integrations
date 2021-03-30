interface Params {
  region: string
  apiKey: string
}

const validateApiKey = async (params: Params): Promise<boolean> => {
  const { region, apiKey } = params

  const endpoint = region === 'US' ?
    'https://api.datadoghq.com' :
    'https://api.datadoghq.eu'

  const res = await fetch(`${endpoint}/api/v1/validate`, {
    headers: {
      'Content-Type': 'application/json',
      'DD-API-KEY': apiKey
    },
    method: 'GET'
  })

  return res.ok
}

export default validateApiKey
