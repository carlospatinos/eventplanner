var express = require('express');
var router = express.Router();

const { mainGuest, importantPeople, celebration } = require('../util/config');

/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('index', { eventDetails: { mainGuest, importantPeople, celebration } });
});

module.exports = router;
