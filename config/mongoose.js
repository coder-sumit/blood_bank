// get required library
const mongoose = require('mongoose');

// make connection
mongoose.connect('mongodb://localhost/blood_bank');

// get db
const db = mongoose.connection;

// on error
db.on('err', console.error.bind(console, "Error connecting to database"));

// up and connection successful
db.once('open', function(){
    console.log("DB connection successful! ");
});