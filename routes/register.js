const express = require('express');
const router = express.Router();
const {check,validationResult} =require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');



const Register = require('../models/register');


router.post('/user/register',
[
    check('username', "Username is required!").not().isEmpty(),
    check('email',"Invalid Email").isEmail(),
    check('password',"Password is required").not().isEmpty()
],
function(req,res){

    const errors = validationResult(req);
    if(errors.isEmpty()){
        const fullname = req.body.fullName;
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        const role = req.body.role;

        bcryptjs.hash(password, 10, function(err, hash){
            const data = new Register({fullname : fullname, email : email, username: username, password: hash, role : role});
            data.save()
            .then(function(result){
                res.status(200).json({success : true, message : "User Registered!!!"})
            })
            .catch(function(err){
                res.status(500).json({error: err})
            })
        })
        
    }
    else{
        res.status(201).json(errors.array());
    }
})

// login System .........
router.post('/user/login',function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    Register.findOne({username : username})
    .then(function(userData111){
        if(userData111 === null){
           return res.status(401).json({success : false, message : "Invalid Input!!!!"})
        }

        bcryptjs.compare(password, userData111.password, function(err, result){
            if(result===false){
                return res.status(401).json({message: "Invalid Inputs!!"})
            }
           const token = jwt.sign({userId : userData111._id}, 'anysecretKey');
           return res.status(200).json({
               success : true,
               message : "Successfully Logged In",
               token : token,
               role : userData111.role
           })
        })

    })
    .catch(function(err){
        res.status(500).json({message :err})

    })
})



router.get('/registerShow',function(req,res){
    Register.find().then(function(data){
        // console.log(data);
        console.log(data);
    })
    
})
module.exports = router;