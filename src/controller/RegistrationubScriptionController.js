const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL,
        pass: process.env.PASS,
    },
})


exports.RegistraScription = async (req, res) => { // --
    try {
        const mailOptions = {
            from: process.env.GMAIL,
            to: req.body.gmail,
            subject: 'Hello from Node.js',
            text: `${req.body.Name}, ${req.body.Surname} ${req.body.numberPhone} This is a test email sent from Node.js`,
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
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