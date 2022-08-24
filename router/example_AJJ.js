const { sequelize, User, Cart, Like, Comment, AJYproduct, JBHproduct, JJWproduct, DailyCheck } = require("../model/index_AJJ");
const express = require("express");
const router = express.Router();
const { log } = console;

router.get("/", (req, res) => {
  User.findAll({}).then((e) => log(e));
});

module.exports = router;

// 08.24.21 수정
