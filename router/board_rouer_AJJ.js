const express = require("express");
const router = express.Router();
const { log } = console;

router.post("/", (req, res) => {
  //
  res.render("board_AJJ");
});
module.exports = router;
//
// 09.14.17 수정
