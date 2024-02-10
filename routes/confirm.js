var express = require('express');
var router = express.Router();
var mainGuest = process.env.MAIN_GUEST;

var { GuestModel } = require('../model/guest');

var mainGuest = process.env.MAIN_GUEST;
var importantPeople = process.env.IMPORTANT_PEOPLE;
var celebration = process.env.CELEBRATION;
var eventDetails = { mainGuest, importantPeople, celebration }

/* GET home page. */
router.get('/', async function (req, res, next) {
  // const guest = new GuestModel({ name: "name", lastname: "lastname", mail:"mail", mobile:"mobile" });
  // obj = await guest.save();
  // console.log(obj)
  res.render('index', { eventDetails, error: 'Registro no encontrado' });
});

router.post('/', function (req, res, next) {
  const mailOrPhone = req.body.mailOrPhone

  GuestModel.findOne({ $or: [{ mail: mailOrPhone }, { mobile: mailOrPhone }] }).then((record) => {
    // console.log("Result :", record);
    if (record == null) {
      res.render('index', { eventDetails, error: 'Registro no encontrado' });
    } else {
      res.render('confirm', { eventDetails, guest: record });
    }
  }).catch((err) => {
    console.log("error" + err);
    res.render('error', { error: 'mail o telefono no encontrado' });
  });
});

module.exports = router;
