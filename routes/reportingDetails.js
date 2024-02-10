var express = require('express');
var { STATUS } = require('../lib/constants');
var router = express.Router();

var { GuestModel } = require('../model/guest');

router.get('/', async function (req, res, next) {
  var statuses = [STATUS.STATUS_ARRIVED, STATUS.STATUS_CONFIRMED, STATUS.STATUS_DECLINED];
  console.log(statuses)
  res.render('reportingDetails', { statuses });
});

router.post('/', function (req, res, next) {

  let query = req.body.query;

  GuestModel.find({ response: query }).then((records) => {
    if (records == null) {
      res.render('error', { error: 'Registro no encontrado' });
    } else {
      var statuses = [STATUS.STATUS_ARRIVED, STATUS.STATUS_CONFIRMED, STATUS.STATUS_DECLINED]
      res.render('reportingDetails', { totalRecords: records, statuses });
    }
  }).catch((err) => {
    console.log("error" + err);
    res.render('error', { error: 'Registro no encontrado' });
  });
});

module.exports = router;
