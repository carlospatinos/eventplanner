var express = require('express');
var router = express.Router();

var { GuestModel } = require('../model/guest');

/* GET home page. */
router.get('/', async function (req, res, next) {
  const mailOrPhone = req.params.userId
  GuestModel.findOne({ $or: [{ mail: mailOrPhone }, { mobile: mailOrPhone }] }).then((record) => {
    // console.log("Result :", record);
    if (record == null) {
      res.render('arrived', { guest: {}, error: 'Registro no encontrado' });
    } else {
      res.render('arrived', { guest: record });
    }
  }).catch((err) => {
    console.log("error" + err);
    res.render('error', { error: 'id no encontrado' });
  });
});

router.post('/', function (req, res, next) {



});

module.exports = router;
