const express = require('express')
const Router = express.Router()

const EmailController = require('../controller/EmailController')


Router.post('/gmail/send', validaions, EmailController.SendEmail)