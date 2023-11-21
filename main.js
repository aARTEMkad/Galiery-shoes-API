const mongoose = require('mongoose')
const express = require('express')
const cookieParser = require('cookie-parser');
const app = express();

const ShoesRouter = require('./src/routes/ShoesRouter')
const emailRouter = require('./src/routes/emailRoutes')
const RegistraScription = require('./src/routes/RegistraScriptionRouter')
const userRouter = require('./src/routes/UserRouter')

const { auditToken } = require('./src/service/jwt_token')
const { tokenCheck } = require('./src/middlewares/token_check')

require('dotenv').config()
const PORT = process.env.PORT || 3001


mongoose.connect(process.env.CONNECT_DB).then(() => {
    console.log("Connected MongoDB!")

    app.use(cookieParser())
    app.use((req, res, next) => {
        
        const token = tokenCheck(req.cookies.AccessToken, process.env.ACCESS_JWT_TOKEN_KEY)
        if(token === NULL){
            res.status(401) // доробити ще на 403
        } else {
            next()
        }
        console.log("audit ")
        console.log(req.cookies.AccessToken)
        console.log(req.cookies.RefreshToken)
        
    })
    app.use(ShoesRouter, emailRouter, RegistraScription, userRouter)
    app.use(express.urlencoded({extended: true}))

    app.listen(PORT, (req) => {
        console.log(`starting back end port: ${PORT}`)
    })

}).catch((req) => {
    console.log(req)
})