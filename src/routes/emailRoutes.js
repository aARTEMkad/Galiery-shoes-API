const express = require('express')
const Router = express.Router()

const { SendEmailMessage, GetAllEmailMessage } = require('../controller/EmailController')

Router.use(express.json());

Router.get('/api/email/getall', GetAllEmailMessage)

Router.post('/api/email/send', SendEmailMessage)


module.exports = Router