var modelData = require("../models/userModel");
var crypto = require("crypto");
var { sendMail } = require('./../cons');
var { upload } = require("../middleware/multer.middleware");
var nodemailer = require('nodemailer');

var userModel = modelData.userModel;

module.exports = {
    register: register,
    login: login,
    forgotPassword: forgotPassword,
    changePassword: changePassword,
    deleteUser: deleteUser,
    updateScore: updateScore,
    getUser: getUser,
    getBestScore: getBestScore
}

// đăng ký
async function register(email, password, role) {
    let data = await userModel.find({ email: email });
    console.log("hehe " + email);

    if (data.length > 0) {
        let a = "email đã tồn tại";
        return a;
    }
    var hash = await crypto.createHmac('sha256', "ALTP")
        .update(password)
        .digest('hex');
    password = hash;
    var user = new userModel({
        email: email,
        password: password,
        role: role,
        avatar: null,
        score: 0
    })
    let signalSaveUser = await user.save()
    return signalSaveUser;
}

// đăng nhập
async function login(email, password) {
    let data = await userModel.find({ email: email });
    if (data.length > 0) {
        var hash = crypto.createHmac('sha256', "ALTP")
            .update(password)
            .digest('hex');

        if (hash == data[0].password) {
            let a = data;
            return a;
        }
    }
}

// quên mật khẩu

async function forgotPassword(email) {
    var newPass = Math.floor(Math.random() * (999999 - 100000 + 1) - 100000);

    var data = await userModel.find({ email: email });
    if (data[0] == "" || data[0] == undefined || data[0] == null) {
        return;
    }
    console.log('111',newPass);
    console.log('222', data);


    var transporter = nodemailer.createTransport({ // config mail server
        service: 'Gmail',
        auth: {
            user: 'ducskt111@gmail.com',
            pass: 'z0944550079'
        }
    });
    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'Ai Là Triệu Phú',
        to: email,
        subject: 'Ai Là Triệu Phú',
        text: 'Mật khẩu mới của bạn là : ' + newPass
    }

    transporter.sendMail(mainOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: ' + info.response);
        }
    });
    // let result = await sendMail(email, newPass);

    var hash = crypto.createHmac('sha256', "ALTP")
        .update(newPass.toString())
        .digest('hex');
    var password = hash;

    let a = await userModel.update({ _id: data[0]._id }, { password: password });
    return a;
}

// đổi mật khẩu
async function changePassword(email, password, newPass1, newPass2) {
    var hash = crypto.createHmac('sha256', "ALTP")
        .update(password.toString())
        .digest('hex');

    var data1 = await userModel.find({ email: email });
    if (data1[0].password != hash) {
        let a = 'password sai !';
        return a;
    }
    if (newPass1 == newPass2) {
        var data = await userModel.find({ email: email });
        if (data.length == 0) {
            let a = 'email Không tồn tại !';
            return a;
        }

        console.log(data);
        var hash = crypto.createHmac('sha256', "ALTP")
            .update(newPass1.toString())
            .digest('hex');

        let a = await userModel.update({ _id: data[0]._id }, { password: hash });
        let b = 'đổi password thành công !';
        return b;

    } else {
        let a = 'password Không khớp nhau !';
        return a;
    }
}
//xóa user
async function deleteUser(id) {
    let data = await userModel.remove({ _id: id });
    return data;
}
// sửa điểm
async function updateScore(email, score) {
    var data = await userModel.find({ email: email });
    if (data.length == 0) {
        let a = 'email Không tồn tại !';
        return a;
    }

    console.log(data);
    let a = await userModel.update({ _id: data[0]._id }, { score: score });
    return a;
}
// lấy tất cả các user
async function getUser() {
    var data = await userModel.find({});
    if (data.length == 0) {
        let a = 'Không tồn tại user nào !';
        return a;
    }

    return data;
}
// 5 người có điểm cao nhất
async function getBestScore() {
    var data = await userModel.find().sort({ 'score': -1 });
    let bestScore = [];
    let j = 0;
    for (let i = 0; i < 5; i++) {
        bestScore[j] = data[i];
        j++;
    }

    return bestScore;
}