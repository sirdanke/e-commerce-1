const Product = require('../models/product')
const User = require('../models/users')


module.exports = {
    create(req, res) {

        let data = {
            name: 'a',
            description: 'b',
            stock: 1,
            price: 1,
            image: '',
            brand: 'a',
            category: 'a'
        }

        if (req.file && req.body.data) {
            data = JSON.parse(req.body.data)
            data.image = req.file.cloudStoragePublicUrl

        } else if (req.file && !Req.body.data) {
            data.image = req.file.cloudStoragePublicUrl
        } else {
            data = req.body.data
        }
   

        Product
            .create({
                name: data.name,
                description: data.description,
                stock: data.stock,
                price: data.price,
                image: data.image,
                brand: data.brand,
                promo: data.promo,
                category: data.category,

            })
            .then(data => {

                res.status(201).json(data)
            })
            .catch(err => {

                let path = Object.keys(err.errors)
                res.status(400).json({ error: err.errors[path[0]].message })
            })

    },
    findAll(req, res) {
        Product
            .find()
            .then(products => {
                res.status(200).json(products)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    getById(req, res) {

        Product
            .findById(req.params.id)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    update(req, res) {
        let data = JSON.parse(req.body.data)
        if (req.file) {
            data.image = req.file.cloudStoragePublicUrl
        }
        Product
            .findOneAndUpdate({
                _id: req.params.id
            }, {
                    $set:
                    {
                        name: data.name,
                        description: data.description,
                        stock: data.stock,
                        price: data.price,
                        image: data.image,
                        brand: data.brand,
                        promo: data.promo,
                        category: data.category,

                    }
                }, {
                    new: true
                })
            .then(data => {
                return Product
                    .findById(data._id)

            })
            .then(data => {

                res.status(200).json(data)

            })
            .catch(err => {

                res.status(500).json(err)
            })
    },
    returnOldStock(req, res) {
        Product
            .findById(req.params.id)
            .then(product => {
                let data = product
                let newValue = product.stock += Number(req.body.returnedStock)
                return Product.findOneAndUpdate({
                    _id: data._id
                }, {
                        $set: { stock: newValue }
                    }, { new: true })
            })
            .then(data => {
                return User
                    .findOneAndUpdate({
                        _id: req.userId
                    }, {
                            $pull: {
                                cart: { product: data._id }
                            }
                        }, { new: true })
            })
            .then(data => {
                return User
                    .findById(req.userId)
                    .populate({ path: 'cart.product' })

            })
            .then(data => {
                res.status(200).json(data)

            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    delete(req, res) {
        Product
            .findOneAndDelete({
                _id: req.params.id
            })
            .then(data => {
                res.status(200).json({ message: 'data deleted' })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}