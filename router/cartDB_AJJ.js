const cartListCount = require("../controller/cartListCount_AJJ");
const { Cart } = require("../model/index_AJJ");
const { Op } = require("sequelize");
const express = require("express");
const router = express.Router();
const { log } = console;

router.post("/:products", (req, res) => {
  //
  let { id } = req.body;

  // ㅜ 비회원일 경우
  if (id === "") id = null;

  const shopName = req.params.products.slice(0, 3);
  const productNum = parseInt(req.params.products.replace(shopName, ""));
  //
  switch (shopName) {
    //
    case "ajy":
      Cart.findOne({ where: { ajyproduct_num: productNum, user_id: id } }).then((value) => {
        //
        if (value === null) {
          Cart.create({ ajyproduct_num: productNum, user_id: id })
            //
            .then(() => {
              cartListCount(res).then((count) => res.send({ count }));
            });
        } else {
          Cart.increment({ product_count: 1 }, { where: { ajyproduct_num: productNum, user_id: id } }).then(() => {
            //
            cartListCount(res).then((count) => res.send({ count }));
          });
        }
      });
      break;
    case "jbh":
      Cart.findOne({ where: { jbhproduct_num: productNum, user_id: id } }).then((value) => {
        //
        if (value === null) {
          Cart.create({ jbhproduct_num: productNum, user_id: id })
            //
            .then(() => {
              cartListCount(res).then((count) => res.send({ count }));
            });
        } else {
          Cart.increment({ product_count: 1 }, { where: { jbhproduct_num: productNum, user_id: id } }).then(() => {
            //
            cartListCount(res).then((count) => res.send({ count }));
          });
        }
      });
      break;
    case "jjw":
      Cart.findOne({ where: { jjwproduct_num: productNum, user_id: id } }).then((value) => {
        //
        if (value === null) {
          Cart.create({ jjwproduct_num: productNum, user_id: id })
            //
            .then(() => {
              cartListCount(res).then((count) => res.send({ count }));
            });
        } else {
          Cart.increment({ product_count: 1 }, { where: { jjwproduct_num: productNum, user_id: id } }).then(() => {
            //
            cartListCount(res).then((count) => res.send({ count }));
          });
        }
      });
      break;
    default:
      break;
  }
});
module.exports = router;

// 08.30.16 수정
