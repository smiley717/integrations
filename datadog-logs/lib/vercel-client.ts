interface Options extends Omit<RequestInit, 'body'> {
  body?: { [key: string]: string | number | string[] }
}

interface Params {
  accessToken: string
  teamId?: string | null
}

class VercelClient {
  accessToken: string
  teamId?: string | null

  constructor(params: Params) {
    this.accessToken = params.accessToken
    this.teamId = params.teamId
  }

  async fetch(path: string, options: Options = { method: 'GET' }) {
    const { method } = options

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.accessToken}`,
      ...options.headers
    }

    const body =
      headers['Content-Type'] === 'application/json'
        ? JSON.stringify(options.body)
        : options.body

    const res = await fetch(
      path + (this.teamId ? `?teamId=${this.teamId}` : ''),
      {
        method,
        headers,
        ...(options.body && { body })
      } as RequestInit
    )

    let json

    try {
      json = await res.json()
    } catch (e) {
      json = null
    }

    if (!res.ok) {
      console.error(json)
      throw new Error(`Request to Vercel API failed with status ${res.status}.`)
    }

    return json
  }

  getConfiguration(id) {
    return this.fetch(
      `https://vercel.com/api/v1/integrations/configuration/${id}`
    )
  }

  getLogDrains() {
    return this.fetch(`https://vercel.com/api/v1/integrations/log-drains`)
  }

  createLogDrain(type, url, projectId = null) {
    return this.fetch('https://vercel.com/api/v1/integrations/log-drains', {
      method: 'POST',
      body: {
        name: 'Datadog Log Drain',
        type,
        url,
        ...(projectId && { projectId })
      }
    })
  }

  deleteLogDrain(id) {
    return this.fetch(
      `https://vercel.com/api/v1/integrations/log-drains/${id}`,
      { method: 'DELETE'}
    )
  }
}

export default VercelClient
