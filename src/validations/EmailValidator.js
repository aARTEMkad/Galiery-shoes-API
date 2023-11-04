const {body} = require('express-validator');

module.exports = emailValidator = [
    body('fullName', 'Inncorect information').not().isEmpty(),
    body('numberPhone', 'Incorect information').isLength({ min: 3 }).not().isEmpty(),
    body('email', 'Inncorect email').isEmail(),
    body('message','Inncorect information').not().isEmpty()
]