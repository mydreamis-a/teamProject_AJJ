const { Keyword } = require("../model/index_AJJ");
const express = require("express");
const router = express.Router();
const { log } = console;

// ㅜ 검색어 저장
router.post("/", (req, res) => {
  let { id, keyword } = req.body;
  //
  // ㅜ 비회원일 경우
  if (id === "") id = null;
  //
  Keyword.findOne({ where: { name: keyword, user_id: id } }).then((value) => {
    if (value === null) {
<<<<<<< HEAD
      Keyword.create({
        name: keyword,
        user_id: id,
      });
    } else Keyword.increment({ count: 1 }, { where: { name: keyword, user_id: id } });
=======
      Keyword.create({ name: keyword, user_id: id }).then(res.end());
    } else
      Keyword.increment({ count: 1 }, { where: { name: keyword, user_id: id } }).then(res.end());
>>>>>>> 3bca3fb (정렬 기능 최적화 구현 완료)
  });
});

// ㅜ 최근 검색어
router.post("/last", (req, res) => {
  //
  let { id } = req.body;
  //
  // ㅜ 비회원일 경우
  if (id === "") id = null;
  //
  Keyword.findAll({ where: { user_id: id }, order: [["updated_at", "DESC"]], limit: 5 })
    .then((value) => { res.send(value.map((el) => el.name)) });
});
//
module.exports = router;
<<<<<<< HEAD

// 08.30.16 수정
=======
//
// 08.31.22 수정
>>>>>>> 3bca3fb (정렬 기능 최적화 구현 완료)
