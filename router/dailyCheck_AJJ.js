const { DailyCheck, User } = require("../model/index_AJJ");
const express = require("express");
const router = express.Router();
const { log } = console;

// ㅜ 로그인된 회원의 아이디(이메일) 임의 지정
const loginEmail = "a@a.com";

// ㅜ app.js 파일에서 설정한 해당 요청 주소가 적용
router.post("/", (req, res) => {
    // const id = ;
    User.findOne({
        where : {email : loginEmail},
    }).then((e) => {
        log(e.id);
        DailyCheck.create({
          user_id: "gdgd",
        });
    })
    // .then(() => {
    //     DailyCheck.findAll({
    //         where : {user_id}
    //     })
    // });
    // res.send({
    //     data : data,
    // })
});

module.exports = router;

// 08.25.10 수정
