const postsInfo = require('../models/posts_schema');

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