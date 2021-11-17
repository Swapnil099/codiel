const userInfo = require('../models/user_schema');

module.exports.profile = function(req,res){

    return res.render('profile_page',{
        user:req.user
    });

    // if(req.cookies.user_id){
    //     userInfo.findById(req.cookies.user_id,function(err,user){
    //         if(user){
    //             return res.render('profile_page',{
    //                 user:user    
    //             });
    //         }
    //         else{
    //             return res.redirect('/user/sign-in');
    //         }
    //     });
    // }
    // else{
    //     return res.redirect('/user/sign-in');
    // }
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

    // if(req.cookies.user_id){
    //     userInfo.findById(req.cookies.user_id,function(err,user){
    //         if(user){
    //             return res.redirect('/user/profile');
    //         }
    //         else{
    //             return res.render('sign_in');
    //         }
    //     });
    // }
    // else{
    //     return res.render('sign_in');
    // }
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
    // userInfo.findOne({email:req.body.email},function(err,user_email_found){
    //     if(!user_email_found){
    //        return res.send("<h1>Email not found</h1>");
    //     }
        
    //     if(user_email_found.password === req.body.password){
    //         res.cookie("user_id",user_email_found._id);
    //         return res.redirect('/user/profile');
    //     }

    //     return res.send("<h1>wrong password</h1>");

    // });
}

module.exports.destroy_session = function(req,res){
    req.logout();
    return res.redirect('/user/sign-in');
}

module.exports.timeline = function(req,res){
    return res.render('timeline.ejs');
}


// module.exports.sign_out = function(req,res){
//     if(req.cookies.user_id){
//         res.clearCookie('user_id');
//         return res.render('sign_in');
//     }
//     else{
//         return res.redirect('/user/sign-in');
//     }
// }
