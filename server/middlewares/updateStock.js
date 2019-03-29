
const Product = require('../models/product')
function updateStock(req,res, next) {
    
    Product
        .findById(req.body.product.product._id)
        .then(data => {
            if(data.stock < Number(req.body.product.quantity)) {
                res.status(400).json({message :'sorry our stock cannot match your order'})
            } else {
                let currentStock = data.stock -= Number(req.body.product.quantity)
                // console.log(currentStock, "===STOCK");
                
                return Product
                    .findOneAndUpdate({
                        _id : data._id
                    }, {$set : {stock : currentStock}}, {new : true}
                )
                .then(data => {
                    next()
                })
            }        
        })
        .catch(err => {
            res.status(500).json(err)
        })
}

module.exports = updateStock