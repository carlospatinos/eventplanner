var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon')

const mongoose = require("mongoose");

var indexRouter = require('./routes/index');
var confirmRouter = require('./routes/confirm');
var thanksRouter = require('./routes/thanks');
var downloadRouter = require('./routes/download');
var arrivedRouter = require('./routes/arrivedQR');
var confirmedArrivalRouter = require('./routes/confirmedArrival');

var reportingRouter = require('./routes/reportingDetails');
var reportingGraphRouter = require('./routes/reportingGraph');

var app = express();

const mongoDbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGOSERVER_URI);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

mongoDbConnect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// console.log();
app.use(favicon(path.join(__dirname, 'public', 'cake.ico')))


app.use('/', indexRouter);
app.use('/confirm', confirmRouter);
app.use('/thanks', thanksRouter);
app.use('/download', downloadRouter);
app.use('/arrivedQR', arrivedRouter);
app.use('/confirmedArrival', confirmedArrivalRouter);
app.use('/reporting', reportingRouter);
app.use('/reportingGraph', reportingGraphRouter);




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
