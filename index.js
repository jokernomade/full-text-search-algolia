const express     = require('express')
const bodyParser  = require('body-parser')
const path        = require('path')
const cors        = require('cors')
const app         = express()

const logErrors = (err, req, res, next) => {
  console.error(err.stack)
  next(err)
}

app.use(cors({origin:'*'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/text', (req, res, next) => {
  res.json({text: 'This text came from backend.'})
})

app.use(express.static(path.join(__dirname, 'build')))
app.use(logErrors)

app.listen(5000,()=>{
  console.log('Your server is running')
})
