const express = require('express')
const Router = express.Router()


const shoesValidations = require('../validations/shoes')
const { GetShoes, AddShoes, DeleteShoes, UpdateShoes } = require('../controller/ShoesController')

Router.use(express.json());

// Router.get('/shoes/getlist')

Router.post('/shoes/add', AddShoes)

// Router.delete('/shoes/delete')

// Router.put('/shoes/update')







module.exports = Router