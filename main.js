const express = require('express');
const userRouter = require('./routers/userRouter')
const subscriptionRouter = require('./routers/subscriptionRouter')
const jsonFileDal=require('./DALs/jsonFileDAL')
const userBL=require("./models/userBL")
const permissionBL=require("./models/permissionBL")
const detailBL=require("./models/detailBL")
const orchestratorBL=require("./models/orchestratorBL")
const cors=require('cors')

let app = express();

require('./configs/database');

app.use(express.json());
app.use(cors('*'))

app.use('/api/users', userRouter);
app.use('/api/subscriptions',subscriptionRouter)

app.use((error,req,resp,next) => {  
    console.log("server Express Error Handler",error.toString())
    return resp.status(500).json({ error: error.toString() });
})

console.log("listening to port 8001")
app.listen(8001)

//require('./testusercreation');  //performs

//userBL.isUserExist("joe").then(res=>console.log(res))
//userBL.getUser("joe").then(res=>console.log(res))


/* userBL.createUser("ss1a2",{firstName:"Joey9",lastName:"Ford",sessionExpire:10},['CM','RM'])
.then(res=>console.log(res))
.catch(err=>console.log(err))
 */  

/* 
userBL.savePwd("ss1a2","OO2","OO2")
.then(res=>console.log(res))
.catch(err=>console.log(err))
*/

//orchestratorBL.getUsers().then((res)=>console.log(res[0])).catch(err=>console.log(err))


//orchestratorBL.deleteUser("618d4dfe451dd5dfcd1a5fa5").then((res)=>console.log(res[0])).catch(err=>console.log(err))
//permissionBL.deletePermissions("123").then(res=>console.log(res)).catch(err=>console.log(err))
//detailBL.deleteDetails("124").then(res=>console.log(res)).catch(err=>console.log(err))
//userBL.addUserDetails({test:"1"})

/*
jsonFileDal.getData("Permissions.json")
.then(data =>console.log(data.role[0].permissions))
.catch(err=>console.log(err)) */

/*
userBL.getUserDetails("618a7df8860a20d6bf6e9d41")
.then(data => console.log(data))
.catch(err=> console.log(err))
*/




//jsonFileDal.getData("Users.json").then((data)=>console.log(data.user))
