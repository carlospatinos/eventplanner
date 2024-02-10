var express = require('express');
var constants = require('../lib/constants');
var router = express.Router();

var religiousPlace = process.env.RELIGIOUS_PLACE;
var religiousAddress = process.env.RELIGIOUS_ADDRESS;
var religiousUrl = process.env.RELIGIOUS_URL;
var partyPlace = process.env.PARTY_PLACE;
var partyAddress = process.env.PARTY_ADDRESS;
var partyUrl = process.env.PARTY_URL;

var regilousDetails = { religiousPlace, religiousAddress, religiousUrl }
var partyDetails = { partyPlace, partyAddress, partyUrl }

var { GuestModel } = require('../model/guest');
// var { GuestChildren } = require('../model/guestChildren');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('thanksNo', { title: 'Confirmación de asistencia' });
});

router.post('/', function (req, res, next) {
  const guest_mobile = req.body.guest_mobile;
  const guest_mail = req.body.guest_mail;

  const attendingSwitch = req.body.attendingSwitch;
  let assistingAdults = req.body.assistingAdults;
  let assistingChildren = req.body.assistingChildren;
  let response = undefined;

  if (attendingSwitch == "1") {
    response = constants.STATUS_CONFIRMED;
  } else {
    response = constants.STATUS_DECLINED;
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
      if (record.response == constants.STATUS_CONFIRMED) {
        res.render('thanksYes', { regilousDetails, partyDetails, guest: record });
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
