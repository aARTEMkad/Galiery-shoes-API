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
                res.status(201).setHeader('Content-Type', 'application/json').json(emailMessage)
            }).catch((err) => {
                console.log(err)
                res.status(502).json({message: `Error: ${err}`})
            })
        }       
    } catch(err) {
        console.log(err)
        res.status(404).json({message: `Error: ${err}`})
    }
}

exports.GetAllEmailMessage = async (req, res) => {
    try{
        const allEmailMessage = await EmailMessageModel.find({})

        res.status(200).setHeader('Content-Type', 'application/json').json(allEmailMessage)
    } catch(err) {
        console.log(err)
    }
}

exports.GetIdEmailMessage = async (req, res) => {
    try {
        const emailMessage = await EmailMessageModel.findById(req.params.id)

        res.status(200).setHeader('Content-Type', 'application/json').json(emailMessage)
    } catch(err) {
        console.log(err)
        res.status(404).json({message: `Error: ${err}`})
    }
}

exports.DeleteEmailMessage = async (req, res) => {
    try{
        const emailMess = await EmailMessageModel.findByIdAndDelete({ _id: req.params.id})
        res.status(200).setHeader('Content-Type', 'application/json').json(emailMess)
    } catch(err) {
        console.log(err)
        res.status(404).json({message: `Error: ${err}`})
    }
}