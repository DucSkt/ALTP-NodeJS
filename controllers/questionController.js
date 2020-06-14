var { questionModel } = require("../models/questionModel");

module.exports = {
    createQuestion: createQuestion,
    buttonPercent : buttonPercent,
    //randomQuestion: randomQuestion,
    buttonCall    : buttonCall,
    buttonOpinion : buttonOpinion,
    Answer        : Answer,
    deleteQuestion: deleteQuestion,
    updateQuestion: updateQuestion,
    getQuestion   : getQuestion,
}

// tạo câu hỏi
async function createQuestion(params) {
    var question = new questionModel(
        params
    );

    console.log({ question });


    let signalSaveQuestion = await question.save();

    console.log({ signalSaveQuestion });


    return signalSaveQuestion;

}

// kết quả trả lời
async function Answer(ID) {
    let result = await questionModel.findOne({ _id: ID });

    if (result.answer == "A") {
        return result.A;
    } else if (result.answer == "B") {
        return result.B;
    } else if (result.answer == "C") {
        return result.C;
    } else if (result.answer == "D") {
        return result.D;
    }
}

// 50:50
async function buttonPercent(ID) {
    let result = await questionModel.findOne({ _id: ID });

    console.log("ket qua " + result.answer);

    if (result.answer.trim() == "A") {
        return { A: result.A, C: result.C }
    } else if (result.answer.trim() == "B") {
        return { B: result.B, D: result.D };
    } else if (result.answer.trim() == "C") {
        return { A: result.A, C: result.C };
    } else if (result.answer.trim() == "D") {
        return { B: result.B, D: result.D };
    }

}

// hỏi ý kiến khán giả
async function buttonOpinion(ID) {
    let result = await questionModel.findOne({ _id: ID });

    if (result.answer == "A") {
        return { A: result.A = 60, B: result.B = 10, C: result.C = 25, D: result.D = 5 };
    } else if (result.answer == "B") {
        return { A: result.A = 5, B: result.B = 60, C: result.C = 25, D: result.D = 10 };
    } else if (result.answer == "C") {
        return { A: result.A = 25, B: result.B = 10, C: result.C = 60, D: result.D = 5 };
    } else if (result.answer == "D") {
        return { A: result.A = 25, B: result.B = 10, C: result.C = 5, D: result.D = 60 };
    }
}

// gọi điện cho người thân
async function buttonCall(ID) {
    let result = await questionModel.findOne({ _id: ID });

    if (result.answer == "A") {
        return "Tôi nghĩ đáp án là " + result.A;
    } else if (result.answer == "B") {
        return "Tôi nghĩ đáp án là " + result.B;
    } else if (result.answer == "C") {
        return "Tôi nghĩ đáp án là " + result.C;
    } else if (result.answer == "D") {
        return "Tôi nghĩ đáp án là " + result.D;
    }
}

//xóa question
async function deleteQuestion(id) {
    let data = await questionModel.remove({ _id: id });
    return data;
}

//sửa question
async function updateQuestion(id, content, A, B, C, D, answer, level) {
    let result = await questionModel.findOne({ _id: id });
    console.log({ result });
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
    let data = await questionModel.update({ _id: id }, { content: content, A: A, B: B, C: C, D: D, answer: answer, level: level });
    return data;
}

// lấy câu hỏi để thi ( lấy 1 lần 15 câu gồm 5 câu level1, 5 câu level2, 5 câu level3)
async function getQuestion() {
    // chọn ra 5 câu ở level 1
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
        console.log("hehehe   "+(arr1[MAX1 - l]-1)); 
        // console.log("hehehe   "+data[arr[MAX - l]]);
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
         console.log("hehehe   "+(arr2[MAX2 - l]-1)); 
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
         console.log("hehehe   "+(arr3[MAX3 - l]-1)); 
    }
    
    return levelQ;
}

// ramdom câu hỏi
// async function randomQuestion(tmp) {
//     if (tmp == 1) {
//         let data = await questionModel.find({ level: 1 });
//         console.log(data);

//         let a = Math.floor(Math.random() * (data.length));
//         console.log("so random " + a);
//         return data[a];
//     }
//     else if (tmp == 2) {
//         let data = await questionModel.find({ level: 2 });
//         console.log(data);

//         let a = Math.floor(Math.random() * (data.length));
//         return data[a];
//     }
//     else if (tmp == 3) {
//         let data = await questionModel.find({ level: 3 });
//         console.log(data);

//         let a = Math.floor(Math.random() * (data.length));
//         return data[a];
//     }
//     else if (tmp == 4) {
//         let data = await questionModel.find({ level: 4 });
//         console.log(data);

//         let a = Math.floor(Math.random() * (data.length));
//         return data[a];
//     }
//     else if (tmp == 5) {
//         let data = await questionModel.find({ level: 5 });
//         console.log(data);

//         let a = Math.floor(Math.random() * (data.length));
//         return data[a];
//     }
//     else if (tmp == 6) {
//         let data = await questionModel.find({ level: 6 });
//         console.log(data);

//         let a = Math.floor(Math.random() * (data.length));
//         return data[a];
//     }
//     else if (tmp == 7) {
//         let data = await questionModel.find({ level: 7 });
//         console.log(data);

//         let a = Math.floor(Math.random() * (data.length));
//         return data[a];
//     }
//     else if (tmp == 8) {
//         let data = await questionModel.find({ level: 8 });
//         console.log(data);

//         let a = Math.floor(Math.random() * (data.length));
//         return data[a];
//     }
//     else if (tmp == 9) {
//         let data = await questionModel.find({ level: 9 });
//         console.log(data);

//         let a = Math.floor(Math.random() * (data.length));
//         return data[a];
//     }
//     else if (tmp == 10) {
//         let data = await questionModel.find({ level: 10 });
//         console.log(data);

//         let a = Math.floor(Math.random() * (data.length));
//         return data[a];
//     }
// }