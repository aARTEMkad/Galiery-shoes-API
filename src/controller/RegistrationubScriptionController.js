require('dotenv').config()
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL,
        pass: process.env.PASS,
    },
})


class RegistraScriptionController {
    async RegistraScription(req, res) { // --
        try {
            const mailOptions = {
                from: process.env.GMAIL,
                to: req.body.gmail,
                subject: 'Hello from Node.js',
                text: `${req.body.FullName}, ${req.body.numberPhone}. \n ${req.body.message}`,
            }
    
            transporter.sendMail(mailOptions, (err, info) => {
                if(err) {
                    console.log(process.env.GMAIL)
                    console.log('Error sending email: ', err);
                    res.status(400).json({ error: err })
                } else {
                    console.log('Email send: ', info.response)
                    res.status(200).json({ message: info.response })
                }
            })
        } catch(err) {
            console.log(err)
            res.status(404).json({ error: "error" })
        }
    }
}


module.exports = RegistraScriptionController