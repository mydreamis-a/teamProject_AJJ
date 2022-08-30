const { DailyCheck, User } = require("../model/index_AJJ");
const express = require("express");
const router = express.Router();
const { log } = console;

// ㅜ app.js 파일에서 설정한 해당 요청 주소가 적용
// ㅜ 당일 출쳌
router.post("/today", (req, res) => {
  // 유저가 누른 오늘 날짜와 이메일을 담아옴
  const { email, date } = req.body;
  let userId = null;
  User.findOne({
    where: { email: email },
  })
    .then((e) => {
        userId = e.id;
      DailyCheck.findOne({
        where: {
          day: date,
          user_id: userId,
        },
      }).then((e) => {
        if (!e) {
          DailyCheck.create({
            day: date,
            user_id: userId,
          }).then(() => {
            res.send({ result : date });
          });
        } else {
          res.send({ done: "already" });
        }
      });
    })
});

// ㅜ 이전 출쳌
router.post("/last", (req, res) => {
  // 유저 이메일을 담아옴
  const { email } = req.body;
  User.findOne({
    where: { email: email },
  }).then((e) => {
    DailyCheck.findAll({
      where: { user_id: e.id },
    }).then((e) => {
      let dates = e;
      // if조건이 왜 안필요한지 모르겠음..?
      // if(e[0] !== null){
      dates = e.map((el) => el.dataValues.day);
      // }
      res.send({
        data: dates,
      });
    });
  });
});

module.exports = router;

// 08.25.10 수정
