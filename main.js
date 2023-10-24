const mongoose = require('mongoose')
const express = require('express')
const app = express();

const Router = require('./src/routes/routes')
const ShoesModel = require('./src/model/_shoes')


const PORT = process.env.PORT || 3000


//multer
// ----
const multer = require('multer')
const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) =>
    {
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage: Storage,
}).single('testImage')
// ----c



// Photo

app.post('/upload_photo', (req,res) =>{
    upload(req, res, (err) => {
        if(err)
        {
            console.log(err)
        }
        else{
            console.log(`${req.body.Iname} -- ${req.body.vendorcode} -- ${req.file.filename}`)

            const newImage = new ShoesModel({
                name: req.body.name,                
                product: req.body.product,
                price: req.body.price,
                size: req.body.size,
                vendorcode: req.body.vendorcode,
                color: req.body.color,
                Iname: req.body.Iname,
                Image: {
                    data: req.file.filename,
                    contentType: 'image/png'
                }
            })


            newImage.save()
            .then(() => res.send('success'))
            .catch((err) => res.send(`Kurda error ${err}`))
        }
    })
})

//fowjeofijweoifjiowfj

mongoose.connect('mongodb+srv://aARTEMkad:qwe123@cluster0.xbbyrq7.mongodb.net/?retryWrites=true&w=majority').then(() => {
    console.log("Connected MongoDB!")

    app.use(Router)
    app.use(express.urlencoded({extended: true}))

    app.listen(PORT, (req) => {
        console.log(`starting back end port: ${PORT}`)
    })

}).catch((req) => {
    console.log(req)
})