const mongoose = require('mongoose');

const News = mongoose.model('News',{

    newsTitle : {
        type: String
    },

    newsDescription : {
        type: String
    },

    newsImage :{
        type : String
    }
    
})

module.exports= News;