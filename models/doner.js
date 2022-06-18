const mongoose = require('mongoose');

const donerSchema = new mongoose.Schema({
     donerName: {
         type: String,
         required: true
     },
     donerMobile: {
        type: String,
        required: true
     },
     bloodGroup: {
        type: String,
        required: true
     }
});

const Doner = mongoose.model('doner', donerSchema);
module.exports = Doner;