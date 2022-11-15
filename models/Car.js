const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
        },
    mileage: {
        type: Number,
        required: true
    },
    vin: {
        type: String,
    },
    titleStatus: {
        type: String,
        required: true
    },
    location: {
        type: String,
    },
    seller: {
        type: String,
    },
    engine: {
        type: String,
    },
    drivetrain: {
        type: String,
    },
    transmission: {
        type: String,
    },
    bodyStyle: {
        type: String,
    },
    exteriorColor: {
        type: String,
    },
    interiorColor: {
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Car = mongoose.model("cars", CarSchema);