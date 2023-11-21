
exports.tokenCheck = (Token, Key) => {
    try{
        const decoded = jwt.verify(Token, Key)
        return decoded
    } catch(err) {
        return null
    }
}