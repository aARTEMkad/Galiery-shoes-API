const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = require('../model/_user')
const JwtToken = require('../service/jwt_token')

exports.Registration = async (req, res) => {
    try {
        if((req.body.verified_password == req.body.password) && (req.body.verified_email == req.body.email))
        {
            const pass = await bcrypt.hash(req.body.password, 3)

            const Users = new UserSchema({
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                password: pass,
                phone_number: req.body.phone_number,
                isAcceptGetInfo: req.body.isAcceptGetInfo,
                isAcceptReadDeclaration: req.body.isAcceptReadDeclaration,
                isAdmin: req.body.isAdmin,
            })

            Users.save().then(() => {
                const Tokeny = JwtToken.createTokens(Users)

                if(Tokeny === null) {
                    res.status(500)
                    res.end()
                } else {
                //    res.setHeader('set-cookie', [`AccessToken=${Tokeny.AccessToken}`, `RefreshToken=${Tokeny.RefreshToken}`])
                    res.cookie('AccessToken', Tokeny.AccessToken, {path: '/'})
                    res.cookie('RefreshToken', Tokeny.RefreshToken, {path: '/'})
                    res.status(201)
                    res.send({message: "everything is done"})
                }
            }).catch((err) => {
                console.log(err)
                res.status(400)
                res.json(`err: ${err}`)
            })
        } else {
            res.status(400)
            res.json({error: "Error password or email"})
        }
    } catch(err) {
        console.log(err)
        res.status(400)
    }
}

exports.Login = async (req, res, next) => { // +
    try {
        try {
            const User = await UserSchema.findOne({email: req.body.email})

            if(User){
                if(bcrypt.compare(req.body.password, User.password)){
                    const Tokeny = JwtToken.createTokens(User)
    
                    if(Tokeny === null) {
                        res.status(500)
                        res.send({err: "error"})
                    } else {
                        //res.setHeader('set-cookie', [`AccessToken=${Tokeny.AccessToken}`, `RefreshToken=${Tokeny.RefreshToken}`])
                        res.cookie('AccessToken', Tokeny.AccessToken, {path: '/'})
                        res.cookie('RefreshToken', Tokeny.RefreshToken, {path: '/'})
                        //console.log(Tokeny.RefreshToken)
                        res.status(200)
                        res.send({message: "everything is done"})
                    }
                } else {
                    res.status(400)
                    res.send({message: "incorrect information"})
                }
            } else {
                res.status(404).json({message: "don't found user"})
            }
        } catch(err){
            console.log(err)
            res.status(400)
        }
    } catch(err) {
        console.log(err)
        res.status(500)
    }
    next()
}

exports.TokenUpdate = async (req, res) => { // rework(używać kiedy access token nie dżiała)
    try {
        const Key = process.env.REFRESH_JWT_TOKEN_KEY
        console.log(req.cookies)
        const RefreshToken = jwt.verify(req.cookies.RefreshToken, Key)
        if(RefreshToken) {
            const User = await UserSchema.findById(RefreshToken.userId)

            const userData = {
                userId: User.id,
                isAdmin: User.isAdmin 
            }
            res.cookie('AccessToken', jwt.sign(userData, process.env.ACCESS_JWT_TOKEN_KEY, { expiresIn: '20m' }), {path: '/'})

            //res.setHeader('set-cookie', [`AccessToken=${jwt.sign(userData, process.env.ACCESS_JWT_TOKEN_KEY, { expiresIn: '20m' })}`])
            res.status(200).json({message: "good!"})
        }
    } catch(err){
        console.log(err)
        res.status(500).json({message: "error"})
    }
}

exports.logout = async (req, res) => { // +
    try{
        
        if(req.cookies.RefreshToken)
        {
            res.clearCookie('RefreshToken', { path: '/' })
            res.clearCookie('AccessToken', { path: '/' })
            res.status(200).json({message: "user logout"})    
        } else {
            res.status(404).json({message: "don't logout user"})
        }
    } catch(err) {
        res.status(500).json({message: "error"})
    }
}