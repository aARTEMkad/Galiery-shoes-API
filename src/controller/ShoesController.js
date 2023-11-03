const fs = require('fs')
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
        if(req.files && Object.keys(req.files).length == 4)
        {
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
        } else {
            const path = __dirname.replace('src/controller', '')

            req.files[0] ? fs.unlink(path + req.files[0].path, (err) => console.log(err)) : console.log('0 - the file is not deleted')
            req.files[1] ? fs.unlink(path + req.files[1].path, (err) => console.log(err)) : console.log('1 - the file is not deleted')
            req.files[2] ? fs.unlink(path + req.files[2].path, (err) => console.log(err)) : console.log('2 - the file is not deleted')
            req.files[3] ? fs.unlink(path + req.files[3].path, (err) => console.log(err)) : console.log('3 - the file is not deleted')

            res.status(404)
            res.setHeader('Content-Type', 'application/json')
            res.json(req.files)
        }
        
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

            fs.unlink(path + Shoes.front_photo.path, (err) => { if(err){ console.log(err) } else{ console.log('good deleted')}})
            fs.unlink(path + Shoes.back_photo.path, (err) => { if(err){ console.log(err) } else{ console.log('good deleted')}})
            fs.unlink(path + Shoes.top_photo.path, (err) => { if(err){ console.log(err) } else{ console.log('good deleted')}})
            fs.unlink(path + Shoes.aspect_photo.path, (err) => { if(err){ console.log(err) } else{ console.log('good deleted')}})

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




// -----
exports.UpdateShoes = async (req, res) => { // JSON

    try{
        
        if(req.params.updatePhoto == 'true') {
            if(req.files && Object.keys(req.files).length == 4)
            {
                const oldShoes = await ShoesModel.findById(req.params.id)
                const path = __dirname.replace('src/controller', '')

                fs.unlink(path + oldShoes.front_photo.path, (err) => { if(err){ console.log(err) } else{ console.log('good deleted')}})
                fs.unlink(path + oldShoes.back_photo.path, (err) => { if(err){ console.log(err) } else{ console.log('good deleted')}})
                fs.unlink(path + oldShoes.top_photo.path, (err) => { if(err){ console.log(err) } else{ console.log('good deleted')}})
                fs.unlink(path + oldShoes.aspect_photo.path, (err) => { if(err){ console.log(err) } else{ console.log('good deleted')}})
    

                req.body.front_photo = {
                    filename: req.files[0].filename,
                    originalname: req.files[0].originalname,
                    path: req.files[0].path
                }
                req.body.back_photo = {
                    filename: req.files[1].filename,
                    originalname: req.files[1].originalname,
                    path: req.files[1].path
                }
                req.body.top_photo = {
                    filename: req.files[2].filename,
                    originalname: req.files[2].originalname,
                    path: req.files[2].path
                }
                req.body.aspect_photo = {
                    filename: req.files[3].filename,
                    originalname: req.files[3].originalname,
                    path: req.files[3].path
                }

                const shoes = await ShoesModel.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
                res.status(200)
                res.json({shoes})
            } else {
                res.status(400)
                res.send('error')
            }
        } else {
            const shoesId = req.params.id
            const shoes = await ShoesModel.findByIdAndUpdate({_id: shoesId}, req.body, {new: true})
            res.status(200)
            res.json({shoes})
        }
    } catch(err) {
        console.log(err)
        res.status(404)
    }
}

