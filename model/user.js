const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    username: String,
    password: String,
    icon: {
        type: String,
        default: ''
    },
    active: Boolean,
    name: String,
    updated: { type: Date, default: Date.now() },
});

User.plugin(passportLocalMongoose);


// Compile model from schema
const UserModel = mongoose.model('userData', User, 'userData');
module.exports = { UserModel };
// module.exports = mongoose.model('userData', User, 'userData');
