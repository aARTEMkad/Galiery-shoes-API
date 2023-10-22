const { Int32 } = require('bson')
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

    // photo: {
    //     data: [Buffer],
    //     type: [String],
    // },

    vendorСode: {
        type: String
    },

    color: {
        type: [String]
    }

})

module.exports = mongoose.model('Shoes', ShoesShema)

/* JSON shoes:

Name,
Product,
Price,
Size,
Photo,
Artykul,
Color*/