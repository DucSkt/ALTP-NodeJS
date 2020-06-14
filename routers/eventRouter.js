var modelData = require("../models/eventModel");
var eventModel = modelData.eventModel;
var router = require("express").Router();

router.post("/createEvent", createEvent);
router.post("/deleteEvent", deleteEvent);
router.get("/getAll", getAll);

module.exports = router;

async function createEvent(req, res) {
    var time = req.body.time;
    if (!time) {
        res.json({
            statuscode: 400,
            message: "bạn chưa nhập time"
        });
        return;
    }
    var event = new eventModel({
        time: time
    })
    let data = await event.save()
    if (data) {
        res.json({
            error: false, data: data
        })
    } else {
        res.json({
            error: true, message: "loi them event"
        })
    }
}

async function deleteEvent(req, res) {
    let data = await eventModel.remove({});
    if (data) {
        return res.json({ error: false, data: data });
    }
    else {
        return res.json({ error: true, message: 'loi xoa event' });
    }
}

async function getAll(req, res) {
    let data = await eventModel.find({});
    if (data) {
        return res.json({ error: false, data: data });
    }
    else {
        return res.json({ error: true, message: 'loi getPersonOnline' });
    }
}
