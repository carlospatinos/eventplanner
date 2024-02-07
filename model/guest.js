const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const GuestSchema = new Schema({
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
    estimatedAdultCount: { type: Number, min: 0, max: 30 },
    estimatedChildCount: { type: Number, min: 0, max: 30 },
    confirmedAdultCount: { type: Number, min: 0, max: 30 },
    confirmedChildCount: { type: Number, min: 0, max: 30 },
    arrivedAdultCount: { type: Number, min: 0, max: 30 },
    arrivedChildCount: { type: Number, min: 0, max: 30 },
    responseDate: Date,
    // guestChildrenDetails: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "guestChildrenDetails",
    // }],
    guestChildrenAges: [{ type: Number, min: 0, max: 17 }],
    updated: { type: Date, default: Date.now() },
});

// Compile model from schema
const GuestModel = mongoose.model("guest", GuestSchema);
module.exports = { GuestModel };
