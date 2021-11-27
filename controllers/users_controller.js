const userInfo = require('../models/user_schema');
const postInfo = require('../models/posts_schema');

module.exports.profile = function(req,res){

    return res.render('profile_page',{
        user:req.user
    });

}

module.exports.show_user = function(req,res){
    const userId = req.params.id;
    userInfo.findById(userId,function(err,user){
        if(err){
            console.log(err);
            res.redirect('back');
        }
        return res.render('profile_page',{
            user:user
        });
    });
}

module.exports.sign_up = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }

    return res.render('sign_up');
}

module.exports.sign_in = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/timeline');
    }
    return res.render('sign_in');
}

module.exports.create_user = async function(req,res){
    // userInfo.findOne({email:req.body.email},function(err,user_email_found){
    //     if(err){
    //         console.log("error in quering into DB for unique email while sign up");
    //     }
    //     if(!user_email_found){
    //         userInfo.create(req.body,function(err,user_data){
    //             if(err){
    //                 console.log("error while creating new user in DB while sign up");
    //                 return;
    //             }
    //             res.redirect('/user/sign-in');
    //         });
    //     }
    //     else{
    //         res.render('sign_up',{
    //             hide : "nothidden"
    //         });
    //     }
    // });

    try{
        const user = await userInfo.findOne({email:req.body.email});
        if(!user){
            const user_data = await userInfo.create(req.body);
            req.flash('success','Account Created Successfully');
            return res.redirect('/user/sign-in');
        }

        req.flash('error','This Email is already have a registered user');
        return res.redirect('/user/sign-up');
        // res.render('sign_up',{
        //     hide : "nothidden"
        // });
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}

module.exports.create_session = function(req,res){
    req.flash('success','Logged In successfully');
    return res.redirect('/user/timeline');
}

module.exports.destroy_session = function(req,res){
    req.logout();
    req.flash('success','You have logged out');
    return res.redirect('/user/sign-in');
}

module.exports.timeline = async function(req,res){
    // postInfo.find({}).populate('user').populate({
    //     path: 'comments',
    //     populate:{
    //         path : 'user_id'
    //     }
    // })
    // .exec(function(err,posts){
    //     if(err){
    //         console.log(err);
    //         return;
    //     }
    //     return res.render('timeline',{
    //         posts:posts
    //     });
    // });

    // below code is modified version of above code
    try{
        const posts = await postInfo.find({}).sort('-createdAt').populate('user').populate({
            path: 'comments',
            populate:{
                path : 'user_id'
            }
        });
    
        return res.render('timeline',{
            posts:posts
        });
    }
    catch(err){
        console.log('error',err);
        return req.redirect('back');
    }
}

module.exports.search = function(req,res){
    const users_to_show = [];
    return res.render('search_page',{
        found_users:users_to_show
    });
}

module.exports.setting = async function(req,res){
    try{
        const user = await userInfo.findById(req.user.id);
        return res.render('setting_page',{
            user:user
        });
    }
    catch(err){
        conole.log('error',err);
        return req.redirect('back');
        
    }
}

module.exports.update_profile = async function(req,res){
    try{
        const user = await userInfo.findById(req.user.id);
        const updated_info = {
            first_name : req.body.new_first_name,
            last_name : req.body.new_last_name,
            number:req.body.new_number,
            dob:req.body.new_dob,
            email:req.body.new_email
        }

        const filter = {_id:user._id};
        const updatedUserInfo = await userInfo.findOneAndUpdate(filter,updated_info,{returnOriginal:false});
        console.log(updatedUserInfo.number)
        req.flash('success',"Profile is updated");
        return res.redirect('back');
    }
    catch(err){
        console.log('error',err);
        return req.redirect('back');
    }
    
}


module.exports.update_dp = async function(req,res){
    try{
        let user = await userInfo.findById(req.user.id);
        userInfo.uploadedAvatar(req,res,function(err){
            if(err) console.log('multer error - ',err);
            user.avatar = userInfo.avatarPath + '/' + req.file.filename;
            user.save();
            req.flash('success','Profile Picture updated');
            return res.redirect('back');
        });      
    }
    catch(err){
        console.log('error',err);
        return req.redirect('back');        
    }
}

