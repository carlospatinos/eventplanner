var express = require('express');
var { STATUS, parseDate } = require('../lib/constants');
var router = express.Router();

const { mainGuest, importantPeople, celebration, religiousPlace, religiousAddress, religiousAddressMapsCode, religiousUrl, religiousDateTime, partyPlace, partyAddress, partyAddressMapsCode, partyUrl, partyDateTime } = require('../util/config');

var religiousDateTimeObj = new Date(religiousDateTime);
var partyDateTimeObj = new Date(partyDateTime);

var regilousDetails = { religiousPlace, religiousAddress, religiousAddressMapsCode, religiousUrl, religiousDateTimeObj }
var partyDetails = { partyPlace, partyAddress, partyAddressMapsCode, partyUrl, partyDateTimeObj }

var { GuestModel } = require('../model/guest');
// var { GuestChildren } = require('../model/guestChildren');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('thanksNo', { title: 'Confirmación de asistencia' });
});

router.post('/', function (req, res, next) {

  let { guest_mobile, guest_mail, attendingSwitch, assistingAdults, assistingChildren } = req.body;

  let response = undefined;

  if (attendingSwitch == "1") {
    response = STATUS.STATUS_CONFIRMED;
  } else {
    response = STATUS.STATUS_DECLINED;
    assistingAdults = 0;
    assistingChildren = 0;
  }

  var guestChildrenDetailsArray = [];
  for (i = 1; i <= assistingChildren; i++) {
    guestChildrenDetailsArray.push(req.body['assistingChildren' + i]);
  }

  const updates = { response: response, confirmedAdultCount: assistingAdults, confirmedChildCount: assistingChildren, responseDate: Date.now(), guestChildrenAges: guestChildrenDetailsArray };
  GuestModel.findOneAndUpdate({ $or: [{ mail: guest_mail }, { mobile: guest_mobile }] }, updates, { new: true }).then((record) => {
    if (record == null) {
      res.render('error', { error: 'Registro no encontrado' });
    } else {
      if (record.response == STATUS.STATUS_CONFIRMED) {
        res.render('thanksYes', { mainGuest, celebration, regilousDetails, partyDetails, guest: record });
      } else {
        res.render('thanksNo', { guest: record });
      }
    }
  }).catch((err) => {
    console.log("error" + err);
    res.render('error', { error: 'Registro no encontrado' });
  });

});

module.exports = router;
