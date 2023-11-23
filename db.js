const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://dinease:dinease@cluster0.nj61s6l.mongodb.net/';
mongoose.connect(mongoURL);

var db = mongoose.connection;

db.on('connected', () => {
    console.log(`mongodb connected`);
});

db.on('error', () => {
    console.log(`mongodb connection failed`);
});

module.exports = mongoose;
