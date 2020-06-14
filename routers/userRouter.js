var userController = require("../controllers/userController");
var modelData = require("../models/userModel");
var userModel = modelData.userModel;
var router = require("express").Router();
var cons = require("../cons");
var { upload } = require("../middleware/multer.middleware");

router.post("/register", register);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.post("/changePassword", changePassword);
router.post("/deleteUser", deleteUser);
router.post("/updateScore", updateScore);
router.get("/getUser", getUser);
router.get("/getBestScore", getBestScore);
router.post("/uploadAvatar", upload.single('avatar'), uploadAvatar);


module.exports = router;


async function register(req, res) {
    var email = req.body.email;
    if (!email) {
        res.json({
            statuscode: 400,
            message: "bạn chưa nhập email"
        });
        return;
    }
    if (!cons.paterEmail.test(email)) {
        res.json({
            statuscode: 400,
            message: "cú pháp mail của bạn không hợp lệ"
        });
        return;
    }

    var password = req.body.password;
    if (!password) {
        res.json({
            statuscode: 400,
            message: "bạn chưa nhập password"
        });
        return;
    }
    if (password.length < 4 || password.length > 15) {
        res.json({
            statuscode: 400,
            message: "password phải từ 5 đến 15 ký tự"
        });
        return;
    }

    let data = await userController.register(email, password);
    if (data) {
        return res.json({ error: false, data: data });
    }
    else {
        return res.json({ error: true, message: 'Thêm thất bại' });
    }
}

// đăng nhập
async function login(req, res) {
    var email = req.body.email;
    if (!email) {
        res.json({
            statuscode: 400,
            message: "bạn chưa nhập username"
        });
        return;
    }
    if (!cons.paterEmail.test(email)) {
        res.json({
            statuscode: 400,
            message: "cú pháp mail của bạn không hợp lệ"
        });
        return;
    }

    var password = req.body.password;
    if (!password) {
        res.json({
            statuscode: 400,
            message: "bạn chưa nhập password"
        });
        return;
    }

    let data = await userController.login(email, password);
    if (data) {
        return res.json({ error: false, data: data });
    }
    else {
        return res.json({ error: true, message: 'sai email đăng nhập' });
    }
}

// quên mật khẩu
async function forgotPassword(req, res) {
    var email = req.body.email;
    if (!email) {
        res.json({
            statuscode: 400,
            message: "bạn chưa nhập email"
        });
        return;
    }
    if (!cons.paterEmail.test(email)) {
        res.json({
            statuscode: 400,
            message: "cú pháp mail của bạn không hợp lệ"
        });
        return;
    }

    let data = await userController.forgotPassword(email)
    console.log({ data });

    if (data) {
        return res.json({ error: false, data: data });
    }
    else {
        return res.json({ error: true, message: 'hehe' });
    }
}

//đổi mật khẩu
async function changePassword(req, res) {
    var email = req.body.email;
    if (!email) {
        res.json({
            statuscode: 400,
            message: "bạn chưa nhập email"
        });
        return;
    }
    if (!cons.paterEmail.test(email)) {
        res.json({
            statuscode: 400,
            message: "cú pháp mail của bạn không hợp lệ"
        });
        return;
    }
    var password = req.body.password;
    if (!password) {
        res.json({
            statuscode: 400,
            message: "bạn chưa nhập password"
        });
        return;
    }
    var newPass1 = req.body.newPass1;
    if (!newPass1) {
        res.json({
            statuscode: 400,
            message: "bạn chưa nhập pass lần 1"
        });
        return;
    }
    var newPass2 = req.body.newPass2;
    if (!newPass2) {
        res.json({
            statuscode: 400,
            message: "bạn chưa nhập pass lần 2"
        });
        return;
    }

    let data = await userController.changePassword(email, password, newPass1, newPass2)
    console.log({ data });

    if (data) {
        return res.json({ error: false, data: data });
    }
    else {
        return res.json({ error: true, message: 'hehe' });
    }
}

// xóa user
async function deleteUser(req, res) {
    var id = req.body.id;
    if (!id) {
        res.json({
            statuscode: 400,
            message: "bạn chưa nhập id"
        });
        return;
    }
    let data = await userController.deleteUser(id);
    if (data) {
        return res.json({ error: false, data: data });
    }
    else {
        return res.json({ error: true, message: 'hehe' });
    }
}
// sửa điểm
async function updateScore(req, res) {
    var email = req.body.email;
    if (!email) {
        res.json({
            statuscode: 400,
            message: "bạn chưa nhập email"
        });
        return;
    }
    var score = req.body.score;
    if (!score) {
        res.json({
            statuscode: 400,
            message: "bạn chưa nhập score"
        });
        return;
    }
    let data = await userController.updateScore(email, score);
    if (data) {
        return res.json({ error: false, data: data });
    }
    else {
        return res.json({ error: true, message: 'hehe' });
    }
}
// lấy tất cả các user
async function getUser(req, res) {
    let data = await userController.getUser();
    if (data) {
        return res.json({ error: false, data: data });
    }
    else {
        return res.json({ error: true, message: 'hehe' });
    }
}

// lấy 5 người có số điểm cao nhất
async function getBestScore(req, res) {
    let data = await userController.getBestScore();
    console.log(data);

    if (data) {
        return res.json({ error: false, data: data });
    }
    else {
        return res.json({ error: true, message: 'hehe' });
    }
}
// thêm avatar
async function uploadAvatar(req, res) {
    var email = req.body.email;
    if (!email) {
        res.json({
            statuscode: 400,
            message: "bạn chưa nhập email"
        });
        return;
    }
    var avatar = req.file;
    console.log(avatar.filename);

    if (!avatar) {
        res.json({
            statuscode: 400,
            message: "bạn chưa nhập avatar"
        });
        return;
    }
    var data = await userModel.find({ email: email });
    if (data.length == 0) {
        let a = 'email Không tồn tại !';
        return a;
    }
    let a = await userModel.update({ _id: data[0]._id }, { avatar: avatar.filename });
    if (a) {
        return res.json({ error: false, data: a });
    }
    else {
        return res.json({ error: true, message: 'hehe' });
    }
}