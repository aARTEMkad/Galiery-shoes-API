const bcrypt = require('bcrypt')

const UserSchema = require('../model/_user')


exports.Registration = async (req, res) => {
    try {

        if((req.body.verified_password == req.body.password) && (req.body.verified_email))
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
                res.status(201)
                res.setHeader('Content-Type', 'application/json')
                res.json(Users)// continue add token
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
        const User = await UserSchema.findOne({email: req.body.email})

        res.setHeader('Content-Type', 'application/json')
        res.json(User)
        res.status(200)
    } catch(err) {
        console.log(err)
        res.status(404)
    }
}