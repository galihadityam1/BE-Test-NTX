const jwt = require('jsonwebtoken');
const secret = 'secret'

exports.signToken = (payload) => {
    return jwt.sign(payload, secret)
}

exports.verifyToken =  (token) => {
    return jwt.verify(token, secret)
}