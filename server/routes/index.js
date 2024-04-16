var express = require('express');
var router = express.Router();

const { mainGuest, importantPeople, celebration } = require('../util/config');

/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('index', { eventDetails: { mainGuest, importantPeople, celebration } });
});


router.get('/api', async function (req, res, next) {
  console.log("API call")
  res.send('Hello from our server!')
});

module.exports = router;
