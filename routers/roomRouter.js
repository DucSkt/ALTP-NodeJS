var modelData = require("../models/roomModel");
var roomModel = modelData.roomModel;
var router = require("express").Router();
var questionController = require("../controllers/questionController");

router.post("/createRoom", createRoom);
router.post("/deleteRoom", deleteRoom);
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
    let data = await roomModel.remove({});
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