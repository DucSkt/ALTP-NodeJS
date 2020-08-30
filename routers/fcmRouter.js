var modelData = require("../models/fcmModel");
var fcmModel = modelData.fcmModel;
var router = require("express").Router();
const { ObjectId } = require('mongoose').Types;
var { admin } = require("../middleware/firebase");

router.post("/updateFCM", updateFCM);
router.post("/sendPush", sendPush);

var createFCM = async function createFCM() {
    var fcmResult = await new fcmModel({ token: '' });
    await fcmResult.save()
    if (fcmResult) {
        return fcmResult
    } else {
        return ''
    }
}

async function updateFCM(req, res) {
    var id = req.body.id;
    var token = req.body.token;

    var fcmResult = await fcmModel.findOneAndUpdate({_id: ObjectId(id)}, {token: token }, { new: true ,
        upsert: true,
    }).exec()

    if (fcmResult) {
        return res.json({ error: false, status: 200 });
    }
    else {
        return res.json({ error: true, status: 500 });
    }
}

async function sendPush(req, res) {
    var tokenID = req.body.token;
    var title = req.body.title;
    var content = req.body.content;
    tokenID.map(token => {
        let message = {
            notification: {
                title: title,
                body: content,
            },
            data: {
                channel_id: 'test-channel',
            },
            android: {
                ttl: 3600 * 1000,
                notification: {
                    icon: 'stock_ticker_update',
                    color: '#f45342',
                },
            },
            apns: {
                payload: {
                    aps: {
                        badge: 42,
                    },
                },
            },
            token: token.token,
        };

        admin.messaging().send(message)
            .then((response) => {
                return res.json({ error: false, status: 200 });
            })
            .catch((error) => {
                console.log('Error sending message:', error);
                return res.json({ error: true, status: 500 });
            });
    })

}

var findByIdName = async function findScoreLocal(id) {
    var fcm = await fcmModel.findById(id)

    if (fcm) {
        return fcm
    }
    else {
        return ''
    }
}


module.exports = router;
module.exports.createFCM = createFCM;
module.exports.findByIdName = findByIdName;