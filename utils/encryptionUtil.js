//based on this article
// https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1

const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10;


const comparePassword = function(candidatePassword,hash) 
{
    return new Promise((resolve,reject)=> {

        if (!candidatePassword) {reject("password to verify cannot be empty")}
    
        resolve(bcrypt.compare(candidatePassword,hash))
    })
}

const generateHash = function(plainPwd) {
    console.log("plainpwd:",plainPwd)
    return bcrypt.hash(plainPwd, SALT_WORK_FACTOR)
}

module.exports = {generateHash,comparePassword}