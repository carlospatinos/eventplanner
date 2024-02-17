var express = require('express');
const passport = require('passport');
const logger = require('../util/logger');
var router = express.Router();


/* GET home page. */
router.get('/', async function (req, res, next) {
  logger.debug('accountLogin get');
  res.render('accountLogin', {});
});

router.post('/', passport.authenticate('local', { failureRedirect: '/accountLogin' }), function (req, res) {
  req.session.realName = req.user.realName;
  logger.debug('accountLogin: ' + req.user.realName);
  res.redirect('/reporting');
});

module.exports = router;
