const express = require('express')
const Router = express.Router()

const { RegistraScription } = require('../controller/RegistrationubScriptionController')

Router.post('/api/registration-of-scription', RegistraScription)

module.exports = Router
