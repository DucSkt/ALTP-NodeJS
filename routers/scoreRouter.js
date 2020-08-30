var modelData = require("../models/scoreModel");
var scoreModel = modelData.scoreModel;
var router = require("express").Router();
const { ObjectId } = require('mongoose').Types;

router.post("/updateScore", updateScore);

async function updateScore(req, res) {
    var id = req.body.id;
    var score = req.body.score;

    var scoreResult = await scoreModel.findOneAndUpdate({_id: ObjectId(id)}, {score: score }, { new: true ,
        upsert: true,
    }).exec()

    if (scoreResult) {
        return res.json({ error: false, status: 200 });
    }
    else {
        return res.json({ error: true, status: 500 });
    }
}

var createScore = async function createScore() {
    var scoreResult = await new scoreModel({ score: 0 });
    scoreResult = await scoreResult.save()
    if (scoreResult) {
        return scoreResult
    } else {
        return ''
    }
}

var findByIdName = async function findScoreLocal(id) {
    var score = await scoreModel.findById(id)

    if (score) {
        return score
    }
    else {
        return ''
    }
}

module.exports = router;
module.exports.createScore = createScore;
module.exports.findByIdName = findByIdName;