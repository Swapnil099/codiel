const userInfo = require('../../../models/user_schema');
const jwt = require('jsonwebtoken');


module.exports.send_users_data = async function(req,res){

    try{
        const users = await userInfo.find({}).select({first_name:1,last_name:1});
        return res.json(200,{
            message : "User data is sent",
            users : users 
        });
    }
    catch(err){
        console.log(err);
        return res.json(200,{
            message: "internal server error"
        });
    }
}


// setting up users JWT token for future requests authentication
module.exports.create_session = async function(req,res){
    try{
        const user = await userInfo.findOne({email:req.body.email});
        if(!user || user.password != req.body.password){
            return res.json(422, {
                message: "invalid username / password"
            });
        }

        return res.json(200,{
            message: "Sign in successfull , plz keep your token safe",
            data : {
                token : jwt.sign(user.toJSON(),'codiel',{expiresIn: '100000'})
            }
        });
    }
    catch(err){
        console.log("error - ",err);
        return res.json(500,{
            message:"internal server error"
        });
    }
}

