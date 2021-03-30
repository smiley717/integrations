import mask from 'lib/mask'
import { pick } from 'ramda'
import { Configuration } from 'types'

export default function mapConfiguration(
  configuration: Configuration
): Pick<Configuration, 'id' | 'region' | 'apiKey' | 'createdAt' | 'updatedAt'> {
  return pick(['id', 'region', 'apiKey', 'createdAt', 'updatedAt'], {
    ...configuration,
    apiKey: mask(configuration.apiKey)
  })
}
