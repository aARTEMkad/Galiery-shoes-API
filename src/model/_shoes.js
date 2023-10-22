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
        type: Int32,
        required: true
    },

    size: [Int32],

    photo: {
        data: [Buffer],
        type: [String],
    },

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