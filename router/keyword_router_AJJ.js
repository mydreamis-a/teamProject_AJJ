const { Keyword } = require("../model/index_AJJ");
const express = require("express");
const router = express.Router();
const { log } = console;

//////////////////////////////////
// ㅜ 검색 창에 검색어를 입력했을 때
router.post("/save", (req, res) => {
  //
  let { id, keyword } = req.body;
  //
  // ㅜ 비회원일 경우
  if (id === "") id = null;
  //
  Keyword.findOne({ where: { name: keyword, user_id: id } }).then((value) => {
    if (value === null) {
      Keyword.create({ name: keyword, user_id: id }).then(() => res.end());
      //
    } else Keyword.increment({ count: 1 }, { where: { name: keyword, user_id: id } }).then(() => res.end());
  });
});

///////////////////////////////////
// ㅜ 검색 창 아래의 최근 검색어 화면
router.post("/last", (req, res) => {
  //
  let { id } = req.body;
  //
  // ㅜ 비회원일 경우
  if (id === "") id = null;
  //
  Keyword.findAll({ where: { user_id: id }, order: [["updated_at", "DESC"]], limit: 5 }).then((value) => {
    res.send(value.map((el) => el.name));
  });
});
//
module.exports = router;
//
// 09.01.13 수정
