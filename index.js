const express = require('express');
const app = express();
const port = 8000;

const router = require('./routes');

app.use('/',router);


app.listen(port,function(err){
    if(err){
        console.log(`Error while listning : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});