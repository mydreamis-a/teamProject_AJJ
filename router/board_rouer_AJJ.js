const express = require("express");
const router = express.Router();
const { log } = console;

router.post("/", (req, res) => {
  //
  log("dd")
  log(__dirname)
  res.render("board_AJJ");
});
module.exports = router;
//
// 09.15.02 수정
