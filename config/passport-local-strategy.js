const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userInfo = require('../models/user_schema');

passport.use(new LocalStrategy(
    {
        usernameField:'email'
    },
    function(email,password,done){
        userInfo.findOne({email:email},function(err,user){
            if(err){
                console.log(err);
                return done(err);
            }
            if(!user || user.password!=password){
                console.log("user not found in --> passport");
                return done(null,false);
            }
            return done(null,user);
        });
    }
));

passport.serializeUser(function(user,done){
    //console.log(user);
    done(null,user.id);
});

passport.deserializeUser(function(user_id,done){
    userInfo.findById(user_id,function(err,user){
        if(err){
            console.log(err);
            return done(err);
        }
        return done(null,user);
    });
});

exports.module = passport;




