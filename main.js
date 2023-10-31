const mongoose = require('mongoose')
const express = require('express')
const app = express();

const Router = require('./src/routes/routes')

const PORT = process.env.PORT || 3000


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