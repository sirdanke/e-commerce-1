const bcrypt = require('bcrypt')


module.exports = { 
    encrypt(user, cb) {
        bcrypt
            .genSalt(10, function(err,salt){
                if(err){
                    cb(err, null)
                } else {
                    bcrypt
                        .hash(user.password, salt, function(err,hash){
                            if(err) {
                                cb(err, null)
                            } else {
                                cb(null, hash)
                            }
                    })
                }
            })
    },
    decrypt(userpassword, hash) {
        return new Promise((resolve,reject) =>{
            bcrypt
                .compare(userpassword, hash)
                .then(response => {

                    resolve(response)
                })
                .catch(err => {
                    reject(err)

                })
        })
    }

}