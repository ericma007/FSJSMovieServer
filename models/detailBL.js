const jsonFileDAL=require('../DALs/jsonFileDAL')


//add details of new user/existing user to file
const addUserDetails= async function(userDetails) {

    res=await getDetails()
    let index= res.findIndex(item => item.id===userDetails.id)
    if(index===-1) res.push(userDetails)
    else res.splice(index,1,userDetails)
    return jsonFileDAL.writeFile(jsonFileDAL.fileMap.get('USER'),res)
}


const deleteDetails= async function(userId){

    try {
        let res=await getDetails()
        let index=res.findIndex((item)=> item.id==userId)
        if(index===-1) throw("user is not found in users file")
        res.splice(index,1)
        return jsonFileDAL.writeFile(jsonFileDAL.fileMap.get('USER'),res)
    }
    catch(err) {
        throw(err)
    }
}


function getDetails() {
    return jsonFileDAL.getData(jsonFileDAL.fileMap.get('USER'))
 }
 
 
 function getUserDetails(subId,allUserDetails) {
     return new Promise((resolve,reject)=> {
        if(!allUserDetails) {
            getDetails()
            .then((details)=> {
                let userDetails=details.find(user=>user.id==subId)
                resolve(userDetails)
            })
            .catch(err=> reject(err))
        }
        else {
             resolve(allUserDetails.find(user=>user.id==subId))
        }
    })
 }
 module.exports = {addUserDetails, getDetails, getUserDetails,deleteDetails}