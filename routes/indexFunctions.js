const { mainGuest, importantPeople, celebration } = require('../util/config');

const getHome = async function (req, res, next) {
  res.render('index', { eventDetails: { mainGuest, importantPeople, celebration } });
}

module.exports = { getHome };
