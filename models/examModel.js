var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var examSchema = Schema({
    eventID: String,
    time: String,
    isRight: String
});

var examModel = mongoose.model("Exam", examSchema);
module.exports = {
    examModel: examModel
}