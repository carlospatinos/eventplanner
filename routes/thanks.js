var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('thanks', { title: 'Confirmación de asistencia' });
});

router.post('/', function(req, res, next) {
  // res.render('thanks', { title: 'Gracias por tu respuesta' });
  // res.render('thanks', { title: 'Confirmación de asistencia' });
  res.send('Gracias!');
});

module.exports = router;
