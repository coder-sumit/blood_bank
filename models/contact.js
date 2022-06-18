const mongoose = require('mongoose');

// contact schema
const contactSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

});

// create connection name
const Constact = mongoose.model('contact', contactSchema);
module.exports = Constact;