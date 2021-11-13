const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        require:true
    },
    last_name:{
        type:String,
        require:true
    },
    dob:{
        type: String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    number:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
});

const userInfo = mongoose.model('userInfo',userSchema);

module.exports = userInfo;