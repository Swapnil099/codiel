const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const userInfo = require('../models/user_schema');

// following code is to check if the api request header contains valid JWT or not
const opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codiel'
}

passport.use(new JWTStrategy(opts, function(jwtPayload,done){
    userInfo.findById(jwtPayload._id,function(err,user){
        if(err){
            console.Console("error in finding user in jwt",err);
            return;
        }

        if(user){
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    });
}));

module.exports = passport;