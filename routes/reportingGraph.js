var express = require('express');
var constants = require('../lib/constants');
var router = express.Router();

var { GuestModel } = require('../model/guest');

router.get('/', async function (req, res, next) {

  const data = await GuestModel.aggregate([
    {
      $group: {
        _id: '$response',
        count: { $sum: 1 } // this means that the count will increment by 1
      }
    }
  ]);

  xValues = [];
  yValues = [];
  for (let i = 0; i < data.length; i++) {
    xValues.push(data[i]._id);
    yValues.push(data[i].count);
  }

  console.log(xValues);
  xValues = xValues.map(function (item) { return "'" + item + "'" }).join(',');
  console.log(xValues);
  console.log(yValues);

  res.render('reportingGraph', { xValues: xValues, yValues: yValues });
});

router.post('/', function (req, res, next) {
  res.render('reportingGraph', {});
});

module.exports = router;
