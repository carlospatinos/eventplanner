var express = require('express');
var { STATUS } = require('../lib/constants');
var router = express.Router();

var { GuestModel } = require('../model/guest');

router.get('/', async function (req, res, next) {
  var statuses = [STATUS.STATUS_ARRIVED, STATUS.STATUS_CONFIRMED, STATUS.STATUS_DECLINED];
  res.render('reporting', { statuses });
});

router.post('/', function (req, res, next) {
  res.send('Go and get it')
});

module.exports = router;
