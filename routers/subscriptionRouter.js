const express = require('express');
const userBL = require('../models/userBL');
const orchestratorBL=require('../models/orchestratorBL')
const router = express.Router();

    router.route('/subscriptionlist')
    .get(async function(req,resp,next)
    {   
        console.log("/subscriptionlist")
        try {
            let subArr=await orchestratorBL.getSubscriberList()
            console.log("subArr",subArr[0].subscriptions)
            return resp.json(subArr)
        }
        catch(err) {
            next(err)}
        
    })

    router.route('/addsubscriber')
    .post(async function(req,resp,next)
    {   
        try{           
            console.log("req add subscriber",req.body)
            let status = await orchestratorBL.addSubscriber(req.body)
            return resp.json(status)
        }
        catch(err) {
            console.log("err",err)
            next(err)}
    })

    router.route('/deletesubscriber/:id')
    .delete(async function(req,resp,next)
    {   
        try{           
            console.log("req delete sub")
            let status = await orchestratorBL.deleteSubscriber(req.params.id)
            return resp.json(status)
        }
        catch(err) {
            console.log("err",err)
            next(err)}
    })

    router.route('/updatesubscriber')
    .put(async function(req,resp,next)
    {   
        try{           
            console.log("req update sub")
            let status = await orchestratorBL.updateSubscriber(req.body)
            console.log("status",status)
            return resp.json(status)
        }
        catch(err) {
            console.log("err",err)
            next(err)}
    })

    router.route('/movielist')
    .get(async function(req,resp,next)
    {   
        console.log("/movielist")
        try {
            let movieArr=await orchestratorBL.getMovieList()
            return resp.json(movieArr)
        }
        catch(err) {
            next(err)}
        
    })

    router.route('/addmovie')
    .post(async function(req,resp,next)
    {   
        try{           
            console.log("req add movie",req.body)
            let status = await orchestratorBL.addMovie(req.body)
            return resp.json(status)
        }
        catch(err) {
            console.log("err",err)
            next(err)}
    })


    router.route('/addsubscription/:subId')
    .post(async function(req,resp,next)
    {   
        try{           
            let id=req.params.subId
            console.log("req add subscription",req.body)
            let status = await orchestratorBL.addSubscription(id,req.body)
            return resp.json(status)
        }
        catch(err) {
            console.log("err",err)
            next(err)}
    })

    router.route('/deletemovie/:id')
    .delete(async function(req,resp,next)
    {   
        try{           
            console.log("req delete movie")
            let status = await orchestratorBL.deleteMovie(req.params.id)
            return resp.json(status)
        }
        catch(err) {
            console.log("err",err)
            next(err)}
    })

    router.route('/updatemovie')
    .put(async function(req,resp,next)
    {   
        try{           
            console.log("req update movie")
            let status = await orchestratorBL.updateMovie(req.body)
            console.log("status",status)
            return resp.json(status)
        }
        catch(err) {
            console.log("err",err)
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