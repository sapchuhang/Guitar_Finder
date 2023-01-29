const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authentication');
const Guitar = require('../models/guitarModel');
const upload = require('../middleware/upload');

router.post('/guitar/insert',authentication.verifyAdmin,authentication.verifyUser,upload.single('guitarImage'), function(req,res){
    
    
//    console.log(req.file);
   if (req.file == undefined){
       return res.status(400).json({
           message : "Invalid File Format"
       })
   }

    const guitarName = req.body.guitarName;
    const guitarDescription = req.body.guitarDescription;
    const guitarPrice = req.body.guitarPrice;
    const path = req.file.filename;
    
    const guitarReview = req.body.guitarReview;

    const guitarData = new Guitar({guitarName : guitarName, guitarDescription : guitarDescription, guitarPrice : guitarPrice, guitarImage : path, guitarReview : guitarReview});

    guitarData.save()
    .then(function(result){
        res.status(201).json({success : true, message : "Guitar added", data : guitarData})
    })
    .catch(function(err){
        res.status(500).json({success : false, message : err})
    })
})

//update
router.put('/guitar/update',function(req, res){
    const guitarName = req.body.guitarName;
    const guitarDescription = req.body.guitarDescription;
    const guitarPrice = req.body.guitarPrice;
    const guitarReview = req.body.guitarReview;
    const guitarId = req.body.guitarId;

    Guitar.updateOne({_id : guitarId},
        {guitarName : guitarName, guitarDescription : guitarDescription, guitarPrice: guitarPrice, guitarReview : guitarReview})
        .then(function(){
            res.status(200).json({message : "updated"})
        })
        .catch(function(e){
            res.status(500).json({error :e})
        })
})

router.delete('/guitar/delete/:id',function(req,res){
    const guitarId = req.params.id;

    Guitar.deleteOne({_id : guitarId})
    .then(function(){
        res.status(200).json({success: true,messege : "Deleted", data})
    })
    .catch(function(e){
        res.status(500).json({error:e})
    })

})

router.get('/guitar/show', function(req,res){
    Guitar.find().then(function(data){
        res.status(200).json({
            success : true,
            count : data.length,
            data : data})
    }).catch(function(e){
        res.status(500).json({error : e})
    })
})

router.get('/guitar/single/:id', function(req,res){
    const guitarId = req.params.id
    Guitar.findOne({_id : guitarId}).then(function(data){
        res.status(200).json(data)
    }).catch(function(e){
        res.status(500).json({error : e})
    })
})


module.exports = router;