///////////////////////////////////////////
// 목적: 검색어 기능을 위한 router 코드 모음

const { User, Keyword } = require("../model/index_AJJ");
const { Op } = require("sequelize");
const express = require("express");
const router = express.Router();
const { log } = console;

//////////////////////////////////
// ㅜ 검색 창에 검색어를 입력했을 때
// 1. 세션 정보로 로그인 유무 판단
// 2. 비회원일 경우
//    기존에 저장된 검색어 쿠키가 있다면 배열로 가져오고
//    전송 받은 검색어를 배열에 추가해서
//    중복 값이 없는 지 확인하고 새로운 배열을 생성해서
//    배열 안에 5개만 남긴 다음
//    ajax에 전송
// 3. 로그인한 회원일 경우
//    세션에 저장된 이메일을 통해서
//    유저 테이블의 id 컬럼 값을 가져오고
//    해당 회원의 검색어 테이블에
//    해당 검색어가 기존에 저장 되어 있는지 확인
// 4. 없다면 검색어 테이블에 해당 검색어 정보의 로우 추가
// 5. 있다면 해당 검색어의 횟수 1 증가
router.post("/save", async (req, res) => {
  const { keyword } = req.body;
  //
  // ㅜ 비회원일 경우
  if (req.session.email === undefined) {
    //
    let keywords = new Array();
    //
    if (req.cookies.keyword !== undefined) {
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
      .then((obj) => {
        return (id = obj.dataValues.id);
      })
      .then(() => {
        return Keyword.findOne({ where: { name: keyword, user_id: id } });
      })
      .then((obj) => {
        if (obj === null) {
          Keyword.create({ name: keyword, user_id: id }).then(() => res.end());
        }
        //
        else {
          Keyword.increment({ count: 1 }, { where: { name: keyword, user_id: id } }).then(() => res.end());
        }
      });
  }
});

///////////////////////////////////
// ㅜ 검색 창 아래의 최근 검색어 화면
// 1. 세션 정보로 로그인 유무 판단
// 2. 비회원일 경우
//    전송 받은 문자열의 최근 검색어 쿠키를
//    역순의 배열로
//    ajax에 전송
// 3. 로그인한 회원일 경우
//    세션에 저장된 이메일을 통해서
//    유저 테이블의 id 컬럼 값을 가져오고
//    그를 통해 해당 회원의 검색어 테이블에서
//    5개의 최근 검색어 정보를 가져와서
//    배열로 ajax에 전송
router.post("/last", (req, res) => {
  //
  // ㅜ 비회원일 경우
  if (req.session.email === undefined) {
    // log(keywords === ""); // 쿠키가 아예 없을 경우
    //
    let { keywords } = req.body;
    keywords = keywords.split(", ").reverse();
    res.send({ keywords });
    //
    // ㅜ 로그인한 회원일 경우
  } else {
    let id;
    const email = req.session.email;
    //
    User.findOne({ where: { email: email }, attributes: ["id"] })
      .then((obj) => {
        return (id = obj.dataValues.id);
      })
      .then(() => {
        return Keyword.findAll({ where: { user_id: id }, attributes: ["name"], order: [["updated_at", "DESC"]], limit: 5 });
      })
      .then((obj) => {
        const keywords = obj.map((_obj) => _obj.dataValues.name);
        log(typeof keywords);
        res.send({ keywords });
      });
  }
});
//
module.exports = router;
//
// 09.06.21 수정
