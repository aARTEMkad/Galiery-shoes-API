const express = require('express')
const Router = express.Router()

const registraScriptionController = require('../controller/RegistrationubScriptionController')
const RegistraScriptionController = new registraScriptionController()

Router.post('/api/registration-of-scription', RegistraScriptionController.RegistraScription)

module.exports = Router
