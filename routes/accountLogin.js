var express = require('express');
const passport = require('passport')

var router = express.Router();


/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('accountLogin', {});
});

router.post('/', passport.authenticate('local', { failureRedirect: '/accountLogin' }), function (req, res) {
  req.session.realName = req.user.realName;
  res.redirect('/reporting');
});

module.exports = router;
