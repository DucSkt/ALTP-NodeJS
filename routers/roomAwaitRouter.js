var modelData = require("../models/RoomAwaitModel");
var roomAwaitModel = modelData.roomAwaitModel;
var router = require("express").Router();
var roomRouter = require("../routers/roomRouter");

router.post("/addRoomAwait", addRoomAwait);
router.delete("/deleteAUserRoomAwait", deleteRoomAwait);
router.get("/getAllUserRoomAwait", getAll);
router.post("/lookingRival", lookingRival);
router.get("/getListUerAwait", getListUerAwait);

const listAwait = []

async function addRoomAwait(req, res) {
    var userId = req.body.userId;
    if (!userId) {
        res.json({
            statuscode: 400,
            message: "userId error"
        });
        return;
    }

    var roomAwait = new roomAwaitModel({
        userId: userId
    })

    let data = await roomAwait.save()
    if (data) {
        res.json({
            error: false, data: data
        })
    } else {
        res.json({
            error: true, message: "create room await error"
        })
    }
}

async function deleteRoomAwait(req, res) {
    var userId = req.body.userId;
    var io = req.app.get('socketio');

   ///  io.sockets.clients().connected[userId].emit('test', 'duc skt')

    // io.sockets.clients().connected[socket.id]
    let data = await roomAwaitModel.remove({userId: userId});
    if (data) {
        return res.json({ error: false, data: data });
    }
    else {
        return res.json({ error: true, message: 'loi xoa event' });
    }
}

async function getAll(req, res) {
    let data = await roomAwaitModel.find({});

    if (data) {
        return res.json({ error: false, data: data });
    }
    else {
        return res.json({ error: true, message: 'loi getPersonOnline' });
    }
}

async function lookingRival(req, res) {
    var email = req.body.email;

    if ( listAwait.length === 0 ) {
        listAwait.push(email)
        return res.json({ error: false, data: 'chua tim duoc doi thu', havePlayer: false });
    } else {
        // const userAwait = listAwait.shift()
        // console.log('User Await 1', userAwait)
        // const data = await roomRouter.createRoom({
        //     body: {
        //         emailA: userAwait,
        //         emailB: email,
        //     }
        // }, {})
        // console.log('List User Await Dau tien', listAwait)
        // console.log('List User Await DATA', data)
        return res.json({ error: false, data: 'chua tim duoc doi thu', havePlayer: true });
    }
}

async function getListUerAwait(req, res) {
    return res.json({ error: false, data: listAwait });
}

module.exports = router;
module.exports.listAwait = listAwait;