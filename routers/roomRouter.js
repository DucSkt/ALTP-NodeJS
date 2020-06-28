var modelData = require("../models/roomModel");
var roomModel = modelData.roomModel;
var router = require("express").Router();
var cons = require("../cons");

router.post("/createRoom", createRoom);
router.post("/deleteRoom", deleteRoom);
router.post("/getPersonOnline", getPersonOnline);
router.post("/deleteRoomAll", deleteRoom);

module.exports = router;

async function createRoom(req, res) {
    var eventID = req.body.eventID;
    if (!eventID) {
        res.json({
            statuscode: 400,
            message: "bạn chưa nhập eventID"
        });
        return;
    }

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

    var room = new roomModel({
        eventID: eventID,
        email: email
    })
    let a = await room.save()

    // /////

    // {
    //     eventID: "1",
    //     time: 3,
    //     isRight: true,
    //   }

    //   save

    // if(req.body.isRight) {

    //     let arayTime = getTime của tất cả trong table Room với điều kiện : eventID = req.body.eventID && isRight = true
    //     arayTime.sort()
    //     if( req.body.time <= arayTim[0] ) {
    //         erorr: true
    //     } else {
    //     return {
    //         erorr: false
    //     }
    // }



    // } else {
    //     return {
    //         erorr: false
    //     }
    // }

    var data = await roomModel.count();
    if (data) {
        res.json({
            error: false, data: data
        })
    } else {
        res.json({
            error: true, message: "loi them room"
        })
    }
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