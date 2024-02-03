const mongoose = require("mongoose");

const Guest = mongoose.Schema;

const GuestSchema = new Guest({
    userId: Number,
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    mail: { type: String, required: true },
    mobile: { type: String, required: true },
    description: String,
    groupId: String,
    tableAllocated: String,
    priority: Number,
    response: String,
    livingInMx: String,
    estimatedAdultCount: { type: Number, min: 0, max: 30},
    estimatedChildCount: { type: Number, min: 0, max: 30},
    confirmedAdultCount: { type: Number, min: 0, max: 30},
    confirmedChildCount: { type: Number, min: 0, max: 30},
    arrivedAdultCount: { type: Number, min: 0, max: 30},
    arrivedChildCount: { type: Number, min: 0, max: 30},
    responseDate: Date,
    updated: { type: Date, default: Date.now() },
});

// Compile model from schema
const GuestModel = mongoose.model("guest", GuestSchema);
module.exports = { GuestModel };
