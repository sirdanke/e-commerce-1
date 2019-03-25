
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.should();
const app = require('../app')
const User = require('../models/users')
chai.use(chaiHttp)
const fs = require('fs')
let access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOTBjZDI5YzJmZDIwNjE2OTBlNDJjZSIsInJvbGUiOiJhZG1pbiJ9._fQlCrDXvpHwCY8kC6ojJPZg21mVvszOVY5rWxi5XbM'
const Products = require('../models/product')

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

after(function (done) {
    Products
        .remove({})
        .then(() => {
            done()
        })
        .catch(err => {
            console.log(err)
        })
})



describe('POST/products, testing for product endpoint', function () {
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
                        category : 'Shoes'
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
                        brand : '',
                        category : ''
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
                        brand : 'nike',
                        category : ''
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

})