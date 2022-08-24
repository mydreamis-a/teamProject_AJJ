const { sequelize, User, Cart, Like, Comment, AJYproduct, JBHproduct, JJWproduct, DailyCheck, ProductKeyword } = require("../model/index_AJJ");
const express = require("express");
const router = express.Router();
const { log } = console;

router.get("/", (req, res) => {
  User.findAll({}).then((e) => log(e));
});

module.exports = router;
