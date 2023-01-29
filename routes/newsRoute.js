const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authentication');
const News = require('../models/newsModel');
const upload = require('../middleware/upload');


router.post('/news/insert',upload.single('newsImage'), function(req,res){
    authentication.verifyAdmin,
   console.log(req.file);
   if (req.file == undefined){
       return res.status(400).json({
           message : "Invalid File Format"
       })
   }

    const newsTitle = req.body.newsTitle;
    const newsDescription = req.body.newsDescription;
    const path = req.file.filename;
    const newsId = req.body.newsId;

    const newsData = new News({newsTitle : newsTitle, newsDescription : newsDescription, newsImage : path, newsId : newsId});

    newsData.save()
    .then(function(result){
        res.status(201).json({success : true, message : "News Created", data : newsData})
    })
    .catch(function(err){
        res.status(500).json({ message : err})
    })
})

router.delete('/news/delete/:id',function(req,res){
    const newsId = req.params.id;

    News.deleteOne({_id : newsId})
    .then(function(){
        res.status(200).json({success: true,messege : "Deleted", data})
    })
    .catch(function(e){
        res.status(500).json({error:e})
    })

})

router.put('/news/update',function(req, res){
    const newsTitle = req.body.newsTitle;
    const newsDescription = req.body.newsDescription;
    
    const newsId = req.body.newsId;

    News.updateOne({_id : newsId},
        {newsTitle : newsTitle, newsDescription : newsDescription})
        .then(function(){
            res.status(200).json({message : "updated"})
        })
        .catch(function(e){
            res.status(500).json({error :e})
        })
})


router.get('/news/show', function(req,res){
    News.find().then(function(data){
        res.status(200).json({
            success : true,
            count : data.length,
            data : data})
    }).catch(function(e){
        res.status(500).json({error : e})
    })
})

router.get('/news/single/:id', function(req,res){
    const newsId = req.params.id
    News.findOne({_id : newsId}).then(function(data){
        res.status(200).json(data)
    }).catch(function(e){
        res.status(500).json({error : e})
    })
})


module.exports = router;
