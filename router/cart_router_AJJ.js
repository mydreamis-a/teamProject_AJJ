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
  await Cart.findAll({ where: { user_id: { [Op.is]: null }, ajyproduct_num: { [Op.not]: null } } })
    //
    .then((ajyproducts) => {
      cartProducts.ajyproducts = ajyproducts.map((value) => value.dataValues);
    });
  await Cart.findAll({ where: { user_id: { [Op.is]: null }, jbhproduct_num: { [Op.not]: null } } })
    //
    .then((jbhproducts) => {
      cartProducts.jbhproducts = jbhproducts.map((value) => value.dataValues);
    });
  await Cart.findAll({ where: { user_id: { [Op.is]: null }, jjwproduct_num: { [Op.not]: null } } })
    //
    .then((jjwproducts) => {
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
      saveCartProducts({ ajyproduct_num: productNum, user_id: id });
      break;
    case "jbh":
      saveCartProducts({ jbhproduct_num: productNum, user_id: id });
      break;
    case "jjw":
      saveCartProducts({ jjwproduct_num: productNum, user_id: id });
      break;
    default:
      break;
  }
  /**
   * 장바구니에 담기 버튼을 클릭한 상품 정보를 저장하는 함수
   * @param {*} data 찾거나 추가할 데이터 내용
   */
  const saveCartProducts = (data) => {
    Cart.findOne({ where: data }).then((value) => {
      //
      if (value === null) Cart.create(data).then(() => cartTotalCount(res).then((count) => res.send({ count })));
      else {
        Cart.increment({ product_count: 1 }, { where: data }).then(() => cartTotalCount(res).then((count) => res.send({ count })));
      }
    });
  };
});
//
module.exports = router;
//
// 09.01.19 수정
