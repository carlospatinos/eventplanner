// node --env-file=.env utils/dummy-users.js
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

UserModel.register({ username: 'candy', active: false }, 'cane');
UserModel.register({ username: 'starbuck', active: false }, 'redeye');