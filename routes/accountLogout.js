var express = require('express');
const logger = require('../util/logger');

var router = express.Router();


/* GET home page. */
router.get('/', async function (req, res, next) {
  logger.debug('accountLogout: ' + req.session.name);
  req.session.name = undefined;
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
