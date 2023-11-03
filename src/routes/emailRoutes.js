const express = require('express')
const Router = express.Router()
const multer = require('multer')

const upload = multer()

const { SendEmailMessage, GetAllEmailMessage, DeleteEmailMessage } = require('../controller/EmailController')

Router.use(express.json());
Router.use(upload.fields([]))

Router.get('/api/email/getall', GetAllEmailMessage)

Router.post('/api/email/send', SendEmailMessage)

Router.delete('/api/email/delete/:id', DeleteEmailMessage)

module.exports = Router