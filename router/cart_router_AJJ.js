const { AJYproduct, JBHproduct, JJWproduct, Cart, DailyCheck } = require("../model/index_AJJ");
const express = require("express");
const router = express.Router();
const { log } = console;

router.post("/:products", (req, res) => {
  
  log(req.params.products);
});

module.exports = router;
