var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var eventSchema = Schema({
    socketId: String,
    userId: String
});

var roomAwaitModel = mongoose.model("roomAwait", eventSchema);
module.exports = {
    roomAwaitModel: roomAwaitModel
}