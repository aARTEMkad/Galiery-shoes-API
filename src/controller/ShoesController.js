const { captureRejectionSymbol } = require('nodemailer/lib/xoauth2')
const ShoesModel = require('../model/_shoes')




exports.GetShoesId = async (req, res) => {
    try{
        const Shoes = await ShoesModel.findById(req.params.id)
        
        res.status(200)
        res.setHeader('Content-Type', 'application/json')
        res.json(Shoes)
    } catch(err) {
        console.log(err)
        res.status(404)
    }
}

exports.GetAllShoes = async (req, res) => {
    try{
        const Shoes = await ShoesModel.find({})

        res.status(200)
        res.setHeader('Content-Type', 'application/json')
        res.json(Shoes)
    } catch(err) {
        console.log(err)
        res.status(502)
    }
}

exports.AddShoes = async (req, res) => {
    try{
        const newShoes = new ShoesModel({
            name: req.body.name,                
            product: req.body.product,
            price: req.body.price,
            size: req.body.size,
            vendorcode: req.body.vendorcode,
            color: req.body.color,
    
            front_photo: {
                filename: req.files[0].filename,
                originalname: req.files[0].originalname,
                path: req.files[0].path
            },
            back_photo: {
                filename: req.files[1].filename,
                originalname: req.files[1].originalname,
                path: req.files[1].path
            },
            top_photo: {
                filename: req.files[2].filename,
                originalname: req.files[2].originalname,
                path: req.files[2].path
            },
            aspect_photo: {
                filename: req.files[3].filename,
                originalname: req.files[3].originalname,
                path: req.files[3].path
            }
        })

        newShoes.save().then(() => {
            res.status(201)
            res.setHeader('Content-Type', 'application/json')
            res.json(newShoes)
        }).catch((err) => {
            console.log(err)
            res.status(502)
        })
    } catch(err) {
        console.log(err)
        res.status(400)
    }
}

exports.DeleteShoes = async (req, res) => {
    
}

exports.UpdateShoes = async (req, res) => {
    
}

