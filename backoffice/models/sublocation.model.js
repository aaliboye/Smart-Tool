const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subLocationSchema = new Schema({
    slug: { type: String, index: true },
    name: {
        type: String,
        required: true
    },
    description: String,
    gps_shape: [
        {
            latitude: Number,
            longitude: Number,
            altitude: Number
        }
    ],
    gps_central_point: {
        latitude: Number,
        longitude: Number,
        altitude: Number
    },
    location_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "location",
        index: true
    },
    type: String,
},
{
    timestamps: true
});

const Sublocation = mongoose.model("sublocation", subLocationSchema);

module.exports = Sublocation;