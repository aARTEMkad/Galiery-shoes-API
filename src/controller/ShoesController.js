const fs = require('fs')
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
    try{
        const Shoes = await ShoesModel.findByIdAndDelete(req.params.id)

        res.status(200)
        if(Shoes)
        {
            const path = __dirname.replace('src/controller', '')

            console.log(path + Shoes.front_photo.path)

            if(fs.existsSync(path + Shoes.front_photo.path))
            {
                fs.unlink(path + Shoes.front_photo.path, (err) => console.log(err))
                fs.unlink(path + Shoes.back_photo.path, (err) => console.log(err))
                fs.unlink(path + Shoes.top_photo.path, (err) => console.log(err))
                fs.unlink(path + Shoes.aspect_photo.path, (err) => console.log(err))
            }

            res.setHeader('Content-Type', 'application/json')
            res.json(Shoes)
        } else {
            res.json('message: "there is no information"')
        }
    } catch(err) {
        console.log(err)
        res.status(404)
    }
}



exports.UpdateShoes = async (req, res) => { // JSON
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
    ShoesModel.findByIdAndUpdate(req.params.id, newShoes)
}

