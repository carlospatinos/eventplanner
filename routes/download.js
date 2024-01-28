var express = require('express');
var router = express.Router();
const QRCode = require('qrcode')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('download', {});
});

router.post('/', function (req, res, next) {

  let data = {
    name: "Employee Name",
    age: 27,
    department: "Police",
    id: "aisuoiqu3234738jdhf100223"
  }

  let stringdata = JSON.stringify(data)

  QRCode.toDataURL(stringdata, function (err, qrEncodedCode) {
    if (err) return console.log("error occurred")
    // Printing the code
    console.log(qrEncodedCode)
    res.render('download', {qr: qrEncodedCode});
  })
  
});

module.exports = router;
