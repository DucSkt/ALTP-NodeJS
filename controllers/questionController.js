var { questionModel } = require("../models/questionModel");

module.exports = {
    createQuestion: createQuestion,
    deleteQuestion: deleteQuestion,
    updateQuestion: updateQuestion,
    getQuestion   : getQuestion,
}

// tạo câu hỏi
async function createQuestion(params) {
    var question = new questionModel(
        params
    );
    let signalSaveQuestion = await question.save();
    return signalSaveQuestion;
}

//xóa question
async function deleteQuestion(id) {
    let data = await questionModel.remove({ _id: id });
    return data;
}

//sửa question
async function updateQuestion(id, content, A, B, C, D, answer, level, adminId) {
    let result = await questionModel.findOne({ _id: id });

    if (!content) {
        content = result.content;
    }
    if (!A) {
        A = result.A;
    }
    if (!B) {
        B = result.B;
    }
    if (!C) {
        C = result.C;
    }
    if (!D) {
        D = result.D;
    }
    if (!answer) {
        answer = result.answer;
    }
    if (!level) {
        level = result.level;
    }

    let data = await questionModel.update({ _id: id }, { content: content, A: A, B: B, C: C, D: D, answer: answer, level: level, adminId: adminId }, {new: true});
    return data;
}

async function getQuestion() {
    let data1 = await questionModel.find({level : 1});
    let max1 = data1.length;
    let arr1 = [];
    let pos1, tmp1;
    for(let j = 0; j < max1; ++j){
        arr1[j] = j+1;
    }
    let MAX1 = max1 -1;
    for(let i = 0; i < MAX1; ++i){
        pos1 = Math.floor(Math.random() * (MAX1 - i));
        tmp1 = arr1[pos1];
        arr1[pos1] = arr1[MAX1 - i];
        arr1[MAX1 - i] = tmp1;
    }
    let levelQ = [];
    
    let j=0;
    for(let l = 0; l < 5; ++l){
        levelQ[j] = data1[(arr1[MAX1 - l]-1)];
        j++;
    }

   // chọn ra 5 câu ở level 2
    let data2 = await questionModel.find({level : 2});
    let max2 = data2.length;
    let arr2 = [];
    let pos2, tmp2;
    for(let j = 0; j < max2; ++j){
        arr2[j] = j+1;
    }
    let MAX2 = max2 -1;
    for(let i = 0; i < MAX2; ++i){
        pos2 = Math.floor(Math.random() * (MAX2 - i));
        tmp2 = arr2[pos2];
        arr2[pos2] = arr2[MAX2 - i];
        arr2[MAX2 - i] = tmp2;
    }
    for(let l = 0; l < 5; ++l){
        levelQ[j] =  data2[(arr2[MAX2 - l]-1)];
        j++;
    }

    // chọn ra 5 câu ở level 3
    let data3 = await questionModel.find({level : 3});
    let max3 = data3.length;
    let arr3 = [];
    let pos3, tmp3;
    for(let j = 0; j < max3; ++j){
        arr3[j] = j+1;
    }
    let MAX3 = max3 -1;
    for(let i = 0; i < MAX3; ++i){
        pos3 = Math.floor(Math.random() * (MAX3 - i));
        tmp3 = arr3[pos3];
        arr3[pos3] = arr3[MAX3 - i];
        arr3[MAX3 - i] = tmp3;
    }
    
    for(let l = 0; l < 5; ++l){
        levelQ[j] =  data3[(arr3[MAX3 - l]-1)];
        j++;
    }
    
    return levelQ;
}