const postInfo = require('../models/posts_schema');
const userInfo = require('../models/user_schema');
const commentInfo = require('../models/comment_schema');


module.exports.create_comment = async function(req,res){
    // postInfo.findById(req.body.post_id,function(err,post){
    //     if(post){
    //         commentInfo.create({
    //             content : req.body.comment_content,
    //             post_id: req.body.post_id,
    //             user_id : req.body.comment_user_id
    //         },function(err,comment){
    //             if(err){
    //                 console.log(err);
    //                 return;
    //             }
    //             post.comments.push(comment);
    //             post.save();    
    //             return res.redirect('/user/timeline');
    //         });
    //     }
    // });

    try{
        const post = await postInfo.findById(req.body.post_id);
        if(post){
            const comment = await commentInfo.create({
                            content : req.body.comment_content,
                            post_id: req.body.post_id,
                            user_id : req.body.comment_user_id
                            });
            post.comments.push(comment);
            post.save();
            req.flash('success','Comment Added Successfully');
            
            if(req.xhr){
                const createdComment = await commentInfo.findById(comment.id).populate('user_id');
                return res.status(200).json({
                    data:{
                        sendComment : createdComment
                    },
                    success:"Post Created"
                });
            }

            return res.redirect('/user/timeline');
        }
        return res.redirect('/user/timeline');
    }
    catch(err){
        // req.flash('error',err);
        return res.redirect('back');
    }
}

module.exports.delete_comment = async function(req,res){
    // commentInfo.findById(req.params.id,function(err,comment){
    //     if(err){
    //         console.log(err);
    //         return res.redirect('back');
    //     }
    //     if(comment.user_id == req.user.id){
    //         let postId = comment.post_id;
    //         comment.remove();
    //         postInfo.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
    //             if(err){
    //                 console.log(err);
    //                 return res.redirect('back');
    //             }
    //                 return res.redirect('back');   
    //         });
    //     }
    //     else{
    //         return res.redirect('back');
    //     }
    // });


    try{
        const comment = await commentInfo.findById(req.params.id);
        if(comment.user_id == req.user.id){
            let postId = comment.post_id;
            comment.remove();
            await postInfo.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
            req.flash('success','Comment Deleted');
            return res.redirect('back');
        }
        req.flash('success','Not authorized to delete this comment');
        return res.redirect('back');
    }
    catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }

}



