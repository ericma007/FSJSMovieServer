const validPermissions=new Set(["RS","CS","DS","US","RM","CM","DM","UM"])

const validateUserInfo=function(userId,userName,userDetails,permissionsArr) {

    NotNullValidation(userId,userName,userDetails,permissionsArr)
    validateUserDetails(userDetails)
    validatePermissions(permissionsArr)
} 

const NotNullValidation= function(userID,userName,userDetails,permissionsArr) {
    if (!userID) throw(`cannot update user with empty user Id`)
    if (!userName) throw(`cannot update/save user with empty user name`)
    if (!userDetails) throw(`cannot update/save user with empty user details`)
    if (!permissionsArr ||permissionsArr.length==0 ) throw(`cannot update/save user without permissions`)
}


const validateUserDetails = function (userDetails) {
    if (!userDetails.firstName)  throw (`cannot update/save user with empty first name`)
    if (!userDetails.lastName)  throw (`cannot update/save user with empty last name`)
    let timeOut=userDetails.sessionTimeOut
    if (!timeOut || Number.isNaN(timeOut) || !(timeOut>= 5 && timeOut <= 30)) throw (`session timeOut ${timeOut} must be in range [5,30]`)

}

const validatePermissions = function (permArr) {
    let permSet=new Set(permArr)
    for (let permission of permSet.values()) {
        if (!validPermissions.has(permission)) throw(`invalid ${permission} value`)
    }

}

const validatePwd =function(pwd) {
    if (!pwd || pwd.length <5) {
        throw ("password length must be at least 5 characters")
    }
}

module.exports = {validateUserInfo,validPermissions,validatePwd}