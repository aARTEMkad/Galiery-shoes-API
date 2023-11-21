const express = require('express')
const Router = express.Router()

const { Registration, Login, TokenUpdate, logout } = require('../controller/UserController')

Router.use(express.json());

Router.post('/api/user/registration', Registration)

Router.post('/api/user/login', Login)

Router.get('/api/token/update', TokenUpdate)

Router.get('/api/user/logout', logout)

module.exports = Router