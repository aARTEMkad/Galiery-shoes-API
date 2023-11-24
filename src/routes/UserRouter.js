const express = require('express')
const Router = express.Router()

const { Registration, Login, TokenUpdate, logout } = require('../controller/UserController')

Router.use(express.json());

Router.post('/user/registration', Registration)

Router.post('/user/login', Login)

Router.get('/user/update', TokenUpdate)

Router.get('/user/logout', logout)

module.exports = Router