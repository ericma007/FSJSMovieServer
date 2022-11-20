//based on this article
// https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1



const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;


let UserSchema = new mongoose.Schema({
    username: {type: String, /* required: true, index: { unique: true }*/ },
    password: {type: String},
    isAdmin: {type:Boolean,default:false}
})



//to be used for user creation
/*
UserSchema.pre('save', function(next) {
        console.log("pre hook")
        let user=this
        console.log(user)
        if (!user.username) { 
            next("user name cannot be empty")
        }
        mongoose.model('users', UserSchema).findOne({username:user.username})
        .then((res)=>{
            console.log(res)
            if(res) {
                console.log("duplicate")
                next("gfhffhfgh")
                next(`The user name $(user.username) already exists`)
                console.log("duplicate2")} 
        })
        .catch(err => next(err))

        //overridding whatever 
        this.isNewUser=true
        this.password=undefined
        next()
    })
*/
                
/*
UserSchema.pre('update', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });


});
*/



module.exports = mongoose.model('users', UserSchema)