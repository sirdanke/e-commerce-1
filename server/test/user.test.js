
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.should();
const app = require('../app')

const User = require('../models/users')

chai.use(chaiHttp)

before(function (done) {
    User
        .remove({})
        .then(() => {
            done()
        })
        .catch(err => {
            console.log(err)
        })
})

after(function (done) {
    User
        .remove({})
        .then(() => {
            done()
        })
        .catch(err => {
            console.log(err)
        })
})


describe('user testing', function () {

    describe('POST/users response with success register process', function () {

        it('should return a new object user with status 201', function (done) {
            chai
                .request(app)
                .post('/users')
                .send(
                    {
                        name: 'ahmad',
                        email: 'ahmad@mail.com',
                        password: 'Aa@123456'
                    })
                .end(function (err, response) {

                    response.should.be.an('object')
                    response.body.should.have.property('name')
                    response.body.should.have.property('email')
                    response.body.should.have.property('password')
                    done()

                })

        })
    })

    describe('/POST/users response for faailed register', function () {
        it('should return an error object with value /name cannot be blank/', function (done) {
            chai
                .request(app)
                .post('/users')
                .send(
                    {
                        name: '',
                        email: 'ahsukronmad@mail.co.id',
                        password: 'aT@123456'
                    }
                )
                .end(function (err, response) {

                    response.should.have.status(400)
                    response.should.be.an('object')
                    response.body.should.have.property('error')
                    response.body.error.should.property('name')
                    response.body.error.name.should.equal('name cannot be blank')
                    done()
                })

        })
        it('should return an error object with value /email cannot be blank/', function (done) {
            chai
                .request(app)
                .post('/users')
                .send(
                    {
                        name: 'ahmad',
                        email: '',
                        password: 'aT@2347656'
                    }
                )
                .end(function (err, response) {
                    response.should.have.status(400)
                    response.should.be.an('object')
                    response.body.should.have.property('error')
                    response.body.error.should.have.property('email')
                    response.body.error.email.should.equal('email cannot be blank')
                    done()
                })
        })
        it('should return an error object with value /password cannot be blank/', function (done) {
            chai
                .request(app)
                .post('/users')
                .send(
                    {
                        name: 'ibenk',
                        email: 'ahAmHAKALAad@mail.com',
                        password: ''
                    }
                )
                .end(function (err, response) {
                    response.should.have.status(400)
                    response.should.be.a('object')
                    response.body.should.have.property('error')
                    response.body.error.should.have.property('password')
                    response.body.error.password.should.equal('password cannot be blank')
                    done()
                })
        })
        it('should return an error with status 400 and with value /password length cannot less than 6/', function (done) {
            chai
                .request(app)
                .post('/users')
                .send(
                    {
                        name: 'ahmad',
                        email: 'ahLSLLSmad@mail.com',
                        password: '12345'
                    }
                )
                .end(function (err, response) {
                    response.should.have.status(400)
                    response.should.be.an('object')
                    response.body.should.have.property('error')
                    response.body.error.should.have.property('password')
                    response.body.error.password.should.equal('password lenght cannot less than 6')
                    done()
                })

        })
        it('should return an object error with status 400 and with value /invalid email format/', function (done) {
            chai
                .request(app)
                .post('/users')
                .send(
                    {
                        name: 'ahmad',
                        email: 'ahmad@mail',
                        password: '123a456TA@'
                    }
                )
                .end(function (err, response) {
                    response.should.have.status(400)
                    response.should.be.an('object')
                    response.body.should.have.property('error')
                    response.body.error.should.have.property('email')
                    response.body.error.email.should.equal('Invalid email format')
                    done()
                })
        })

        it('should  return an object error with status 400 with value /Password at least should have one number and both lower and uppercase letters and special characters/ ', function (done) {
            chai
                .request(app)
                .post('/users')
                .send(
                    {
                        name: 'ahmad',
                        email: 'ahmad@mail.com',
                        password: 'aaaaaaaT@'
                    }
                )
                .end(function (err, response) {
                    response.should.have.status(400)
                    response.should.be.an('object')
                    response.body.should.have.property('error')
                    response.body.error.should.have.property('password')
                    response.body.error.password.should.equal('Password at least should have one number and both lower and uppercase letters and special characters')
                    done()
                })
        })

        it('should  return an object error with status 400 with value /Password at least should have one number and both lower and uppercase letters and special characters/ ', function (done) {
            chai
                .request(app)
                .post('/users')
                .send(
                    {
                        name: 'ahmad',
                        email: 'ahmad@mail.com',
                        password: 'aT123456'
                    }
                )
                .end(function (err, response) {
                    response.should.have.status(400)
                    response.should.be.an('object')
                    response.body.should.have.property('error')
                    response.body.error.should.have.property('password')
                    response.body.error.password.should.equal('Password at least should have one number and both lower and uppercase letters and special characters')
                    done()
                })
        })

        it('should  return an object error with status 400 with value /Password at least should have one number and both lower and uppercase letters and special characters/ ', function (done) {
            chai
                .request(app)
                .post('/users')
                .send(
                    {
                        name: 'ahmad',
                        email: 'ahmHHDJDad@mail.com',
                        password: 'aa@23456'
                    }
                )
                .end(function (err, response) {
                    response.should.have.status(400)
                    response.should.be.an('object')
                    response.body.should.have.property('error')
                    response.body.error.should.have.property('password')
                    response.body.error.password.should.equal('Password at least should have one number and both lower and uppercase letters and special characters')
                    done()
                })
        })
    })

    describe('POST/users/login success value', function () {
        it('should have status 200 and return access_token and user token', function (done) {
            chai
                .request(app)
                .post('/users/login')
                .send(
                    {
                        email: 'ahmad@mail.com',
                        password: 'Aa@123456'
                    }
                )
                .end(function (err, response) {
                    response.should.have.status(200)
                    response.should.be.an('object')
                    response.body.should.have.property('access_token')
                    response.body.should.have.property('user')
                    done()
                })
        })
    })

    describe('POST/user/login with failed status', function () {
        it('should have status 400 and return message /email or password wrong', function (done) {
            chai
                .request(app)
                .post('/users/login')
                .send(
                    {
                        email: '',
                        password: '123456'
                    }
                )
                .end(function (err, response) {
                    response.should.have.status(400)
                    response.should.be.an('object')
                    response.body.should.have.property('error')
                    response.body.error.should.equal('email or password wrong')
                    done()
                })
        })

        it('should have status 400 and return message /email or password wrong', function (done) {
            chai
                .request(app)
                .post('/users/login')
                .send(
                    {
                        email: 'ahmad@mail.com',
                        password: '12345'
                    }
                )
                .end(function (err, response) {
                    response.should.have.status(400)
                    response.should.be.an('object')
                    response.body.should.have.property('error')
                    response.body.error.should.equal('email or password wrong')
                    done()
                })
        })

        it('should have status 400 and return message /email or password wrong', function (done) {
            chai
                .request(app)
                .post('/users/login')
                .send(
                    {
                        email: '',
                        password: ''
                    }
                )
                .end(function (err, response) {
                    response.should.have.status(400)
                    response.should.be.an('object')
                    response.body.should.have.property('error')
                    response.body.error.should.equal('email or password wrong')
                    done()
                })
        })
    })
})