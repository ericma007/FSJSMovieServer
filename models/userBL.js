//const restDAL = require('../DALs/restDAL');
const userModel = require('./userModel');
const encryptionUtil= require('../utils/encryptionUtil');
const validationUtil = require('../utils/validationUtil');



const updateUserName =  function(userDB) {
    
    return userModel.findByIdAndUpdate(userDB._id,{username:userDB.username},{returnDocument:"after"}).exec()    
}



//login for user with defined password
const login=async function(userName,pwd) {
if (!userName || !pwd) throw("user or password cannot be empty")

try {
    validationUtil.validatePwd(pwd)
    let user=await getUser(userName)
    if (!user) {
        throw("non existing user: contact admin to create user first")
    }
    else { 
        console.log("user.password",user.password)
        if (user.password) { //user password was already saved 
                         
                let same = await encryptionUtil.comparePassword(pwd,user.password)
                if (same) {
                    return Promise.resolve("login successful")
                }
                else throw("password does not match the data stored in DB")       
        }
        else { //no password was defined - user must define is password 
            throw("define you password first before performing login")
        }
        
    }
}
catch(err) {
    throw(err)
}

}


const savePwd = async function(userName,newPwd,oldPwd) {

    try {
                
            let user=await getUser(userName)
            console.log("user:",user)
            if (user) {
                validationUtil.validatePwd(newPwd)
                if (user.password) { //user password was saved at least once
                        if(!oldPwd) throw("former password cannot be empty")
                        if (oldPwd===newPwd) throw("new and former passwords cannot be identical")    
                    
                        same = await encryptionUtil.comparePassword(oldPwd,user.password)

                        if (!same) {
                            throw("old password does not match the data stored in DB")       
                    }

                }
                

            
                hash=await encryptionUtil.generateHash(newPwd)
                return userModel.findByIdAndUpdate(user.id,{password:hash}).exec()
            }
            else {
                throw(`non existing user ${userName}: password cannot be saved/updated`)
            }
    }
    catch(err) {
        throw(err)
    }

}

const deleteUser=  function(userId)
{
   return userModel.findByIdAndDelete(userId).exec()
}


const getUserById= function(userId)
{
    return new Promise((resolve, reject) =>
    {
            userModel.findById(userId, function(err, user)
            {
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve(user)
                }
            })

    })
}


const getUser= function(userName)
{
    return new Promise((resolve, reject) =>
    {
            userModel.findOne({username:userName}, function(err, data)
            {
                console.log("err: ",err)
                console.log("data: ",data)
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve(data)
                }
            })
    })
}




isUserExist=async function(userName) {
    try {
        if (!userName) throw("user name cannot be empty")         
        res = await getUser(userName)
        if (res) return true
        else return false
    }
    catch(err){ throw err}
}


const getUsers = function()
{
    return new Promise((resolve, reject) =>
    {
            userModel.find({}, function(err, data)
            {
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve(data)
                }
            })

    })
}

module.exports = {getUsers,getUser,getUserById,isUserExist,deleteUser,login,savePwd,updateUserName}