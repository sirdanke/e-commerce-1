
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.should();
const app = require('../app')
const User = require('../models/users')
chai.use(chaiHttp)
const fs = require('fs')
let access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOTBjZDI5YzJmZDIwNjE2OTBlNDJjZSIsInJvbGUiOiJhZG1pbiJ9._fQlCrDXvpHwCY8kC6ojJPZg21mVvszOVY5rWxi5XbM'
let user_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOTdmZGY0MGRkNjgxMmVlOGE0OTQwMSIsInJvbGUiOiJidXllciIsImlhdCI6MTU1MzQ2NDgyN30.IylXLBj072YQ43EQqJ-3fpfNl3hMqajfL40I6y6UUpw"
const Products = require('../models/product')





describe('GET/transaction, testing for product endpoint', function () {
    describe('it should return status 200 with success all transaciton', function () {
        it('should return status 200 with value object', function (done) {

            chai
                .request(app)
                .get('/transactions')
                .set('access_token', access_token)
                .end(function (err, response) {
                    response.should.have.status(200)
                    response.should.be.an('object')
                    response.body.should.be.an('array')
                    done()
                })
        })
    })
    describe('POST/product with error status', function () {


        it('should return status 400 with value not authorzie', function (done) {
            chai
                .request(app)
                .get('/transactions')
                .end(function (err, response) {
                    response.should.have.status(402)
                    response.body.should.be.an('object')
                    response.body.should.have.property('message')
                    response.body.message.should.equal("you're not authorize for this session")
                    done()

                })
        })

        it('should return status 400 with value not authorize', function (done) {
            chai
                .request(app)
                .get('/transactions')
                .set('access_token', user_token)
                .end(function (err, response) {
                    response.should.have.status(404)
                    response.body.should.be.an('object')
                    response.body.should.have.property('message')
                    response.body.message.should.equal("your not authorize for this action")
                    done()

                })
        })

       
    })


    describe('it should return status 200 with success get user transaciton', function () {
        it('should return status 200 with value object', function (done) {

            chai
                .request(app)
                .get('/transactions/user')
                .set('access_token', user_token)
                .end(function (err, response) {
                    response.should.have.status(200)
                    response.should.be.an('object')
                    response.body.should.be.an('array')
                    done()
                })
        })
    })

  

})