const { Keyword, User } = require("../model/index_AJJ");
const { Op } = require("sequelize");
const express = require("express");
const router = express.Router();
const { log } = console;

//////////////////////////////////
// ㅜ 검색 창에 검색어를 입력했을 때
router.post("/save", async (req, res) => {
  const { keyword } = req.body;
  //
  // ㅜ 비회원일 경우
  if (!req.session.email) {
    let keywords = new Array();
    //
    await Keyword.findOne({ where: { name: keyword, user_id: null } }).then((obj) => {
      if (obj === null) {
        Keyword.create({ name: keyword, user_id: null }).then(() => res.end());
        //
      } else Keyword.increment({ count: 1 }, { where: { name: keyword, user_id: null } }).then(() => res.end());
    });
    //
    if (req.cookies.keyword) {
      keywords = [...req.cookies.keyword.split(", ")];
    }
    keywords = [...keywords, keyword];
    //
    // ㅜ 중복 값 제거
    keywords = keywords.reduce((prev, curr) => {
      if (prev.includes(curr)) {
        prev.splice(prev.indexOf(curr), 1);
      }
      return [...prev, curr];
    }, new Array());
    //
    // ㅜ 5개까지만 저장
    for (let i = 0; i < keywords.length - 5; i++) {
      keywords.shift();
    }
    res.send({ keywords });
    //
    // ㅜ 로그인한 회원일 경우
  } else {
    let id;
    const email = req.session.email;
    //
    User.findOne({ where: { email: email }, attributes: ["id"] })
      .then((obj) => id = obj.dataValues.id)
      .then(() => {
        //
        Keyword.findOne({ where: { name: keyword, user_id: id } }).then((obj) => {
          if (obj === null) {
            Keyword.create({ name: keyword, user_id: id }).then(() => res.end());
            //
          } else Keyword.increment({ count: 1 }, { where: { name: keyword, user_id: id } }).then(() => res.end());
        });
      });
  }
});

///////////////////////////////////
// ㅜ 검색 창 아래의 최근 검색어 화면
router.post("/last", (req, res) => {
  //
  // ㅜ 비회원일 경우
  if (!req.session.email) {
    let { keywords } = req.body;
    keywords = keywords.split(", ");
    res.send({ keywords });
    //
    // ㅜ 로그인한 회원일 경우
  } else {
    let id;
    const email = req.session.email;
    //
    User.findOne({ where: { email: email }, attributes: ["id"] })
      .then((obj) => id = obj.dataValues.id)
      .then(() => {
        Keyword.findAll({ where: { user_id: id }, attributes: ["name"], order: [["updated_at", "DESC"]], limit: 5 }).then((obj) => {
          const keywords = obj.map((obj) => obj.dataValues.name);
          res.send({ keywords });
        });
      })
  }
});
//
module.exports = router;
//
// 09.03.22 수정
