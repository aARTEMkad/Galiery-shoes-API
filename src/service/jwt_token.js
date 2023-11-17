const jwt = require('jsonwebtoken')

exports.createTokens = (User) => {
    try{
        const userData = {
            userId: User.id,
            isAdmin: User.isAdmin 
        }

        const AccessToken = jwt.sign(userData, process.env.ACCESS_JWT_TOKEN_KEY, { expiresIn: '20m' })
        const RefreshToken = jwt.sign(userData, process.env.REFRESH_JWT_TOKEN_KEY, { expiresIn: '30d' })
        
        const ObjectToken = {
            AccessToken: AccessToken,
            RefreshToken: RefreshToken
        }
        return ObjectToken
    } catch(err) {
        return NULL
    }
}

exports.auditToken = (Token, Key) => {
    try{
        const decoded = jwt.verify(Token, Key)
        return true
    } catch(err) {
        return false
    }
}

