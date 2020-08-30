var mongoose       = require("mongoose");
var Schema         = mongoose.Schema;

var scoreSchema = Schema({
    score    : Number,
 });

var scoreModel = mongoose.model("score", scoreSchema);

module.exports = {
    scoreModel   : scoreModel
};