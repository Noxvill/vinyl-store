const express = require('express')
const router = require('./routes/routes')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use('/api', router)
app.use((error, req, res)=>{

    console.error(error, req, res)
    res.status(500).send('server error xd')

})
module.exports= app