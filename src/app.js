const express = require('express')

const app  = express()
const routes = require('./routes/user.routes')


app.use(express.json());
app.use('/api/v1/users',routes)



module.exports =  app
