const { sequelize, User, Cart, Like, Comment, AJYproduct, JBHproduct, JJWproduct, DailyCheck } = require("../model/index_AJJ");
const express = require("express");
const router = express.Router();
const { log } = console;

// ㅜ app.js 파일에서 설정한 해당 요청 주소가 적용
router.get("/", (req, res) => {});

module.exports = router;

// 08.25.10 수정