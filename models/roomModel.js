var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var roomSchema = Schema({
    emailA: String,
    emailB: String,
    data: []
});

var roomModel = mongoose.model("Room", roomSchema);
module.exports = {
    roomModel: roomModel
}