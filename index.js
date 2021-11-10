const express = require('express');
const app = express();
const port = 8000;

const router = require('./routes');

app.set('view engine','ejs');
app.set('views','./views');

app.use('/',router);
app.use(express.static('assets'));


app.listen(port,function(err){
    if(err){
        console.log(`Error while listning : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});