var express = require('express');
const passport = require('passport')

var router = express.Router();


/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('login', {});
});

router.post('/', passport.authenticate('local', { failureRedirect: '/' }), function (req, res) {
  // console.log(req.user)
  res.redirect('/reporting');
});

module.exports = router;
