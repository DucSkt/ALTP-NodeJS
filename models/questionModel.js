var mongoose =  require("mongoose");
var Schema = mongoose.Schema;
var questionSchema =  Schema({
    content : String,
    A       : String,
    B       : String,
    C       : String,
    D       : String,
    answer  : String,
    level   : String,
    adminId : String
});

var questionModel = mongoose.model("Question",questionSchema);
module.exports = {
    questionModel : questionModel
}