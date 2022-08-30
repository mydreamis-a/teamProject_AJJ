const { Keyword } = require("../model/index_AJJ");
const express = require("express");
const router = express.Router();
const { log } = console;

// ㅜ 로그인 여부 확인 및 로그인 정보 연동 필요
router.post("/", (req, res) => {
  //
  let { id, keyword } = req.body;

  // ㅜ 비회원일 경우
  if (id === "") id = null;

  Keyword.findOne({ where: { name: keyword, user_id: id } }).then((value) => {
    if (value === null) {
      Keyword.create({
        name: keyword,
        user_id: id,
      });
    } else Keyword.increment({ count: 1 }, { where: { name: keyword, user_id: id } });
  });
});

module.exports = router;

// 08.30.12 수정
