var express = require('express');
var router = express.Router();

var { GuestModel } = require('../model/guest');

/* GET home page. */
router.get('/', async function (req, res, next) {
  // const guest = new GuestModel({ name: "name", lastname: "lastname", mail:"mail", mobile:"mobile" });
  // obj = await guest.save();
  // console.log(obj)
  res.render('confirm', { title: 'Confirmación de asistencia' });
});

router.post('/', function (req, res, next) {
  const mailOrPhone = req.body.mailOrPhone

  GuestModel.findOne({ $or: [ { mail: mailOrPhone, mobile: mailOrPhone } ] }).then((docs) => {
    console.log("Result :", docs);
    if (docs == null) {
      res.render('index', { title: 'Confirmación de asistencia' });
    } else {
      res.render('confirm', { title: 'Confirmación de asistencia' });
    }
    
  })
    .catch((err) => {
      console.log("error" + err);
      res.render('error', { error: 'mail o telefono no encontrado' });
    });
});

module.exports = router;
