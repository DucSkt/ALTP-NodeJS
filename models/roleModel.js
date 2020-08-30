var mongoose       = require("mongoose");
var Schema         = mongoose.Schema;

var roleSchema = Schema({
    name    : String,
 });

var roleModel =mongoose.model("role", roleSchema);

module.exports = {
    roleModel   : roleModel
}