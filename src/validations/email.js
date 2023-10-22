const {body} = require('express-validator');

module.exports = emailValidator = [
    body('fullName', 'Inncorect information').isEmpty(false),
    body('numberPhone', 'Incorect information').length({min: 5}),
    body('sendersAddres', 'Inncorect information').isLength({min: 3}),
    body('textbody','Inncorect information').isLength({min: 3})
]