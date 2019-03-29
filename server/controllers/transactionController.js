const Transaction = require('../models/transaction')
const user = require('../models/users')


module.exports = {
    create(req, res) {
        Transaction
            .create({
                user: req.userId,
                transactions: req.body.product,
                grandTotal: req.body.grandTotal,
            })
            .then(data => {
                return user
                    .findByIdAndUpdate({
                        _id: req.userId
                    }, { $set: { cart: [] } }, { new: true })
            })
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    getAllTransaction(req, res) {
        Transaction
            .find()
            .populate({ path: 'transactions.product' })
            .populate('user')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    getByUserId(req, res) {
        Transaction
            .find({
                user: req.userId
            })
            .populate('transactions.product')
            .exec()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    updateStatus(req, res) {
        console.log(req.params.id, "====");
        
        Transaction
            .findOneAndUpdate({
                _id: req.params.id
            },
                req.body, {
                    new: true
                })
            .then(data => {
                return Transaction
                    .findById(data._id)
                    .populate('user')
                    .populate({ path: 'transactions.product' })
            })
            .then(data => {
                res.status(200).json(data)

            })
            .catch(err => {
                res.status(500).json(err)
            })

    }
}