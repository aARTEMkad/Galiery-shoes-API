const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'artemkovel2007@gmail.com',
        pass: 'ййййййййййй',
    },
})



exports.SendEmail = async (req, res) => {
    const mailOptions = {
        from: "artemkovel2007@gmail.com", // Ад
        to: 'artemkovel2008@gmail.com', // Адрес получателя
        subject: "Helping",
        text: req.body.fullName + req.body.textbody * req.body.numberPhone, // Текст письма
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('error send email:', error);
           // res.status(400)
        } else {
            console.log('email completed send!:', info.response);
          //  res.status(200)
        }
    });
}





