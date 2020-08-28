var admin = require("firebase-admin");

var configJsonFirebase = require('../google/altp-feed1-firebase-adminsdk-bdco4-c32516a720.json');


admin.initializeApp({
    credential: admin.credential.cert(configJsonFirebase),
    databaseURL: "https://altp-feed1.firebaseio.com"
})

module.exports.admin = admin