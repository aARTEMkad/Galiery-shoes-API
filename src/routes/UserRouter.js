const express = require('express')
const Router = express.Router()

const { Registration, Login } = require('../controller/UserController')

Router.use(express.json());

Router.post('/api/user/registration', Registration)

Router.post('/api/user/login', Login)

module.exports = Router