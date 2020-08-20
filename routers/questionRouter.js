var questionController = require("../controllers/questionController");
var router = require("express").Router();

router.post("/createQuestion" , createQuestion);
router.post("/deleteQuestion" , deleteQuestion);
router.post("/updateQuestion" , updateQuestion);
router.get("/getQuestion"     , getQuestion);

module.exports = router;

// thêm câu hỏi
async function createQuestion (req, res) {
    var content = req.body.content;
    if(!content){
        res.json({
            statusCode : 400,
            message : "Bạn chưa nhập nội dung câu hỏi"
        })
        return;
    }

    var A = req.body.A;
    if(!A){
        res.json({
            statusCode : 400,
            message : "Bạn chưa nhập nội dung cho đáp án A"
        })
        return;
    }

    var B = req.body.B;
    if(!B){
        res.json({
            statusCode : 400,
            message : "Bạn chưa nhập nội dung cho đáp án B"
        })
        return;
    }

    var C = req.body.C;
    if(!C){
        res.json({
            statusCode : 400,
            message : "Bạn chưa nhập nội dung cho đáp án C"
        })
        return;
    }

    var D = req.body.D;
    if(!D){
        res.json({
            statusCode : 400,
            message : "Bạn chưa nhập nội dung cho đáp án D"
        })
        return;
    }

    var answer = req.body.answer;
    if(!answer){
        res.json({
            statusCode : 400,
            message : "Bạn chưa nhập nội dung cho đáp án"
        })
        return;
    }

    var level = req.body.level;
    if(!level){
        res.json({
            statusCode : 400,
            message : "Bạn chưa nhập nội dung cho mức"
        })
        return;
    }

    let params = {content,A,B,C,D,answer,level};
    let data = await questionController.createQuestion(params);
    
    if(data){
        return res.json({error: false, data: data});
    }
    else{
        return res.json({error: true, message: 'Them that bai'});
    }
}

// xóa question
async function deleteQuestion(req, res){
    var id = req.body.id;
    if(!id){
        res.json({
            statuscode : 400,
            message    : "bạn chưa nhập id"
        });
        return;
    }
    let data = await questionController.deleteQuestion(id);
    if(data){
        return res.json({error: false, data: data});
    }
    else{
        return res.json({error: true, message: 'hehe'});
    }
}
// sửa qusestion
async function updateQuestion (req, res) {
    var id = req.body.id;
    var content = req.body.content;
    var A = req.body.A;
    var B = req.body.B;
    var C = req.body.C;
    var D = req.body.D;
    var answer = req.body.answer;
    var level = req.body.level;

    let data = await questionController.updateQuestion(id, content, A, B, C, D, answer, level);
    if(data){
        return res.json({error: false, data: data});
    }
    else{
        return res.json({error: true, message: 'hehe'});
    }
}

// lấy câu hỏi để thi ( lấy 1 lần 15 câu gồm 5 câu level1, 5 câu level2, 5 câu level3 )
async function getQuestion (req, res) {
    let data = await questionController.getQuestion();
    console.log("hieu  "+{data});
    
    if (data) {
        console.log('22222', data)
        return res.json({error: false, data: data});
    }
    else{
        return res.json({error: true, message: 'hehe'});
    }
}