var express = require('express');
var { STATUS } = require('../lib/constants');
const logger = require('../util/logger');

var router = express.Router();

var { GuestModel } = require('../model/guest');

/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('confirmedArrival', {});
});

router.post('/', function (req, res, next) {
  const { guest_mobile, guest_mail, arrivedAdults, arrivedChildren } = req.body;

  let response = STATUS.STATUS_ARRIVED;

  const updates = { response: response, arrivedAdultCount: arrivedAdults, arrivedChildCount: arrivedChildren, responseDate: Date.now() };

  GuestModel.findOneAndUpdate({ $or: [{ mail: guest_mail }, { mobile: guest_mobile }] }, updates, { new: true }).then((record) => {
    if (record == null) {
      res.render('error', { error: 'Registro no encontrado' });
    } else {
      res.render('confirmedArrival', { guest: record });
    }
  }).catch((err) => {
    logger.error('error: ' + err);

    res.render('error', { error: 'Registro no encontrado' });
  });

});

module.exports = router;
