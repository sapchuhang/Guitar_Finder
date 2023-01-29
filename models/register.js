const mongoose = require('mongoose');

const Register = mongoose.model('Register',{
    fullname : {
        type : String
        
    },
    email : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    },

    role : {
        type : String,
        enum : ["Admin", "User"],
        default : "User"
        
    }

})
module.exports= Register;