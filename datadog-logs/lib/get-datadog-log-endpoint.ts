import { DATADOG_HOSTS } from 'lib/constants'

const getDatadogLogEndpoint = (region: string, apiKey: string): string => {
  return `https://http-intake.logs.${DATADOG_HOSTS[region]}/v1/input/${encodeURIComponent(apiKey)}?ddsource=vercel`
}

export default getDatadogLogEndpoint
