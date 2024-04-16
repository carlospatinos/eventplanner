var express = require('express');
const logger = require('../util/logger');
const { UserModel } = require('../model/user');


var router = express.Router();


/* GET home page. */
router.get('/', async function (req, res, next) {
  logger.debug('accountCreation - get');
  res.render('termsAndConditions', {});
});


module.exports = router;
