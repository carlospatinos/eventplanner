// node --env-file=.env scripts/importU.js
const mongoose = require("mongoose");
const { mongoServerUrl } = require('../util/config');

const { UserModel } = require('../model/user');

const mongoDbConnect = async () => {
    try {
        await mongoose.connect(mongoServerUrl);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

mongoDbConnect();

UserModel.register({ username: 'carlospatinos@gmail.com', active: false, realName: 'Carlos' }, 'mys3cret@');
UserModel.register({ username: 'monikms@gmail.com', active: false, realName: 'Monica' }, 'mys3cret2!');