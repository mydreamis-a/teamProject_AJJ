const { Cart } = require("../model/index_AJJ");
const express = require("express");
const router = express.Router();
const { log } = console;

// ㅜ 로그인 여부 확인 및 로그인 정보 연동 필요
router.post("/:products", (req, res) => {
  //
  const shopName = req.params.products.slice(0, 3);
  const productNum = req.params.products.replace(shopName, "");
  //
  switch (shopName) {
    //
    case "AJY":
      Cart.findAll({
        where: { ajyproduct_num: productNum }
        //
      }).then(value => {
        //
        if (!value[0]) {
          Cart.create({ ajyproduct_num: productNum }).catch(() => {
            log("cccc")
            Cart.increment({ product_count: 1 }, { where: { ajyproduct_num: productNum }})
          })
        }
        else {
          Cart.increment({ product_count: 1 }, { where: { ajyproduct_num: productNum }}).then(log("DDDd"))
        }
      })
      break;
      //
    case "JBH":
      Cart.findAll({
        where: { jbhproduct_num: productNum }
        //
      }).then(value => {
        //
        if (!value[0]) {
          Cart.create({ jbhproduct_num: productNum })
        }
        else {
          Cart.increment({ product_count: 1 }, { where: { jbhproduct_num: productNum }})
        }
      })
      break;
      //
    case "JJW":
      Cart.findAll({
        where: { jjwproduct_num: productNum }
        //
      }).then(value => {
        //
        if (!value[0]) {
          Cart.create({ jjwproduct_num: productNum })
        }
        else {
          Cart.increment({ product_count: 1 }, { where: { jjwproduct_num: productNum }})
        }
      })
      break;
    default:
      break;
  }
});

module.exports = router;
