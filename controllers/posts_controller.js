const postsInfo = require('../models/posts_schema');
const commentInfo = require('../models/comment_schema');

module.exports.create_post = function(req,res){
    postsInfo.create({
        content:req.body.article,
        user:req.user.id
    },function(err,post){
        if(err){
            console.log(err);
            return;
        }
        console.log(post);
    });
    return res.redirect('back');
}

module.exports.delete_post = function(req,res){
    postsInfo.findById(req.params.id,function(err,post){
        if(err){
            console.log(err);
            return res.redirect('back');
        }
        if(post.user == req.user.id) {
            commentInfo.deleteMany({"post_id":req.params.id},function(err){
                post.remove();
                return res.redirect('back'); 
            });
        }
        else{
            return res.redirect('back');
        }
    });
}