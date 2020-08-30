var mongoose       = require("mongoose");
var Schema         = mongoose.Schema;

var fcmSchema = Schema({
    token    : String,
 });

var fcmModel =mongoose.model("fcmToken", fcmSchema);

module.exports = {
    fcmModel   : fcmModel
}