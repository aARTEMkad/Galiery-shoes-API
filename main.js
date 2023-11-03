const mongoose = require('mongoose')
const express = require('express')
const app = express();

const Router = require('./src/routes/routes')


require('dotenv').config()
const PORT = process.env.PORT || 3001


mongoose.connect(process.env.CONNECT_DB).then(() => {
    console.log("Connected MongoDB!")

    app.use(Router)
    app.use(express.urlencoded({extended: true}))

    app.listen(PORT, (req) => {
        console.log(`starting back end port: ${PORT}`)
    })

}).catch((req) => {
    console.log(req)
})