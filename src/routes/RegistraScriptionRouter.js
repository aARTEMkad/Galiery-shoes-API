const express = require('express')
const Router = express.Router()
const multer = require('multer')

//const upload = multer()

const { RegistraScription } = require('../controller/RegistrationubScriptionController')

Router.use(express.json());
//Router.use(upload.fields([]))

Router.post('/api/registration-of-scription', RegistraScription)

module.exports = Router
