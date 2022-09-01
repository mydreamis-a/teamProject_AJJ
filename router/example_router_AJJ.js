const { sequelize, User, Cart, Like, Comment, Keyword, AJYproduct, JBHproduct, JJWproduct, DailyCheck, BestItem } = require("../model/index_AJJ");
const express = require("express");
const router = express.Router();
const { log } = console;
//
// ㅜ app.js 파일에서 설정한 해당 요청 주소가 적용
router.post("/", (req, res) => {});
//
module.exports = router;
//
// 09.01.13 수정
