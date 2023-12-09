const express = require('express')
const Router = express.Router()
const multer = require('multer')

const { GetShoesId, GetAllShoes, AddShoes, DeleteShoes, UpdateShoes } = require('../controller/ShoesController')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dest = 'uploads/'
        console.log('Destation:', dest)
        cb(null, dest)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

Router.get('/api/shoes/:id', GetShoesId)

Router.get('/api/shoes', GetAllShoes)

Router.post('/api/shoes/add', upload.fields([{ name: "FrontPhoto", maxCount: 1 }, { name: "BackPhoto", maxCount: 1}, { name: "TopPhoto", maxCount: 1 }, { name: "AspectPhoto", maxCount: 1 }]), AddShoes)

Router.delete('/api/shoes/delete/:id', DeleteShoes)

Router.put('/api/shoes/update/:id/:updatePhoto', upload.fields([{ name: "FrontPhoto", maxCount: 1 }, { name: "BackPhoto", maxCount: 1}, { name: "TopPhoto", maxCount: 1 }, { name: "AspectPhoto", maxCount: 1 }]), UpdateShoes)


module.exports = Router