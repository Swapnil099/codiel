const userInfo = require('../models/user_schema');

module.exports.searchUser = async function(req,res){

    let user_full_name = req.body.user_to_search;
    const userNameArr = user_full_name.split(" ");
    const user_first_name = userNameArr[0];
    let user_last_name = userNameArr[0];
    if(userNameArr.length >= 2){
        user_last_name = userNameArr[1];
    }
    
    // userInfo.find({$or : [
    //     {first_name:{$regex:user_first_name , $options:'i'}},
    //     {last_name:{$regex:user_last_name , $options:'i'}}
    // ]},function(err,users){
    //     if(err){
    //         console.log(err);
    //         return;
    //     }
    //     return res.render('search_page',{
    //         found_users : users
    //     });
    // });

    try{
        const users = await userInfo.find({$or : [
            {first_name:{$regex:user_first_name , $options:'i'}},
            {last_name:{$regex:user_last_name , $options:'i'}}
        ]});
        
        return res.render('search_page',{
            found_users : users,
        });
    }
    catch(err){
        console.log('error',err);
        return;
    }


}