const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/upload/users/avatars');

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
    },
    avatar:{
        type:String
    }
},{
    timestamps:true
});

// linking multer , AVATAR_PATH , avatar field 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..' , AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null,file.fieldname + '-' + Date.now());
    }
});

// static function defination for userSchema every user from UserInfo collection will have access to this  
userSchema.statics.uploadedAvatar = multer({storage:storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;


const userInfo = mongoose.model('userInfo',userSchema);

module.exports = userInfo;