const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const zoneSchema = new Schema({
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
    garden_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "garden",
        index: true
    },
    type: String,
},
{
    timestamps: true
});

const Zone = mongoose.model("zone", zoneSchema);

module.exports = Zone;