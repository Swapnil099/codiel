const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const userInfo = require('./models/user_schema');
const router = require('./routes');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/custom_Mware_flash');

app.set('view engine','ejs');
app.set('views','./views');

app.use(express.urlencoded());

// make uploads route request path availaible to server (upload requests comes from image src's) 
app.use('/upload',express.static(__dirname + '/upload'));
app.use(cookieParser());
app.use(express.static('assets'));

app.use(session({
    name: 'codiel',
    secret:'keytoencrypt',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl:'mongodb://localhost:27017/Codiel_data',
        autoRemove:'disabled' 
    })

}));

app.use(passport.initialize());
app.use(passport.session());



app.use(function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user
    } 
    // console.log(res.locals.user);
    next();
});

app.use(flash()); 
app.use(customMware.setFlash);
  


app.use('/',router);



app.listen(port,function(err){
    if(err){
        console.log(`Error while listning : ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
});