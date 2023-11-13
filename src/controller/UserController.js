const UserSchema = require('../model/_user')


exports.Registration = async (req, res) => {
    try {
        const Users = new UserSchema({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            verified_email: req.body.verified_email,
            password: req.body.password,
            verified_password: req.body.verified_password,
            phone_number: req.body.phone_number,
            isAcceptGetInfo: req.body.isAcceptGetInfo,
            isAcceptReadDeclaration: req.body.isAcceptReadDeclaration,
            isAdmin: req.body.isAdmin,
        })

        Users.save().then(() => {
            res.status(201)
            res.setHeader('Content-Type', 'application/json')
            res.json(Users)
        }).catch((err) => {
            console.log(err)
            res.status(400)
        })
    } catch(err) {
        console.log(err)
        res.status(400)
    }
}

exports.Login = async (req, res) => {
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