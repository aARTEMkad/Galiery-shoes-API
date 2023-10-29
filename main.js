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



// const ObjectId = require('mongodb').ObjectId;
// app.get('/photo/:id', (req, res) => {
//     var filename = req.params.id;
//     db.collection('myCollection').findOne({ '_id': ObjectId(filename) }, (err, result) => {
//         if (err) return console.log(err)
//         res.contentType('image/jpeg');
//         res.send(result.image.buffer)
//     })
// })

app.get('/photo/:id', async (req, res) => {
    var filename = req.params.id
    const getPhoto = await ShoesModel.findById(filename)
    
    res.contentType('image/png')
    res.send(getPhoto.Image.data)

    //res.send(getPhoto)
})

app.get('/photo/all', async (req, res) => {
    try{
        const getInfo = await ShoesModel.find()

        // res.contentType('application/json')
        // res.send(getInfo)
    
    }
    catch(err)
    {
        console.log(`Cyka ${err}`)
    }
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