var mongoose = require("mongoose");
var feedbackSchema = new mongoose.Schema({
    fullnames:String,
    emailaddress:String,
    username:String,
    cityname:String,
    message : String

});

module.exports = mongoose.model("Feedback",feedbackSchema);