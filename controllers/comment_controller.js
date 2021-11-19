const postInfo = require('../models/posts_schema');
const userInfo = require('../models/user_schema');
const commentInfo = require('../models/comment_schema');


module.exports.create_comment = function(req,res){
    postInfo.findById(req.body.post_id,function(err,post){
        if(post){
            commentInfo.create({
                content : req.body.comment_content,
                post_id: req.body.post_id,
                user_id : req.body.comment_user_id
            },function(err,comment){
                if(err){
                    console.log(err);
                    return;
                }
                post.comments.push(comment);
                post.save();    
                return res.redirect('/user/timeline');
            });
        }
    });
}



