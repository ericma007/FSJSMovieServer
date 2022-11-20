const express = require('express');
const userBL = require('../models/userBL');
const orchestratorBL=require('../models/orchestratorBL')
const router = express.Router();

router.route('/')
    .get(async function(req,resp)
    {   

        let subs = await userBL.getUsers()
        return resp.json(subs)
    })

router.route('/login')
    .post(async function(req,resp,next)
    {   
        console.log(req.body)
        let userName=req.body.userName
        let password=req.body.password
        try {
            let answer=await userBL.login(userName,password)
            return resp.json(answer)
        }
        catch(err) {
            next(err)}
        
    })

    router.route('/userlist')
    .get(async function(req,resp,next)
    {   
        
        try {
            let userArr=await orchestratorBL.getUsers()
            return resp.json(userArr)
        }
        catch(err) {
            next(err)}
        
    })

    router.route('/user/:userName')
    .get(async function(req,resp,next)
    {   
        console.log("userName",req.params.userName)
        try {
            let user=await orchestratorBL.getUser(req.params.userName)
            return resp.json(user)
        }
        catch(err) {
            next(err)}
        
    })

    router.route('/savepwd')
    .post(async function(req,resp,next)
    {   
        let userName=req.body.userName
        let password=req.body.password
        let oldPassword=req.body.oldPassword
        try {
            let answer=await userBL.savePwd(userName,password,oldPassword)
            return resp.json(answer)
        }
        catch(err) {
            next(err)}
        
    })


    router.route('/adduser')
    .post(async function(req,resp,next)
    {   
        try{           
            console.log("req add",req.body)
            let status = await orchestratorBL.createUser(req.body.userName,
                                                         req.body.subDetails,
                                                         req.body.permissions)
            return resp.json(status)
        }
        catch(err) {
            next(err)}
    })

    router.route('/deleteuser/:id')
    .delete(async function(req,resp,next)
    {   

        try{           
            
            let status = await orchestratorBL.deleteUser(req.params.id)
            return resp.json(status)
        }
        catch(err) {
            next(err)}
    })

    
    router.route('/updateuser')
    .put(async function(req,resp,next)
    {   
        try{           
            console.log("req add",req.body)
            let status = await orchestratorBL.updateUser(req.body.userId,
                                                            req.body.userName,
                                                            req.body.userDetails,
                                                            req.body.permissions)
            return resp.json(status)
        }
        catch(err) {
            next(err)}
    })


module.exports = router;