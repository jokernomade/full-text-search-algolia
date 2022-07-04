const express     = require('express')
const bodyParser  = require('body-parser')
const path        = require('path')
const cors        = require('cors')
const app         = express()

const { v4: uuidv4 } = require('uuid')

const {saveOrUpdateDocument,deleteDocument} = require('./algolia')

const logErrors = (err, req, res, next) => {
  console.error(err.stack)
  next(err)
}

app.use(cors({origin:'*'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.post('/dev', async (req, res, next) => {
  const {data} = req.body
  
  data.objectID = uuidv4()

  await saveOrUpdateDocument(data)

  res.json({id: data.objectID})
})

app.delete('/dev/:id', async (req, res, next) => {
  const {id} = req.params

  await deleteDocument(id)

  res.json({})
})

app.use(express.static(path.join(__dirname, 'build')))
app.use(logErrors)

app.listen(5000,()=>{
  console.log('Your server is running')
})
