
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.should();
const app = require('../app')
const User = require('../models/users')
chai.use(chaiHttp)
const fs = require('fs')
let access_token = ''
const Products = require('../models/product')
const jwt = require('jsonwebtoken')
require('dotenv').config()
let product = ''
let transaction = ''

before(function (done) {
    Products
        .remove({})
        .then(() => {
            done()
        })
        .catch(err => {
            console.log(err)
        })
})

before(function(done) {
    User
        .create({
            name : 'admin',
            email : 'admin@admin.com',
            password : 'aA@123'
        })
        .then(user => {
            console.log(user);
            
            access_token = jwt.sign({
                    id: user._id,
                    role: user.role
                },'RAHASIANEGARA')
            
            done()
        })
        .catch(err => {
            console.log(err);
            
        })
})

// after(function (done) {
//     Products
//         .remove({})
//         .then(() => {
//             done()
//         })
//         .catch(err => {
//             console.log(err)
//         })
// })



describe('testing products, testing for product endpoint', function () {
    describe('it should return status 200 with success create oproduct', function () {
        // it('should return status 200 with value object', function (done) {

        //     chai
        //         .request(app)
        //         .post('/products')
        //         .set('access_token', access_token)
        //         .attach('image', fs.readFileSync('/home/ahmad/Documents/phase2/3rdweek/e-commerce-1/server/test/ucl.jpg'), 'ucl.jpg')
        //         .type('form')
        //         .end(function (err, response) {
        //             response.should.have.status(201)
        //             response.body.should.have.property('image')
        //             done()
        //         })
        // })


        it('should return status 201 with value object new product', function (done) {
            chai
                .request(app)
                .post('/products')
                .set('access_token', access_token)
                .send({
                    data: {
                        name: 'sepatu nike',
                        description: 'ya sepatu',
                        price: 1,
                        stock: 3,
                        image: 'sepatu.jpg',
                        category: 'Shoes',
                        brand: 'nike'
                    }
                })
                .end(function (err, response) {
                    product = response.body

                    response.should.have.status(201)
                    response.body.should.be.an('object')
                    response.body.should.have.property('name')
                    response.body.should.have.property('description')
                    response.body.should.have.property('price')
                    response.body.should.have.property('stock')
                    response.body.should.have.property('_id')
                    response.body.should.have.property('image')
                    response.body.should.have.property('category')
                    response.body.should.have.property('brand')


                    // response.body.should.have.property('error')
                    // response.body.error.should.equal('path name required')
                    done()
                })
        })
    })
    describe('POST/product with error status', function () {


        it('should return status 400 with value path name required', function (done) {
            chai
                .request(app)
                .post('/products')
                .set('access_token', access_token)
                .send({
                    data: {
                        name: '',
                        description: 'aa',
                        price: 1,
                        stock: 1,
                        image: ' aaa',
                        category: 'Shoes'
                    }
                })
                .end(function (err, response) {
                    response.should.have.status(400)
                    response.body.should.be.an('object')
                    response.body.should.have.property('error')
                    response.body.error.should.equal('path name required')
                    done()
                })
        })

        it('should return status 400 with value path description required', function (done) {
            chai
                .request(app)
                .post('/products')
                .set('access_token', access_token)
                .send({
                    data: {
                        name: 'ahaha',
                        description: '',
                        price: 1,
                        stock: 1,
                        image: ' aaa'
                    }
                })
                .end(function (err, response) {
                    response.should.have.status(400)
                    response.body.should.be.an('object')
                    response.body.should.have.property('error')
                    response.body.error.should.equal('path description required')
                    done()
                })
        })

        it('should return status 400 with value path price required', function (done) {
            chai
                .request(app)
                .post('/products')
                .set('access_token', access_token)
                .send({
                    data: {
                        name: 'ahaha',
                        description: 'aaaa',
                        price: '',
                        stock: 1,
                        image: ' aaa'
                    }
                })
                .end(function (err, response) {
                    response.should.have.status(400)
                    response.body.should.be.an('object')
                    response.body.should.have.property('error')
                    response.body.error.should.equal('path price required')
                    done()
                })
        })

        it('should return status 400 with value path stock required', function (done) {
            chai
                .request(app)
                .post('/products')

                .send({
                    data: {
                        name: 'ahaha',
                        description: 'aaaa',
                        price: 1,
                        stock: '',
                        image: ' aaa'
                    }
                })
                .set('access_token', access_token)
                .end(function (err, response) {
                    response.should.have.status(400)
                    response.body.should.be.an('object')
                    response.body.should.have.property('error')
                    response.body.error.should.equal('path stock required')
                    done()
                })
        })

        it('should return status 400 with value path image required', function (done) {
            chai
                .request(app)
                .post('/products')
                .send({
                    data: {
                        name: 'ahaha',
                        description: 'aaaa',
                        price: 1,
                        stock: 1,
                        image: ''
                    }
                })
                .set('access_token', access_token)
                .end(function (err, response) {
                    response.should.have.status(400)
                    response.body.should.be.an('object')
                    response.body.should.have.property('error')
                    response.body.error.should.equal('path image required')
                    done()
                })
        })

        it('should return status 400 with value path brand required', function (done) {
            chai
                .request(app)
                .post('/products')
                .send({
                    data: {
                        name: 'ahaha',
                        description: 'aaaa',
                        price: 1,
                        stock: 1,
                        image: 'file foto',
                        brand: '',
                        category: ''
                    }
                })
                .set('access_token', access_token)
                .end(function (err, response) {
                    response.should.have.status(400)
                    response.body.should.be.an('object')
                    response.body.should.have.property('error')
                    response.body.error.should.equal('path brand required')
                    done()
                })
        })

        it('should return status 400 with value choose one category', function (done) {
            chai
                .request(app)
                .post('/products')
                .send({
                    data: {
                        name: 'ahaha',
                        description: 'aaaa',
                        price: 1,
                        stock: 1,
                        image: 'file foto',
                        brand: 'nike',
                        category: ''
                    }
                })
                .set('access_token', access_token)
                .end(function (err, response) {
                    response.should.have.status(400)
                    response.body.should.be.an('object')
                    response.body.should.have.property('error')
                    response.body.error.should.equal('Choose one category')
                    done()
                })
        })
    })

    describe('GET/ product  get all product data ', function() {
        describe('get/ product woith success value', function() {
            it('should return an array of object for allproduct data', function(done) {
                chai
                    .request(app)
                    .get('/products')
                    .end(function(err, response) {
                        response.should.have.status(200)
                        response.body.should.be.an('array')
                        response.body[0].should.have.property('name')
                        done()
                    })
            })
        })
    })

    describe('GET/ product/:id  get all product data ', function() {
        describe('get/ product woith success value', function() {
            it('should return an array of object for allproduct data', function(done) {
                chai
                    .request(app)
                    .get(`/products/${product._id}`)
                    .end(function(err, response) {
                        response.should.have.status(200)
                        response.body.should.be.an('object')
                        response.body.should.have.property('name')
                        done()
                    })
            })
        })
    })

    describe('POST/user/cart, it should return array of object success cart', function () {
        describe('it should return with status 200 with new cart data', function () {
            it('should return with status 200 with new cart data', function (done) {
                chai
                    .request(app)
                    .patch('/users/cart')
                    .send({
                        product: { product : product,
                            quantity: '1' },
                       
                    })
                    .set('access_token', access_token)
                    .end(function (err, response) {
                
                        
                        response.should.have.status(200)
                        // response.body.should.be.an('object')
                        // response.body.should.have.property('error')
                        // response.body.error.should.equal('Choose one category')
                        done()
                    })
            })
        })
    })

  



    describe('FOR ALL TRANSACTION ROUTES', function() {
        it('should return status 200 for new transaction', function(done){
            chai
                .request(app)
                .post('/transactions')
                .set('access_token', access_token)
                .send({
                    product,
                    grandTotal : 100000
                })
                .end(function(err, response) {
                    transaction = response.body
                    response.should.have.status(200)
                    done()
                })
        })

        it('should return status 200 for new updated shipping status', function(done){
            chai
                .request(app)
                .patch(`/transactions/${transaction._id}`)
                .set('access_token', access_token)
                .send( {shipped : true})
                .end(function(err, response) {
                    response.should.have.status(200)
                    done()
                })
        })
    })


    describe('DELETE/ product/:id  get all product data ', function() {
        describe('get/ product woith success value', function() {
            it('should return an array of object for allproduct data', function(done) {
                chai
                    .request(app)
                    .delete(`/products/${product._id}`)
                    .set('access_token', access_token)
                    .end(function(err, response) {
                        response.should.have.status(200)
                        response.body.should.be.an('object')
                        response.body.should.have.property('message')
                        done()
                    })
            })
        })
    })


})