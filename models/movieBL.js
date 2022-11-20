const restDAL = require('../DALs/restDAL');


const getMovies = function()
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

module.exports = {getMovies,getUser,getUserById,isUserExist,deleteUser,login,savePwd,updateUserName}