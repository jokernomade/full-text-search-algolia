import algoliasearch from 'algoliasearch/lite'

const client = algoliasearch('WGNZ0VGP2J', 'd4ab8889c9c4c96a275d0aef841f26cc')
const index = client.initIndex('365codigo');

export default class Algolia {
  static search = async (text,limit) => {
    try{
      const {hits} = await index.search(text,{hitsPerPage: 20})
      const results = []

      hits.forEach(hit => {
        results.push({
          id: hit.objectID,
          type: 'account',
          name: hit.title,
          description: hit.desc,
          thumb: hit.thumb,
          display: {
            title: hit.title,
            description: hit.desc,
            thumb: hit.thumb
          }
        })
      })
      
      return results.slice(0,limit)
    }catch(e){

    }
    return []
  }
}

