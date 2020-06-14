var modelData = require("../models/examModel");
var examModel = modelData.examModel;
var router = require("express").Router();

router.post("/createExam", createExam);

module.exports = router;

async function createExam(req, res) {
    var eventID = req.body.eventID;
    if (!eventID) {
        res.json({
            statuscode: 400,
            message: "bạn chưa nhập eventID"
        });
        return;
    }
    var time = req.body.time;
    if (!time) {
        res.json({
            statuscode: 400,
            message: "bạn chưa nhập time"
        });
        return;
    }
    var isRight = req.body.isRight;
    if (!isRight) {
        res.json({
            statuscode: 400,
            message: "bạn chưa nhập isRight"
        });
        return;
    }

    var exam = new examModel({
        eventID: eventID,
        time: time,
        isRight: isRight
    })
    let data = await exam.save()

    var a = await examModel.find({});
    if (isRight == "true" && eventID == a[0].eventID) {
        var hieu = await examModel.find({ isRight: true });
        console.log("hehe " + hieu[0]);

        if (time <= hieu[0].time) {
            return res.json({ error: false, data: true });
        } else {
            return res.json({ error: false, data: false });
        }
    } else {
        return res.json({ error: false, data: false });
    }
}