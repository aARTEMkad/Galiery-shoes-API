const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
    },

    surname: {
        type: String,
    },

    email: {
        type: String,
    },

    verified_email: {
        type: String,
    },

    password: {
        type: String,
    },

    verified_password: {
        type: String,
    },

    phone_number: {
        type: String,
    },

    isAcceptGetInfo: {
        type: Boolean,
    },

    isAcceptReadDeclaration: {
        type: Boolean,
    }
})

module.exports = mongoose.model('User', UserSchema)
