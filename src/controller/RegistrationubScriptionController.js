const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your_email@gmail.com',
        pass: 'your_password',
    },
})


exports.RegistraScription = async (req, res) => {
    try {
        console.log('KURAW>', process.env.PORT)
        const mailOptions = {
            from: 'your_email@gmail.com',
            to: 'recipient@example.com',
            subject: 'Hello from Node.js',
            text: 'This is a test email sent from Node.js',
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