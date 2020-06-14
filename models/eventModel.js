var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var eventSchema = Schema({
    time: String
});

var eventModel = mongoose.model("Event", eventSchema);
module.exports = {
    eventModel: eventModel
}