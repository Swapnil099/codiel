const postsInfo = require('../../../models/posts_schema');
const commentInfo = require('../../../models/comment_schema');


module.exports.delete_post = async function(req,res){
    try{
        const post = await postsInfo.findById(req.params.id);
        if(post && post.user == req.user.id){
            const deleted = await commentInfo.deleteMany({"post_id":req.params.id});
            post.remove();

            return res.json(200,{
                message: "Post and associated comments deleted successfully"
            });
        }
     
        return res.json(401,{
            message:"you can not delete this post"
        });
    }
    catch(err){
        console.log("error - ",err);
        return res.json(500,{
            message: "Internal server error"
        });
    }

}