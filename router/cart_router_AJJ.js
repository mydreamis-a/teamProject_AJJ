const { AJYproduct, JBHproduct, JJWproduct, Cart } = require("../model/index_AJJ");
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
    case "AJY":
      Cart.create({
        ajyproduct_num: productNum,
        user_id: 
      });
      break;

    default:
      break;
  }
});

module.exports = router;
