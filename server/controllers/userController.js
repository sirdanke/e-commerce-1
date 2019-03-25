const User = require('../models/users')
const { decrypt } = require('../helpers/encrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    register(req, res) {
        User
            .create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {

                let path = Object.keys(err.errors)
                let obj = {}
                path.forEach(a => {
                    obj[a] = err.errors[a].message
                })
                res.status(400).json({ error: obj })
            })
    },
    login(req, res) {
        User
            .findOne({
                email: req.body.email
            })
            .populate('cart.product')
            .then(user => {
                if (user) {
                    return decrypt(req.body.password, user.password)
                        .then(response => {
                            if (response) {
                                res.status(200).json({
                                    user: user._id,
                                    role: user.role,
                                    cart : user.cart,
                                    access_token: jwt.sign({
                                        id: user._id,
                                        role: user.role
                                    }, process.env.JWT_SECRET),
                                    user: user._id
                                })
                            } else {
                                res.status(400).json({ error: 'email or password wrong' })
                            }
                        })
                } else {
                    res.status(400).json({ error: 'email or password wrong' })
                }
            })
            .catch(err => {
                res.status(500).json({ error: 'internal server error' })
            })
    },
    addProductToCart(req, res) {
        User
            .findOneAndUpdate({
                _id: req.userId
            }, {
                    $push: { cart: req.body.product }
                }, { new: true })
            .then(data => {
                return User.findById(req.userId)
                    .populate({path : 'cart.product'})
            })
            .then(data => {
                res.status(200).json({ cart: data.cart })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    getUserCart(req,res) {
        User
            .findOne({
                _id : req.userId
            })
            .populate('cart.product')
            .then(user => {
                res.status(200).json({cart : user.cart})
            })
            .catch(err=> {
                res.status(500).json(err)
            })
    },
    tokenVerification(req,res) {
        res.status(200).json({role : req.role})
    }
}