const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const { encrypt } = require('../helpers/encrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name cannot be blank']
    },
    password: {
        type: String,
        minlength: [6, 'password lenght cannot less than 6'],
        required: [true, 'password cannot be blank'],
        validate: [{
            validator(v) {
                return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/.test(v)
            }
            , message: 'Password at least should have one number and both lower and uppercase letters and special characters'
        }]
        // match : [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, 'Password at least should have one number and both lower and uppercase letters and special characters' ]
    },
    email: {
        type: String,
        unique: [true, 'email has already taken'],
        required: [true, 'email cannot be blank'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format'],
        validate: [{
            validator(v) {
                return new Promise((resolve, reject) => {
                    User
                        .findOne({ email: v })
                        .then(user => {
                            if (user && user._id != this._id) {
                                reject(false)
                            } else {
                                resolve(true)
                            }
                        })
                        .catch(err => {
                            throw err
                        })

                })
            },
            message: 'email has already taken'
        }]
    },
    role : {
        type : String,
        default : 'buyer'
    },
    cart : [{product : { type: Schema.Types.ObjectId, ref: 'Product' }, quantity : Number}]

})

userSchema.pre('save', function (next) {

    try {
        var user = this;
        if (!user.isModified('password')) return next();
        encrypt(user, function (err, hash) {
            if (err) {
                next(err)
            } else {
                user.password = hash;
                next();
            }
        })
    } catch (err) {
        next(err)
    }
})

userSchema.pre('save', function(next){
    let user = this
    if(user.email == 'admin@admin.com') {
        user.role = 'admin'
        next()
    } else {
        next()
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User




