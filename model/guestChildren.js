const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GuestChildrenSchema = new Schema({
    userId: Number,
    childrenAge: { type: Number, min: 0, max: 17 },
    mainGuest: {
        type: Schema.Types.ObjectId,
        ref: 'guest',
    },
    responseDate: Date,
    updated: { type: Date, default: Date.now() },
});

// Compile model from schema
const GuestChildren = mongoose.model("guestChildrenDetails", GuestChildrenSchema);
module.exports = { GuestChildren };
