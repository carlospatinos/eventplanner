const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const logger = require('../util/logger');

passport.use(new LocalStrategy(
    {
        usernameField: "username",
        passwordField: "password"
    },
    function (username, password, done) {
        logger.info('find username: ' + username);
        userDB.findOne({ where: { username: username } })
            .then(theUser => {
                if (!theUser) {
                    logger.error('User does not exist');
                    return done(null, false, { message: "User does not exist" });
                }
                if (!theUser.validPass(password)) {
                    logger.error('Password is not valid');
                    return done(null, false, { message: "Password is not valid." });
                }
                return done(null, true);
            });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (user, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});