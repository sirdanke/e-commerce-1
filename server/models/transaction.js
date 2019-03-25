const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    transactions: [{ product: { type: Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }],
    grandTotal: {
        type: Number,
        required: true
    },
    shipped : {
        type : Boolean,
        default : false
    },
    received : {
        type : Boolean,
        default : false
    }
}, { timestamps: true })

const Transaction = mongoose.model('Transactions', transactionSchema)
module.exports = Transaction

