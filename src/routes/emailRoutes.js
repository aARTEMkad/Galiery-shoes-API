const express = require('express')
const Router = express.Router()

const { SendEmailMessage, GetAllEmailMessage, GetIdEmailMessage, DeleteEmailMessage } = require('../controller/EmailController')
const emailValidator = require('../validations/EmailValidator')

Router.get('/api/email/getall', GetAllEmailMessage)

Router.get('/api/email/get/:id', GetIdEmailMessage)

Router.post('/api/email/send', emailValidator, SendEmailMessage)

Router.delete('/api/email/delete/:id', DeleteEmailMessage)

module.exports = Router