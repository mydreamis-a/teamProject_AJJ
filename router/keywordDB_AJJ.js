const { Keyword } = require("../model/index_AJJ");
const express = require("express");
const router = express.Router();
const { log } = console;

// ㅜ 로그인 여부 확인 및 로그인 정보 연동 필요
router.post("/", (req, res) => {
    //
    const { keyword }= req.body;
    Keyword.findAll({ where: { name: keyword }})
});

module.exports = router;

// 08.30.08 수정
