var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var roomSchema = Schema({
    eventID: String,
    email: String
});

var roomModel = mongoose.model("Room", roomSchema);
module.exports = {
    roomModel: roomModel
}