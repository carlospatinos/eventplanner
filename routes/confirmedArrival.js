var express = require('express');
var router = express.Router();

var { GuestModel } = require('../model/guest');

/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('confirmedArrival', {});
});

router.post('/', function (req, res, next) {
  // TODO update the record to make sure people arrived
  res.render('confirmedArrival', {});
});

module.exports = router;
