var express = require('express');
const logger = require('../util/logger');
const { UserModel } = require('../model/user');


var router = express.Router();


/* GET home page. */
router.get('/', async function (req, res, next) {
  logger.debug('accountCreation - get');
  res.render('accountCreation', {});
});

router.post('/', async function (req, res, next) {
  try {
    // TODO store acceptTermsAndConds
    const { email, realName, password, acceptTermsAndConds } = req.body;
    console.log(password)
    const user = new UserModel({ username: email, icon: "", active: false, realName });

    const newUser = await UserModel.register(user, password);
    logger.debug(newUser);
    // TODO where to redirect? after sucessfull creation
    res.render('accountLogin', {});
  } catch (error) {
    logger.error(error);
    res.render('accountCreation', { error: error.message });
  }
});

module.exports = router;
