const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const userInfo = require('./models/user_schema');
const router = require('./routes');
const cookieParser = require('cookie-parser')

app.set('view engine','ejs');
app.set('views','./views');

app.use(express.urlencoded()); 
app.use(cookieParser());

app.use('/',router);
app.use(express.static('assets'));



app.listen(port,function(err){
    if(err){
        console.log(`Error while listning : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});