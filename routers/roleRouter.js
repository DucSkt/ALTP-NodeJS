var modelData = require("../models/roleModel");
var roleModel = modelData.roleModel;
var router = require("express").Router();

router.post("/createRole", createRole);
router.get("/findRole", findRole);

async function createRole(req, res) {
    var role = req.body.role;
    var roleResult = await new roleModel({
        name: role
    });

    await roleResult.save()

    if (roleResult) {
        return res.json({ error: false, status: 200 });
    }
    else {
        return res.json({ error: true, status: 500 });
    }
}

async function findRole(req, res) {
    var role = req.body.role;
    var roleResult = await roleModel.findOne({name: role})

    if (roleResult) {
        return res.json({ error: false, data: roleResult });
    }
    else {
        return res.json({ error: true, status: 500 });
    }
}

var findRoleLocal = async function findRoleLocal(nameRole) {
    var roleResult = await roleModel.findOne({name: nameRole})

    if (roleResult) {
        return roleResult
    }
    else {
        return ''
    }
}

var findByIdName = async function findRoleLocal(id) {
    var roleResult = await roleModel.findById(id)

    if (roleResult) {
        return roleResult
    }
    else {
        return ''
    }
}

module.exports = router
module.exports.findByIdName = findByIdName
module.exports.findRoleLocal = findRoleLocal