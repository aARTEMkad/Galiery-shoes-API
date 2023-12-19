const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try{
        const token = jwt.verify(req.cookies.AccessToken, process.env.ACCESS_JWT_TOKEN_KEY)
        next()
    } catch(err) {
        res.status(401).json({message: `Error - ${err}`})
    }
}

