const { verifyToken } = require('../helpers/jwt')

module.exports = (req, res, next) => {
    try {
        var decoded = verifyToken(req.headers.token)
        req.decode = decoded;
        next()
    } catch (err) {
        res.status(401).json({message : "token not match"})
    }
}