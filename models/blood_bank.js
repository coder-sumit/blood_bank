const mongoose = require('mongoose');

const bbSchema = new mongoose.Schema({
    bbname: {
        type: String,
        required: true
    },
    bbnumber: {
        type: String,
        required: true
    },
    bbGroup: {
        type: Array,
        required: true
    }
});

const bloodBank = mongoose.model('bloodBank', bbSchema);
module.exports = bloodBank;