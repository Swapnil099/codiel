const userInfo = require('../models/user_schema');
const postInfo = require('../models/posts_schema');

module.exports.profile = function(req,res){

    return res.render('profile_page',{
        user:req.user
    });

}

module.exports.sign_up = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }

    return res.render('sign_up',{
        hide:"hidden"
    });
}

module.exports.sign_in = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }

    return res.render('sign_in');

}

module.exports.create_user = function(req,res){
    userInfo.findOne({email:req.body.email},function(err,user_email_found){
        if(err){
            console.log("error in quering into DB for unique email while sign up");
        }
        if(!user_email_found){
            userInfo.create(req.body,function(err,user_data){
                if(err){
                    console.log("error while creating new user in DB while sign up");
                    return;
                }
                res.redirect('/user/sign-in');
            });
        }
        else{
            res.render('sign_up',{
                hide : "nothidden"
            });
        }
    });
}

module.exports.create_session = function(req,res){
    return res.redirect('/');
}

module.exports.destroy_session = function(req,res){
    req.logout();
    return res.redirect('/user/sign-in');
}

module.exports.timeline = function(req,res){
    postInfo.find({}).populate('user').populate({
        path: 'comments',
        populate:{
            path : 'user_id'
        }
    })
    .exec(function(err,posts){
        if(err){
            console.log(err);
            return;
        }
        return res.render('timeline',{
            posts:posts
        });
    });
}


