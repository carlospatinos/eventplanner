var express = require('express');
const logger = require('../util/logger');

var router = express.Router();

var { GuestModel } = require('../model/guest');
const { mainGuest, importantPeople, celebration } = require('../util/config');
var eventDetails = { mainGuest, importantPeople, celebration }

/* GET home page. */
router.get('/', async function (req, res, next) {
  // const guest = new GuestModel({ name: "name", lastname: "lastname", mail:"mail", mobile:"mobile" });
  // obj = await guest.save();
  res.render('index', { eventDetails, error: 'Registro no encontrado' });
});

router.post('/', function (req, res, next) {
  const { mail, phone } = req.body;

  const query = { $or: [{ mail }, { mobile: phone }] };

  GuestModel.findOne(query).then((record) => {
    if (record == null) {
      res.render('index', { eventDetails, error: 'Registro no encontrado' });
    } else {
      res.render('confirm', { eventDetails, guest: record });
    }
  }).catch((err) => {
    logger.error('error: ' + err);
    res.render('error', { error: 'mail o telefono no encontrado' });
  });
});

module.exports = router;
