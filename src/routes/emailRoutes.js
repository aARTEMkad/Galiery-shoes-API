const express = require('express')
const Router = express.Router()

const emailController = require('../controller/EmailController')
const EmailController = new emailController()
const emailValidator = require('../validations/EmailValidator')

Router.get('/api/email/getall', EmailController.GetAllEmailMessage)

Router.get('/api/email/get/:id', EmailController.GetIdEmailMessage)

Router.post('/api/email/send', emailValidator, EmailController.SendEmailMessage)

Router.delete('/api/email/delete/:id', EmailController.DeleteEmailMessage)

module.exports = Router