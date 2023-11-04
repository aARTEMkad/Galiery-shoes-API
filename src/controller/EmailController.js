const EmailMessageModel = require('../model/_emailMessage')
const { validationResult } = require('express-validator')

exports.SendEmailMessage = async (req, res) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty())
        {
            res.status(400).json({ errors: errors.array()})
        } else {
            const emailMessage = new EmailMessageModel({
                fullName: req.body.fullName,
                numberPhone: req.body.numberPhone,
                email: req.body.email,
                message: req.body.message
            })
    
            emailMessage.save().then(() => {
                res.status(201)
                res.setHeader('Content-Type', 'application/json')
                res.json(emailMessage)
            }).catch((err) => {
                console.log(err)
                res.status(502)
            })
        }       
    } catch(err) {
        console.log(err)
        res.status(404)
    }
}

exports.GetAllEmailMessage = async (req, res) => {
    try{
        const allEmailMessage = await EmailMessageModel.find({})

        res.status(200)
        res.setHeader('Content-Type', 'application/json')
        res.json(allEmailMessage)
    } catch(err) {
        console.log(err)
    }
}

exports.GetIdEmailMessage = async (req, res) => {
    try {
        const emailMessage = await EmailMessageModel.findById(req.params.id)

        res.status(200)
        res.setHeader('Content-Type', 'application/json')
        res.json(emailMessage)
    } catch(err) {
        console.log(err)
        res.status(404)
    }
}

exports.DeleteEmailMessage = async (req, res) => {
    try{
        const emailMess = await EmailMessageModel.findByIdAndDelete({ _id: req.params.id})
        res.status(200)
        res.setHeader('Content-Type', 'application/json')
        res.json(emailMess)
    } catch(err) {
        console.log(err)
        res.status(404)
    }
}