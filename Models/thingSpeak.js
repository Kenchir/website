var mongoose = require("mongoose");
var thingSpeakSchema = new mongoose.Schema({
    created_at:Date,
    entry_id:Number,
    field1: Number,
    field2: Number,
    field3: Number,
    field4: Number

});

module.exports = mongoose.model("ThingSpeak",thingSpeakSchema);
