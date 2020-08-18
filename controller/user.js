const express = require('express')
const mongoose = require('mongoose')
var router = express.Router()
const User = require('../models/user')
const util = require('../utility/commonFunctions')
const e = require('express')

router.use(express.json())

router.get('/signup',(req,res)=>{
    res.render('signupForm')
});

router.post('/signup',(req,res)=>{
    const user=new User(req.body)
    user.save((err)=>{
        if(!err){
            res.render('welcome',{user:req.body})
        } 
        else{
            if(err.name=='ValidationError'){
                util.handleValidationError(err,req.body)
                res.render('signupForm',{
                    user: req.body
                })
            }
            else console.log('User not saved '+err)
        }
    })
});

router.get('/login',(req,res)=>{
    res.render('loginForm')
});

router.post('/login',(req,res)=>{
    console.log(req.body.email)
    User.findOne({email:req.body.email},(err,user)=>{
        if(!err){
            if(!user){
                res.render('loginForm',{message:'User not found'})
            }
            else{
                if(user.password!==req.body.password){
                    res.render('loginForm',{message:'Incorrect Password'})
                }
                else res.render('welcome',{user:user.toObject()})
            }
        }
        else console.log(err)
    });
});

module.exports = router;