import cosmos from '@vercel/cosmosdb'

const Collections = {
  CONFIGURATIONS: 'configurations'
}

const collections = new Map([
  [
    Collections.CONFIGURATIONS,
    {
      partitionKey: 'id'
    }
  ]
])

const client = cosmos({
  databaseName: process.env.COSMOSDB_DB_NAME,
  endpoint: process.env.COSMOSDB_ENDPOINT,
  masterKey: process.env.COSMOSDB_MASTER_KEY,
  preferredLocations: process.env.COSMOSDB_PREFERRED_LOCATIONS,
  collections
})

export default client
export { Collections }
