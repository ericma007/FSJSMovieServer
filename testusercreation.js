const orchestratorBL=require('./models/orchestratorBL')
const userModel = require('./models/userModel')
// create a user a new user

let subDetails = {
    firstName:"Eric",
    lastName:"Badoit",
    sessionTimeOut:15}

let permissions=["RS","CS","DS","US","RM","CM","DM","UM"]   


orchestratorBL.createUser('laurent192',subDetails,permissions)
.then(async res=>{
            console.log("res",res)
            let id=res[0]
            subDetails = {
                        firstName:"Eric",
                        lastName:"Perrier2",
                        sessionTimeOut:16}
            permissions=["RS","CM"]
            //return userModel.findById(id).exec()
            
            //res= await orchestratorBL.test()
            
            res= await orchestratorBL.updateUser(id,"laurent304",subDetails,permissions)
            console.log("issue: ",res)}
            
    )
    .catch(err=>console.log("test user creation/update err:",err))




// save user to database
/*
testUser.save(function(err) 
{
    if (err) throw err

    // fetch user and test password verification
    UserSchema.findOne({ username: 'yuppie' }, function(err, user) 
    {
        if (err) throw err

        // test a matching password
        user.comparePassword('Password123', function(err, isMatch) {
            if (err) throw err
            console.log('Password123:', isMatch); // -> Password123: true
        })

        // test a failing password
        user.comparePassword('123Password', function(err, isMatch) {
        if (err) throw err;
            console.log('123Password:', isMatch); // -> 123Password: false
        })
    })
})

*/