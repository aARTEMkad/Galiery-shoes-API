const mongoose = require('mongoose')
const express = require('express')
const app = express();

const Router = require('./src/routes/routes')



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
            const newImage = new shoesModel({
                name: req.body.name,
                product: req.body.product,
                price: req.body.price,
                size: req.body.size,
                vendoCode: req.body.vendoCode,
                color: req.body.color,
                CImage: {
                    Iname: req.body.namePhoto,
                    Image: {
                        data: req.file.filename,
                        contentType: 'image/png'
                    }
                }
            })

            newImage.save()
            .then(() => res.send('success'))
            .catch((err) => res.send(`error ${err}`))
        }
    })
})


mongoose.connect('mongodb+srv://aARTEMkad:qwe123@shoesdb.gtahm1m.mongodb.net/?retryWrites=true&w=majority').then(() => {
    console.log("Connected MongoDB!")

    app.use(Router)

    app.listen(PORT, (req) => {
        console.log(`starting back end port: ${PORT}`)
    })

}).catch((req) => {
    console.log(req)
})