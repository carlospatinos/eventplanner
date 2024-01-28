var express = require('express');
var router = express.Router();

var { GuestModel } = require('../model/guest');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('thanks', { title: 'Confirmación de asistencia' });
});

router.post('/', function(req, res, next) {
  const guest = req.body.guest;
  const attendingSwitch = req.body.attendingSwitch;
  let assistingAdults = req.body.assistingAdults;
  let assistingChildren = req.body.assistingChildren;
  let response = undefined;

  if (attendingSwitch == "1") {
    response = "confirmed"; 
  } else {
    response = "declined";
    assistingAdults = 0;
    assistingChildren = 0;
  }
  
  console.log("Updating " + guest + " with response as " + response + " confirmedAdults ["+ assistingAdults + "] and confirmedChildren[" + assistingChildren + "]");
  const updates = {response: response, confirmedAdultCount: assistingAdults, confirmedChildCount: assistingChildren, responseDate: Date.now()};
  GuestModel.findOneAndUpdate({ _id: guest }, updates, {new: true}).then((record) => {
    console.log("Result :", record);
    if (record == null) {
      res.render('error', { error: 'Registro no encontrado' });
    } else {
      res.render('thanks', { guest: record });
    }
  }).catch((err) => {
      console.log("error" + err);
      res.render('error', { error: 'Registro no encontrado' });
  });

});

module.exports = router;
