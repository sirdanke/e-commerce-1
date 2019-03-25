const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name : {
        type :String,
        required : [true, 'path name required']
    },
    description : {
        type :String,
        required : [true, 'path description required']
    },
    price : {
        type :String,
        required : [true, 'path price required']
    },
    stock : {
        type :Number,
        required : [true, 'path stock required']
    },
    image : {
        type :String,
        required : [true, 'path image required']
    },
    promo : {
        type : Number,
        default : 0,
    },
    category : {
        type : String,
        required: [true, 'Choose one category']
    },
    brand : {
        type : String,
        required: [true, 'path brand required']
    }
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product