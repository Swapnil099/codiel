const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
    content:{
        type:String,
        require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userInfo'
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'comment'
    }]
},{
    timestamps:true
});

const Post = mongoose.model('post',postsSchema);
module.exports = Post;