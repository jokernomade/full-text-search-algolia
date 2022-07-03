const algoliasearch = require("algoliasearch")

const config = {
  algoliaAppId: 'WGNZ0VGP2J',
  algoliaAPIKey: '9053ab60736a925901b7da6a26adc196',
  algoliaIndexName: 'prod_global'
}

const client = algoliasearch.default(config.algoliaAppId, config.algoliaAPIKey)
const index = client.initIndex(config.algoliaIndexName)

exports.saveOrUpdateDocument = async (data) => {
  try{
    await index.partialUpdateObject(data, { createIfNotExists: true })
  }catch(e){
    console.log(e)
  }
}

exports.deleteDocument = async (id) => {
  await index.deleteObject(id)
}
