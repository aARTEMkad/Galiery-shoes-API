const express = require('express')
const Router = express.Router()



Router.use(express.json());

Router.get('/shoes/getlist')

Router.post('/shoes/add')

Router.delete('/shoes/delete')

Router.put('/shoes/update')

module.exports = Router