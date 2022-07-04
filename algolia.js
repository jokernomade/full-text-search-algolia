const algoliasearch = require("algoliasearch")

const config = {
  algoliaAppId: 'WGNZ0VGP2J',
  algoliaAPIKey: '4dbc74f4fff3a429e87ac419e275c46a',
  algoliaIndexName: '365codigo'
}

const client = algoliasearch(config.algoliaAppId, config.algoliaAPIKey)
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

