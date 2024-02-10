var express = require('express');
var constants = require('../lib/constants');
var router = express.Router();

var { GuestModel } = require('../model/guest');

router.get('/', async function (req, res, next) {

  const aggregateRes = await GuestModel.aggregate([
    { $unwind: "$guestChildrenAges" },
    { $group: { "_id": "$guestChildrenAges", "count": { $sum: 1 } } },
    {
      $group: {
        "_id": null, "guestChildrenAges_details": {
          $push: {
            "guestChildrenAges": "$_id",
            "count": "$count"
          }
        }
      }
    },
    { $project: { "_id": 0, "guestChildrenAges_details": 1 } }
  ]);

  var data = aggregateRes[0]["guestChildrenAges_details"];
  console.log(data)

  xValues = [];
  yValues = [];
  console.log("=======>>>")
  for (let i = 0; i < data.length; i++) {
    // console.log(data[i])
    xValues.push(data[i]["guestChildrenAges"]);
    yValues.push(data[i]["count"]);
  }


  xValues = xValues.map(function (item) { return "'" + item + "'" }).join(',');


  res.render('reportingGraphChildren', { xValues: xValues, yValues: yValues });
});

router.post('/', function (req, res, next) {
  res.render('reportingGraphChildren', {});
});

module.exports = router;
