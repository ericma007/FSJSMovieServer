const jsonFileDAL=require('../DALs/jsonFileDAL')


const addUserPermissions=  async function(subPermissions) {
    console.log(subPermissions)
    res=await getPermissions()
    let index= res.findIndex(item => item.id===subPermissions.id)
    if (index===-1) res.push(subPermissions)
    else res.splice(index,1,subPermissions)
    return jsonFileDAL.writeFile(jsonFileDAL.fileMap.get('PERM'),res)
}

 


async function deletePermissions(userId){

    try {
        let res=await getPermissions()
        let index=res.findIndex((item)=> item.id==userId)
        if(index===-1) throw("user is not found in permission file")
        res.splice(index,1)
        return jsonFileDAL.writeFile(jsonFileDAL.fileMap.get('PERM'),res)
    }
    catch(err) {
        throw(err)
    }
}

function getPermissions() {
    return jsonFileDAL.getData(jsonFileDAL.fileMap.get('PERM'))
 }

function getUserPermissions(userId,userPermissions) {
    return new Promise((resolve,reject)=> {
        if (!userPermissions) {
            getPermissions()
            .then((permissions)=> {
                let userPermissions=permissions.find(permission=>permission.id==userId)
                resolve(userPermissions)})
            .catch(err=> reject(err))
        }
        else{ //all permissions are passed as a parameter
            resolve(userPermissions.find(permission=>permission.id==userId))
        }
    })
}

module.exports = {addUserPermissions, getPermissions,deletePermissions,getUserPermissions}