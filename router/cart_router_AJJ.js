const { Cart } = require("../model/index_AJJ");
const express = require("express");
const router = express.Router();
const { log } = console;

router.post("/:products", (req, res) => {
  //
  const shopName = req.params.products.slice(0, 3);
  const productNum = req.params.products.replace(shopName, "");
  //
  switch (shopName) {
    //
    // ㅜ 로그인 여부 확인 및 로그인한 회원 정보 필요
    case "AJY":
      Cart.create({
        ajyproduct_num: productNum,
      });
      break;
    //
    case "JBH":
      Cart.create({
        jbhproduct_num: productNum,
      });
      break;
    //
    case "JJW":
      Cart.create({
        jjwproduct_num: 3,
      });
      break;
    default:
      break;
  }
});

module.exports = router;
