var express = require('express');
var router = express.Router();

var { GuestModel } = require('../model/guest');

/* GET home page. */
router.get('/', async function (req, res, next) {
  const { userId } = req.query;
  const phone = isNaN(userId) ? 0 : parseInt(userId);
  // TODO should we remove the phone option and keep email as the only option?
  GuestModel.findOne({ $or: [{ mail: userId }, { mobile: phone }] }).then((record) => {
    if (record == null) {
      res.render('arrivedQR', { error: 'Registro no encontrado' });
    } else {
      res.render('arrivedQR', { guest: record });
    }
  }).catch((err) => {
    console.log("error" + err);
    res.render('error', { error: 'id no encontrado' });
  });
});

router.post('/', function (req, res, next) {



});

module.exports = router;
