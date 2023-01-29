const jwt = require('jsonwebtoken');
const Register = require('../models/register');
const router = require('../routes/register')

// module.exports.verifiedUser = function(req,res,next){
//     try{
//         const token = req.headers.authorization.split(" ")[1]
//         const data= jwt.verify(token,'anysecretKey');
//         //console.log(data.userId);
//         Register.findOne({_id :data.userId})
//         .then(function(userData){
//             //req.send(userData);
//             req.validUser = userData;
//             console.log(userData)
//             next();
//         })
//         .catch(function(ee){
//             res.status(401).json({error : ee});
//         }) 

//     }
//     catch(e){
//         res.status(401).json({error :e})
//     }
// }

//     module.exports.verifyAdmin = function(req,res,next){
//         if(!req.validUser){
//             return res.status(401).json({message : "Unauthorized"})
//         }

//         else if (req.validUser.Role!== "Admin"){
//             return res.status(401).json({message: "Unauthorized"})
//         }


//     next();
    
// }

// module.exports.verifyUser=function(req,res,next)
// {
//     //console.log("main guard")
//     //console.log(token);
//     try{
//         const token=req.headers.authorization.split(" ")[1]
//         const data=jwt.verify(token, 'anysecretkey');
//         //in this data id is available..
//         //console.log(data)
//         User.findOne({_id:data.userId}).then(function(userData)
//         {
//             req.validUser=userData;
//             console.log(userData)
//             //res.send(userData)        
//             next();
//         })
//         .catch(function(err){
//             res.send(401).json({error:err})
//         })
//     }
//     catch(err)
//     {
//         res.send(401).json({error:err})
//     }
// }

//guard 2
// module.exports.verifyAdmin=function(req, res, next)
// {
//     if(!req.validUser)
//     {
//         return res.status(401).json({msg: "Unauthorized"})
//     }
//     else if(req.validUser.role!=="Admin")
//     {
//         return res.status(401).json({msg: "Unauthorized"})
//     }
//     //valid bhaye
//     next();
// }


module.exports.verifyUser=function(req,res,next)
{
    console.log(req.headers.authorization.split(" ")[1])
    //console.log("main guard")
    //console.log(token);
    try{
        const token=req.headers.authorization.split(" ")[1]
        const data=jwt.verify(token, 'anysecretkey');
        //in this data id is available..
        //console.log(data)
        Register.findOne({_id:data.userId}).then(function(userData)
        {
            req.validUser=userData;
            console.log(userData)
            //res.send(userData)        
            next();
        })
        .catch(function(err){
            res.send(401).json({error:err})
        })
    }
    catch(err)
    {
        res.send(401).json({error:err})
    }
}


module.exports.verifyAdmin=function(req, res, next)
{
    if(!req.validUser)
    {
        return res.status(401).json({msg: "Unauthorized"})
    }
    else if(req.validUser.role!=="Admin")
    {
        return res.status(401).json({msg: "Unauthorized"})
    }
    //valid bhaye
    next();
}


