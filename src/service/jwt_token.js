const jwt = require('jsonwebtoken')


class User {
    async createTokens(User) {
        
    }
}

exports.createTokens = (User) => {
    try{
        const userData = {
            userId: User.id,
            isAdmin: User.isAdmin 
        }

        const AccessToken = jwt.sign(userData, process.env.ACCESS_JWT_TOKEN_KEY, { expiresIn: '30m' })
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

exports.RefreshToken = (User, token, Key) => { // --
    try{
        const decoded = jwt.verify(token, Key)
        if(decoded != NULL){
            const userData = {
                userId: User.id,
                isAdmin: User.isAdmin 
            }

            const AccessToken = jwt.sign(userData, process.env.ACCESS_JWT_TOKEN_KEY, { expiresIn: '20m' })

            return AccessToken
        } else {
            return NULL
        }
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

