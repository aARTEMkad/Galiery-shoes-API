const express = require('express')
const Router = express.Router()
const multer = require('multer')

const { GetShoesId, GetAllShoes, AddShoes, DeleteShoes, UpdateShoes } = require('../controller/ShoesController')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})


const upload = multer({ storage: storage })

Router.use(express.json());

Router.get('/api/shoes/:id', GetShoesId)

Router.get('/api/shoes', GetAllShoes)

Router.post('/api/shoes/add', upload.array('PhotoShoes', 4), AddShoes)

Router.delete('/api/shoes/delete/:id', DeleteShoes)

Router.put('/api/shoes/update/:id/:updatePhoto', upload.array('PhotoShoes', 4), UpdateShoes)


module.exports = Router