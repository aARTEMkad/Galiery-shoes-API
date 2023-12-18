const mongoose = require('mongoose')

const ShoesShema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    
    product: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    size: [Number],

    vendorcode: {
        type: String,
    },

    color: {
        type: [String]
    },

    isSoon: {
        type: Boolean,
    },

    front_photo: {
        filename: String,
        originalname: String,
        path: String,
        data: Buffer,
    },

    back_photo: {
        filename: String,
        originalname: String,
        path: String,
        data: Buffer,
    },

    top_photo: {
        filename: String,
        originalname: String,
        path: String,
        data: Buffer,
    },

    aspect_photo: {
        filename: String,
        originalname: String,
        path: String,
        data: Buffer,
    },
})

module.exports = mongoose.model('Shoes', ShoesShema)