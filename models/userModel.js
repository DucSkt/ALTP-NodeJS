var mongoose       = require("mongoose");
var Schema         = mongoose.Schema;

var userSchema = Schema({
    email    : String,
    password : String,
    avatar   : String,
    score    : Number
 });

var userModel =mongoose.model("user", userSchema);

module.exports = {
    userModel   : userModel
}