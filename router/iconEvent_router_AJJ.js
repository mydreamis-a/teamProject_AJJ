const { User } = require("../model/index_AJJ");
const { log } = console;

const express = require("express");
const router = express.Router();


router.post("/", (req, res) => {
    const { userPoint, email } = req.body;
    const money = Number(userPoint);
    if(email === ""){
        res.send({ data : "null" })
    } else{
        User.findOne({
            where : { email : email }
        }).then((e) => {
            e.point += money;
            User.update(
                { point :  e.point},
                { where :  { email : email }}
            );
        });
        res.send({ data : money })
    }
});

module.exports = router;