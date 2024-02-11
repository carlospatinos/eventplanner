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
const { UserModel } = require('./model/user');
// const RedisStore = require('connect-redis')

const mongoose = require("mongoose");

var indexRouter = require('./routes/index');
var confirmRouter = require('./routes/confirm');
var thanksRouter = require('./routes/thanks');
var downloadRouter = require('./routes/download');
var arrivedRouter = require('./routes/arrivedQR');
var confirmedArrivalRouter = require('./routes/confirmedArrival');

var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');

var reportingRouter = require('./routes/reporting');
var reportingDetailsRouter = require('./routes/reportingDetails');
var reportingGraphRouter = require('./routes/reportingGraph');
var reportingGraphGuestCountRouter = require('./routes/reportingGraphGuestCount');

var mapsRouter = require('./routes/maps');

var app = express();

app.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#', // config.redisStore.secret,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(UserModel.createStrategy());

passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

const mongoDbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGOSERVER_URI);
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

app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

app.use('/reporting', connectEnsureLogin.ensureLoggedIn(), reportingRouter);
app.use('/reportingDetails', connectEnsureLogin.ensureLoggedIn(), reportingDetailsRouter);
app.use('/reportingGraph', connectEnsureLogin.ensureLoggedIn(), reportingGraphRouter);
app.use('/reportingGraphGuestCount', connectEnsureLogin.ensureLoggedIn(), reportingGraphGuestCountRouter);

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
