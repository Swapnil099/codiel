const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Codiel_data');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'connection failed'));

db.once('open',function(){
    console.log("Database is now connected succesfully");
});

