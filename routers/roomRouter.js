var modelData = require("../models/roomModel");
var roomModel = modelData.roomModel;
var router = require("express").Router();
var cons = require("../cons");
var questionController = require("../controllers/questionController");

router.post("/createRoom", createRoom);
router.post("/deleteRoom", deleteRoom);
router.post("/getPersonOnline", getPersonOnline);
router.post("/deleteRoomAll", deleteRoom);
router.get("/getAllRoom", getAllRoom);

module.exports = router;

module.exports.createRoom = createRoom;

async function createRoom(req, res) {
    var emailA = req.body.emailA;
    var emailB = req.body.emailB;
    let data = await questionController.getQuestion();
    var room = new roomModel({
        emailA: emailA,
        emailB: emailB,
        data
    });

    let a = await room.save()

    return a
}

async function deleteRoom(req, res) {
    var email = req.body.email;
    if (!email) {
        res.json({
            statuscode: 400,
            message: "bạn chưa nhập mail"
        })
    }
    if (!cons.paterEmail.test(email)) {
        res.json({
            statuscode: 400,
            message: "cú pháp mail của bạn không hợp lệ"
        });
        return;
    }
    let data = await roomModel.remove({ email: email });
    if (data) {
        return res.json({ error: false, data: data });
    }
    else {
        return res.json({ error: true, message: 'loi xoa event' });
    }
}

async function getPersonOnline(req, res) {
    var eventID = req.body.eventID;
    if (!eventID) {
        res.json({
            statuscode: 400,
            message: "bạn chưa nhập eventID"
        });
        return;
    }
    let data = await roomModel.find({ eventID: eventID });
    if (data) {
        return res.json({ error: false, data: data });
    }
    else {
        return res.json({ error: true, message: 'loi getPersonOnline' });
    }
}

async function deleteRoom(req, res) {
    let data = await roomModel.remove({});
    console.log('XOA NEK 11')
    if (data) {
        return res.json({ error: false, data: data });
    }
    else {
        return res.json({ error: true, message: 'loi xoa event' });
    }
}

async function getAllRoom(req, res) {
    let data = await roomModel.find({});

    if (data) {
        return res.json({ error: false, data: data });
    }
    else {
        return res.json({ error: true, message: 'loi xoa event' });
    }
}