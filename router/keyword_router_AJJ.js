const { Keyword, User } = require("../model/index_AJJ");
// const cookie = require("cookie-parser");
const express = require("express");
const router = express.Router();
const { log } = console;

//////////////////////////////////
// ㅜ 검색 창에 검색어를 입력했을 때
router.post("/save", async (req, res) => {
  const keyword = req.body["product-keyword"];
  //
  // ㅜ 비회원일 경우
  if (!req.session.email) {
    //
    let keywordArr = new Array();
    if (req.cookies.keyword) {
      console.log(req.cookies.keyword);
      // const a = req.cookies.keyword.join(",");
      keywordArr.push(req.cookies.keyword);
    }

    keywordArr = [...keywordArr, keyword];
    log(keywordArr);
    // keywordArr.push(keyword);
    const string = keywordArr.join(",");
    // log(string);
    // log(typeof string);

    // [ a, b, c, ]
    res.cookie("keyword", string, { maxAge: 60 * 1000 });
    log(req.cookies.keyword);
    res.redirect("/");
    // 쿠키도 비동기?
    // 쿠키 이후 어떻게?
    // 쿠키 형태를 배열로 가능?
    //
    // ㅜ 로그인한 회원일 경우
  } else {
    let id;
    const email = req.session.email;
    //
    User.findOne({ where: { email: email }, attributes: ["id"] })
      .then((_User) => (id = _User.dataValues.id))
      .then(() => {
        //
        Keyword.findOne({ where: { name: keyword, user_id: id } }).then((_Keyword) => {
          if (_Keyword === null) {
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
  let cookies = new Array();
  //
  // ㅜ 비회원일 경우
  // if (!req.session.email) {
  //
  // ㅜ 로그인한 회원일 경우
  // } else {
  // const email = req.session.email;
  Keyword.findAll({ where: { user_id: null }, attributes: ["name"], order: [["updated_at", "DESC"]], limit: 5 }).then((arr) => {
    const keywords = arr.map((_Keyword) => _Keyword.dataValues.name);
    res.send({ keywords });
  });
  // }
});
//
module.exports = router;
//
// 09.03.16 수정
