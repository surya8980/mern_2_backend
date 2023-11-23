const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://mernproject:mernproject@cluster0.6nl5owa.mongodb.net/';
mongoose.connect(mongoURL);

var db = mongoose.connection;

db.on('connected', () => {
    console.log(`mongodb connected`);
});

db.on('error', () => {
    console.log(`mongodb connection failed`);
});

module.exports = mongoose;
