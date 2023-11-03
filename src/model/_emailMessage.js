const mongoose = require('mongoose')

const EmailMessageShema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true
    },
    numberPhone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
    }

})

module.exports = mongoose.model('EmailMessageSchema', EmailMessageShema)
