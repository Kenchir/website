var mongoose = require("mongoose");
var weatherSchema = new mongoose.Schema({
    temp:Number,
    feels_like:Number,
    temp_min: Number,
    temp_max: Number,
    pressure: Number,
    humidity: Number

});

module.exports = mongoose.model("Weather",weatherSchema);