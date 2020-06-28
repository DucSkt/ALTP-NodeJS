var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var eventSchema = Schema({
    name: String
});

var testModel = mongoose.model("Test", eventSchema);
module.exports = {
    eventModel: testModel
}