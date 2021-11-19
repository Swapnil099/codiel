const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required: true
    },
    post_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'postInfo'
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userInfo'
    }
},{
    timestamps:true
});

const comment = mongoose.model('comment',commentSchema);

module.exports = comment;