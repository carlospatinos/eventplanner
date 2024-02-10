var express = require('express');
var router = express.Router();

var mainGuest = process.env.MAIN_GUEST;
var importantPeople = process.env.IMPORTANT_PEOPLE;
var celebration = process.env.CELEBRATION;

/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('index', { eventDetails: { mainGuest, importantPeople, celebration } });
});

module.exports = router;
