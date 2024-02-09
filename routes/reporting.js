var express = require('express');
var constants = require('../lib/constants');
var router = express.Router();

var { GuestModel } = require('../model/guest');

router.get('/', async function (req, res, next) {
  var statuses = [constants.STATUS_ARRIVED, constants.STATUS_CONFIRMED, constants.STATUS_DECLINED];
  console.log(statuses)
  res.render('reporting', { statuses });
});

router.post('/', function (req, res, next) {
  res.send('Go and get it')
});

module.exports = router;
