const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: 'mindzeal430@gmail.com',
        pass: '*********************8$',
    },
})

exports.SendEmail = async (req, res) => {
    const mailOptions = {
        from: req.body.sendersAddres, // Адрес отправителя
        to: 'mindzeal430@gmail.com', // Адрес получателя
        subject: "Helping",
        text: req.body.fullName + req.body.textbody * req.body.numberPhone, // Текст письма
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('error send email:', error);
            res.status(200)
        } else {
            console.log('email completed send!:', info.response);
            res.status(400)
        }
    });
}





