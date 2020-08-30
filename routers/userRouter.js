var userController = require("../controllers/userController");
var modelData = require("../models/userModel");
var userModel = modelData.userModel;
var router = require("express").Router();
var cons = require("../cons");
var { upload } = require("../middleware/multer.middleware");
var roleRouter = require("../routers/roleRouter");
var fcmRouter = require("../routers/fcmRouter");
var scoreRouter = require("../routers/scoreRouter");

router.post("/register", register);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.post("/changePassword", changePassword);
router.post("/deleteUser", deleteUser);
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

    var roleResult = await roleRouter.findRoleLocal('user');
    var OS = req.body.OS;
    var roleId = roleResult._id;
    var fcmResult = await fcmRouter.createFCM();
    var fcmID = fcmResult._id;

    var scoreResult = await scoreRouter.createScore();
    var scoreID = scoreResult._id;
    var name = req.body.name;
    let data = await userController.register(email, password, roleId, OS, fcmID, scoreID, name);

    var roleResult2 = await roleRouter.findByIdName(data.roleID);
    data.roleID = roleResult2
    var scoreResult2 = await scoreRouter.findByIdName(data.scoreID);
    data.scoreID = scoreResult2


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

    var OS = req.body.OS;
    await userModel.updateOne({email: email}, {OS: OS})
    let data = await userController.login(email, password);

    if (!data) {
        return res.json({ error: true, message: 'sai email đăng nhập' });
    }

    var roleResult = await roleRouter.findByIdName(data[0].roleID);
    data[0].roleID = roleResult
    var scoreResult = await scoreRouter.findByIdName(data[0].scoreID);
    data[0].scoreID = scoreResult
    data[0]["password"] = '';

    if (data) {
        return res.json({ error: false, data: data });
    }
}

// lấy 5 người có số điểm cao nhất
async function getBestScore(req, res) {
    let data = await userController.getBestScore();

    if (!data) {
        return res.json({ error: true, message: 'khong tim thay user' });
    }

    const data2 = data.map( async (item, index) => {
        return new Promise( async (resolve, reject) => {
            var scoreResult = await scoreRouter.findByIdName(data[index].scoreID);
            data[index].scoreID = scoreResult
            data[index]["password"] = '';
            resolve(data[index])
        })
    })

    let mediasArray = await Promise.all(data2);

    if (data2) {
        return res.json({ error: false, data: data });
    }
}

// lấy tất cả các user
async function getUser(req, res) {
    let data = await userController.getUser();

    if (!data) {
        return res.json({ error: true, message: 'khong tim thay user' });
    }

     const data2 = data.map( async (item, index) => {
         return new Promise( async (resolve, reject) => {
        var roleResult = await roleRouter.findByIdName(data[index].roleID);
        data[index].roleID = roleResult
        var scoreResult = await scoreRouter.findByIdName(data[index].scoreID);
        data[index].scoreID = scoreResult
        var fcmResult = await fcmRouter.findByIdName(data[index].fcmID);
        data[index].fcmID = fcmResult
        data[index]["password"] = '';
             resolve(data[index])
         })
    })

    let mediasArray = await Promise.all(data2);

    if (data2) {
        return res.json({ error: false, data: mediasArray });
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

    if (data) {
        return res.json({ error: false, data: data });
    } else {
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
    let a = await userModel.update({ _id: data[0]._id }, { avatar: 'http://150.95.114.77:1998/image/upload/'+ avatar.filename });
    if (a) {
        return res.json({ error: false, data: a });
    }
    else {
        return res.json({ error: true, message: 'hehe' });
    }
}