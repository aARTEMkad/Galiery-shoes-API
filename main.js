const mongoose = require('mongoose')
const express = require('express')
const cookieParser = require('cookie-parser');
const app = express();

const ShoesRouter = require('./src/routes/ShoesRouter')
const emailRouter = require('./src/routes/emailRoutes')
const RegistraScription = require('./src/routes/RegistraScriptionRouter')
const userRouter = require('./src/routes/UserRouter')

const { auditToken } = require('./src/service/jwt_token')

require('dotenv').config()
const PORT = process.env.PORT || 3001


mongoose.connect(process.env.CONNECT_DB).then(() => {
    console.log("Connected MongoDB!")

    app.use(cookieParser())
    // app.use((req, res, next) => {
    //     console.log("audit ")
    //     console.log(req.cookies.AccessToken)
    //     console.log(req.cookies.RefreshToken)
    //     next()
    // })
    app.use(ShoesRouter, emailRouter, RegistraScription, userRouter)
    app.use(express.urlencoded({extended: true}))

    app.listen(PORT, (req) => {
        console.log(`starting back end port: ${PORT}`)
    })

}).catch((req) => {
    console.log(req)
})