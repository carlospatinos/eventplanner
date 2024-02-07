var express = require('express');
var constants = require('../lib/constants');
var router = express.Router();

var { GuestModel } = require('../model/guest');

router.get('/', async function (req, res, next) {
  var statuses = [constants.STATUS_ARRIVED, constants.STATUS_CONFIRMED, constants.STATUS_DECLINED];
  console.log(statuses)
  res.render('reportingDetails', { statuses });
});

router.post('/', function (req, res, next) {

  let query = req.body.query;

  GuestModel.find({ response: query }).then((records) => {
    if (records == null) {
      res.render('error', { error: 'Registro no encontrado' });
    } else {
      var statuses = [constants.STATUS_ARRIVED, constants.STATUS_CONFIRMED, constants.STATUS_DECLINED]
      res.render('reportingDetails', { totalRecords: records, statuses });
    }
  }).catch((err) => {
    console.log("error" + err);
    res.render('error', { error: 'Registro no encontrado' });
  });
});

module.exports = router;
