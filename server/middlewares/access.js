const jwt = require('jsonwebtoken')
require('dotenv').config()
const Users = require('../models/users')

function access(req, res, next) {
    try {
        let decoded = jwt.verify(req.headers.access_token, process.env.JWT_SECRET)

        req.role = decoded.role
        req.userId = decoded.id
        next()

    } catch (err) {
        res.status(402).json({ message: "you're not authorize for this session" })
    }
}

module.exports = access