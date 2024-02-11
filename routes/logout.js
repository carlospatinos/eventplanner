var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', async function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
