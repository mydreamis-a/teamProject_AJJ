const express = require("express");
const router = express.Router();
const { log } = console;

router.get("/", (req, res) => {
  //
  res.render("board_AJJ");
});

router.post("/", (req, res) => {
  //
  res.send();
})
module.exports = router;
//
// 09.15.10 수정
