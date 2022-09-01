const cartTotalCount = require("../controller/cartTotalCount_AJJ");
const { Cart } = require("../model/index_AJJ");
const { Op } = require("sequelize");
const express = require("express");
const router = express.Router();
const { log } = console;

////////////////////////////////////////////////
// ㅜ 장바구니 아이콘을 클릭했을 때의 장바구니 화면
router.post("/list", async (req, res) => {
  const cartProducts = {};
  //
  // ㅜ 비회원의 장바구니 DB 연동
  await Cart.findAll({ where: { user_id: { [Op.is]: null }, ajyproduct_num: { [Op.not]: null } } }).then((ajyproducts) => {
    cartProducts.ajyproducts = ajyproducts.map((value) => value.dataValues);
  });
  await Cart.findAll({ where: { user_id: { [Op.is]: null }, jbhproduct_num: { [Op.not]: null } } }).then((jbhproducts) => {
    cartProducts.jbhproducts = jbhproducts.map((value) => value.dataValues);
  });
  await Cart.findAll({ where: { user_id: { [Op.is]: null }, jjwproduct_num: { [Op.not]: null } } }).then((jjwproducts) => {
    cartProducts.jjwproducts = jjwproducts.map((value) => value.dataValues);
  });
  res.send(cartProducts);
});

///////////////////////////////
// ㅜ 장바구니에 상품을 담을 경우
router.post("/:products", (req, res) => {
  //
  let { id } = req.body;
  //
  // ㅜ 비회원일 경우
  if (id === "") id = null;
  //
  const shopName = req.params.products.slice(0, 3);
  const productNum = parseInt(req.params.products.replace(shopName, ""));
  //
  switch (shopName) {
    case "ajy":
      Cart.findOne({ where: { ajyproduct_num: productNum, user_id: id } }).then((value) => {
        //
        if (value === null) {
          Cart.create({ ajyproduct_num: productNum, user_id: id })
            //
            .then(() => {
              cartTotalCount(res).then((count) => res.send({ count }));
            });
        } else {
          Cart.increment({ product_count: 1 }, { where: { ajyproduct_num: productNum, user_id: id } }).then(() => {
            //
            cartTotalCount(res).then((count) => res.send({ count }));
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
              cartTotalCount(res).then((count) => res.send({ count }));
            });
        } else {
          Cart.increment({ product_count: 1 }, { where: { jbhproduct_num: productNum, user_id: id } }).then(() => {
            //
            cartTotalCount(res).then((count) => res.send({ count }));
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
              cartTotalCount(res).then((count) => res.send({ count }));
            });
        } else {
          Cart.increment({ product_count: 1 }, { where: { jjwproduct_num: productNum, user_id: id } }).then(() => {
            //
            cartTotalCount(res).then((count) => res.send({ count }));
          });
        }
      });
      break;
    default:
      break;
  }
});
//
module.exports = router;
//
// 09.01.13 수정
