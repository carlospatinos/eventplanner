var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser'); // parser middleware
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');

const passport = require('passport');
const session = require('express-session');
const connectEnsureLogin = require('connect-ensure-login'); //authorization
const mongoose = require("mongoose");

const { UserModel } = require('./model/user');
const { mongoServerUrl, sessionSecret } = require('./util/config');




var termsAndConditionsRouter = require('./routes/termsAndConditions');

var indexRouter = require('./routes/index');
var confirmRouter = require('./routes/confirm');
var thanksRouter = require('./routes/thanks');
var downloadRouter = require('./routes/download');
var arrivedRouter = require('./routes/arrivedQR');
var confirmedArrivalRouter = require('./routes/confirmedArrival');


var accountCreationRouter = require('./routes/accountCreation');
var accountLoginRouter = require('./routes/accountLogin');
var accountLogoutRouter = require('./routes/accountLogout');

var reportingRouter = require('./routes/reporting');
var reportingDetailsRouter = require('./routes/reportingDetails');
var reportingGraphRouter = require('./routes/reportingGraph');
var reportingGraphGuestCountRouter = require('./routes/reportingGraphGuestCount');

var mapsRouter = require('./routes/maps');

var app = express();

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(UserModel.createStrategy());

passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

const mongoDbConnect = async () => {
  try {
    await mongoose.connect(mongoServerUrl);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

mongoDbConnect();

// app.locals.moment = require('moment');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images/cake.ico')))

app.use('/', indexRouter);
app.use('/confirm', confirmRouter);
app.use('/thanks', thanksRouter);
app.use('/download', downloadRouter);
app.use('/arrivedQR', arrivedRouter);
app.use('/confirmedArrival', confirmedArrivalRouter);


app.use('/termsAndConditions', termsAndConditionsRouter);

const loginPage = '/accountLogin';
app.use('/accountCreation', accountCreationRouter);
app.use(loginPage, accountLoginRouter);
app.use('/accountLogout', accountLogoutRouter);


app.use('/reporting', connectEnsureLogin.ensureLoggedIn(loginPage), reportingRouter);
app.use('/reportingDetails', connectEnsureLogin.ensureLoggedIn(loginPage), reportingDetailsRouter);
app.use('/reportingGraph', connectEnsureLogin.ensureLoggedIn(loginPage), reportingGraphRouter);
app.use('/reportingGraphGuestCount', connectEnsureLogin.ensureLoggedIn(loginPage), reportingGraphGuestCountRouter);

app.use('/maps', mapsRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
