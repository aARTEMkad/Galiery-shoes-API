const {body} = require('express-validator');

module.exports = shoesValidator = [
    body('name', 'Inncorect information'),
    body('product', 'Incorect information'),
    body('price', 'Inncorect information'),
    body('size','Inncorect information'),
    body('vendorCode', 'Inncorect information'),
    body('color','Inncorect information')
]