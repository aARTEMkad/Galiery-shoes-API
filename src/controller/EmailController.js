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
        subject: req.body.subjectText,
        text: req.body.textbody, // Текст письма
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('error send email:', error);
        } else {
            console.log('email completed send!:', info.response);
        }
    });
}





