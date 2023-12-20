const express = require('express')
const Router = express.Router()
const multer = require('multer')

const shoesController = require('../controller/ShoesController')
const ShoesController = new shoesController()

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

Router.get('/api/shoes/:id', ShoesController.GetShoesId)

Router.get('/api/shoes', ShoesController.GetAllShoes)

Router.post('/api/shoes/add', upload.fields([{ name: "FrontPhoto", maxCount: 1 }, { name: "BackPhoto", maxCount: 1}, { name: "TopPhoto", maxCount: 1 }, { name: "AspectPhoto", maxCount: 1 }]), ShoesController.AddShoes)

Router.delete('/api/shoes/delete/:id', ShoesController.DeleteShoes)

Router.put('/api/shoes/update/:id/:updatePhoto', upload.fields([{ name: "FrontPhoto", maxCount: 1 }, { name: "BackPhoto", maxCount: 1}, { name: "TopPhoto", maxCount: 1 }, { name: "AspectPhoto", maxCount: 1 }]), ShoesController.UpdateShoes)


module.exports = Router