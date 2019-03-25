const User = require('../models/users')

function cekProductInsideCart(req,res, next) {
    User
        .findById(req.userId)
        .then(user => {
            let quantityInside = false
            let data = user.cart
            user.cart.forEach((e,i) => {
                if(e.product == req.body.product.product._id) {
                 
                    quantityInside = true
                    data[i].quantity += Number(req.body.product.quantity)
                    // query.quantity = e.product.quantity += Number(req.body.quantity) 
                }
            });
            if(quantityInside) {
                return User.findOneAndUpdate({
                    _id : req.userId
                    
                },{ $set : {cart : data}, new : true})
                .then(userData => {
                    res.status(200).json(userData)
                })
            } else {
                next()
            }

        })
        .catch(err => {
            next(err)
        })
}

module.exports = cekProductInsideCart