var express = require('express');
var constants = require('../lib/constants');
var router = express.Router();

var { GuestModel } = require('../model/guest');

/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('confirmedArrival', {});
});

router.post('/', function (req, res, next) {
  const guest_mobile = req.body.guest_mobile;
  const guest_mail = req.body.guest_mail;

  let arrivedAdults = req.body.arrivedAdults;
  let arrivedChildren = req.body.arrivedChildren;
  let response = constants.STATUS_ARRIVED;

  const updates = { response: response, arrivedAdultCount: arrivedAdults, arrivedChildCount: arrivedChildren, responseDate: Date.now() };

  GuestModel.findOneAndUpdate({ $or: [{ mail: guest_mail }, { mobile: guest_mobile }] }, updates, { new: true }).then((record) => {
    if (record == null) {
      res.render('error', { error: 'Registro no encontrado' });
    } else {
      res.render('confirmedArrival', { guest: record });
    }
  }).catch((err) => {
    console.log("error" + err);
    res.render('error', { error: 'Registro no encontrado' });
  });

});

module.exports = router;
