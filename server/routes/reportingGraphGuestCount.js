var express = require('express');
var { STATUS } = require('../lib/constants');
var router = express.Router();

var { GuestModel } = require('../model/guest');

router.get('/', async function (req, res, next) {
  // TODO add pendings vs confirmed vs declined
  var data = undefined;
  xValues = [];
  yValues = [];

  const aggregateAdultRes = await GuestModel.aggregate([
    {
      $group: {
        _id: '$response',
        totalAmount: { $sum: "$confirmedAdultCount" },
        count: { $sum: 1 } // this means that the count will increment by 1
      }
    }
  ]);

  if (aggregateAdultRes.length > 0) {

    for (let i = 0; i < aggregateAdultRes.length; i++) {
      if (aggregateAdultRes[i]._id == STATUS.STATUS_CONFIRMED) {
        xValues.push("18");
        yValues.push(aggregateAdultRes[i].totalAmount);
        break;
      }
    }
  }


  const aggregateChildRes = await GuestModel.aggregate([
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



  if (aggregateChildRes.length > 0) {
    data = aggregateChildRes[0]["guestChildrenAges_details"];
    for (let i = 0; i < data.length; i++) {
      xValues.push(data[i]["guestChildrenAges"]);
      yValues.push(data[i]["count"]);
    }


    xValues = xValues.map(function (item) { return "'" + item + "'" }).join(',');
  }



  res.render('reportingGraphGuestCount', { xValues: xValues, yValues: yValues });
});

router.post('/', function (req, res, next) {
  res.render('reportingGraphGuestCount', {});
});

module.exports = router;
