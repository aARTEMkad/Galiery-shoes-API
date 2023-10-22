const mongoose = require('mongoose')
const express = require('express')
const app = express();


const Router = require('/src/routes/routes.email.js')



const PORT = process.env.PORT || 3000

app.use(Router)

app.listen(PORT, (req) => {
    console.log(`starting back end port: ${PORT}`)
})

mongoose.connect().then().catch()