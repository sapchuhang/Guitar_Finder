const mongoose = require('mongoose');

const Guitar = mongoose.model('Guitar',{

    guitarName : {
        type: String
    },

    guitarDescription : {
        type: String
    },

    guitarPrice : {
        type : String
    },
    guitarImage :{
        type : String
    },

    guitarReview : {
        type : String
    }
})

module.exports= Guitar;