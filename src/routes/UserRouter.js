const express = require('express')
const Router = express.Router()

const userController = require('../controller/UserController')
const UserController = new userController()

Router.use(express.json());

Router.post('/user/registration', UserController.Registration)

Router.post('/user/login', UserController.Login)

Router.get('/user/update', UserController.TokenUpdate)

Router.get('/user/logout', UserController.logout)

module.exports = Router