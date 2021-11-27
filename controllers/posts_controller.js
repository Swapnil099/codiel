const postsInfo = require('../models/posts_schema');
const commentInfo = require('../models/comment_schema');

module.exports.create_post = async function(req,res){
    // postsInfo.create({
    //     content:req.body.article,
    //     user:req.user.id
    // },function(err,post){
    //     if(err){
    //         req.flash('error',err);
    //         return res.redirect('back');
    //     }
    //     // console.log(post);
    // });
    // req.flash('success','Post Created Successfully');
    // return res.redirect('back');

    try{
        const post = await postsInfo.create({
            content:req.body.article,
            user:req.user.id
        });

        const postToSend = await postsInfo.findById(post._id).populate('user').populate({
            path: 'comments',
            populate:{
                path : 'user_id'
            }
        });

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post : postToSend
                },
                message: "Post created"
            });
        }

        req.flash('error',err);
        return res.redirect('back');
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}

module.exports.delete_post = async function(req,res){
    // postsInfo.findById(req.params.id,function(err,post){
    //     if(err){
    //         console.log(err);
    //         return res.redirect('back');
    //     }
    //     if(post.user == req.user.id) {
    //         commentInfo.deleteMany({"post_id":req.params.id},function(err){
    //             post.remove();
    //             return res.redirect('back'); 
    //         });
    //     }
    //     else{
    //         return res.redirect('back');
    //     }
    // });

    try{
        const post = await postsInfo.findById(req.params.id);
        if(post && post.user == req.user.id){
            const deleted = await commentInfo.deleteMany({"post_id":req.params.id});
            post.remove();
            if(req.xhr){

                return res.status(200).json({
                    data:{
                        post_id : req.params.id
                    },
                    success: "Post Deleted"
                });
            }


            return res.redirect('back'); 
        }
     
        req.flash('success','Your are Not authorized to delete this post');
        return res.redirect('back');
    }
    catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }


}