const User = require('../../models/users')

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.should();
const app = require('../../app')

const User = require('../models/users')

chai.use(chaiHttp)



module.exports = {
    create(cb) {
        chai
            .request(app)
    },
    getTokn(cb) {
        User

    }
}