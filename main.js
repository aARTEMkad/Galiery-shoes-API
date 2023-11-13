const mongoose = require('mongoose')
const express = require('express')
const app = express();

const Router = require('./src/routes/routes')
const emailRouter = require('./src/routes/emailRoutes')
const RegistraScription = require('./src/routes/RegistraScriptionRouter')
const userRouter = require('./src/routes/UserRouter')

require('dotenv').config()
const PORT = process.env.PORT || 3001


mongoose.connect(process.env.CONNECT_DB).then(() => {
    console.log("Connected MongoDB!")

    app.use(Router)
    app.use(emailRouter)
    app.use(RegistraScription)
    app.use(userRouter)
    app.use(express.urlencoded({extended: true}))

    app.listen(PORT, (req) => {
        console.log(`starting back end port: ${PORT}`)
    })

}).catch((req) => {
    console.log(req)
})