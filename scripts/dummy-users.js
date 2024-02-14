// node --env-file=.env scripts/dummy-users.js
const mongoose = require("mongoose");

const { UserModel } = require('../model/user');

const mongoDbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGOSERVER_URI);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

mongoDbConnect();

UserModel.register({ username: 'carlospatinos@gmail.com', active: false }, 'mys3cret@');
UserModel.register({ username: 'monikms@gmail.com', active: false }, 'mys3cret2!');