const bcrypt = require('bcrypt')

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
                    res.setHeader('set-cookie', [`AccessToken=${Tokeny.AccessToken}`, `RefreshToken=${Tokeny.RefreshToken}`])
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

exports.Login = async (req, res) => { // --
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
                        res.setHeader('set-cookie', [`AccessToken=${Tokeny.AccessToken}`, `RefreshToken=${Tokeny.RefreshToken}`])
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
}