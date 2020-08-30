var mongoose       = require("mongoose");
var Schema         = mongoose.Schema;

var userSchema = Schema({
    name     : String,
    email    : String,
    password : String,
    avatar   : String,
    scoreID    : mongoose.Mixed,
    roleID     : mongoose.Mixed,
    fcmID     : mongoose.Mixed,
    OS     : String,
 });

var userModel =mongoose.model("user", userSchema);

module.exports = {
    userModel   : userModel
}