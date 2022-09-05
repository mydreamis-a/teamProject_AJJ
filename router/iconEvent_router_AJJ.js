const { User } = require("../model/index_AJJ");
const { log } = console;

const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    const email = req.session.email;
    const { userPoint } = req.body;
    const money = Number(userPoint);
    User.findOne({
        where : { email : email }
    }).then((e) => {
        e.point += money;
        User.update(
            { point :  e.point},
            { where :  { email : email }}
        );
        res.send({ data : money , id : e.id});
    }).catch(() => {
        res.send({ data : "null" })
    });
});

module.exports = router;