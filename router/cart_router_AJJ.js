const cartTotalCount = require("../controller/cartTotalCount_AJJ");
const { Cart, AJYproduct, JBHproduct, JJWproduct, User } = require("../model/index_AJJ");
const { Op } = require("sequelize");
const express = require("express");
const router = express.Router();
const { log } = console;

////////////////////////////////////////////////
// ㅜ 장바구니 아이콘을 클릭했을 때의 장바구니 화면
router.post("/list", async (req, res) => {
  const cartProducts = {};
  //
  // ㅜ 비회원일 경우
  if (!req.session.email) {
    //
    if (req.session.cart) {
    }
  }
  // ㅜ 로그인한 회원일 경우
  else {
    let id;
    const _email = req.session.email;
    //
    await User.findOne({ where: { email: _email }, attributes: ["id"] }).then((User) => {
      id = User.dataValues.id;
    });
    //
    await Cart.findAll({
      where: {
        user_id: id,
        ajyproduct_num: { [Op.not]: null },
      },
      attributes: ["ajyproduct_num", "product_count"],
      include: [{ model: AJYproduct, attributes: ["price"] }],
      //
    }).then((ajyproducts) => {
      ajyproducts = ajyproducts.map((Cart) => Cart.dataValues);
      ajyproducts.map((Cart) => (Cart.AJYproduct = Cart.AJYproduct.dataValues));
      //
      cartProducts.ajyproducts = ajyproducts;
    });

    await Cart.findAll({
      where: {
        user_id: id,
        jbhproduct_num: { [Op.not]: null },
      },
      attributes: ["jbhproduct_num", "product_count"],
      include: [{ model: JBHproduct, attributes: ["price"] }],
      //
    }).then((jbhproducts) => {
      jbhproducts = jbhproducts.map((Cart) => Cart.dataValues);
      jbhproducts.map((Cart) => (Cart.JBHproduct = Cart.JBHproduct.dataValues));
      log(jbhproducts)
      //
      cartProducts.jbhproducts = jbhproducts;
    });
    //
    await Cart.findAll({
      where: {
        user_id: id,
        jjwproduct_num: { [Op.not]: null },
      },
      attributes: ["jjwproduct_num", "product_count"],
      include: [{ model: JJWproduct, attributes: ["price"] }],
      //
    }).then((jjwproducts) => {
      jjwproducts = jjwproducts.map((Cart) => Cart.dataValues);
      jjwproducts.map((Cart) => (Cart.JJWproduct = Cart.JJWproduct.dataValues));
      //
      cartProducts.jjwproducts = jjwproducts;
    });
    res.send(cartProducts);
  }
});

///////////////////////////////
// ㅜ 장바구니에 상품을 담을 경우
router.post("/:shopName/:productNum", (req, res) => {
  //
  const { shopName, productNum } = req.params;
  //
  log(req.session)
  log(req.session.email)
  // ㅜ 비회원일 경우
  if (!req.session.email) {
    //
    if (!req.session.cart) req.session.cart = [];
    else req.session.cart.push({shopName: shopName, product_num: productNum, product_count: 1})
    //
  }
  // ㅜ 로그인한 회원일 경우
  else {
    let id;
    const _email = req.session.email;
    log(_email)
    User.findOne({ where: { email: _email }, attributes: ["id"] }).then((User) => {
      id = User.dataValues.id;
      //
      switch (shopName) {
        case "ajy":
          saveCartProducts({ ajyproduct_num: productNum, user_id: id }, id);
          break;
        case "jbh":
          saveCartProducts({ jbhproduct_num: productNum, user_id: id }, id);
          break;
        case "jjw":
          saveCartProducts({ jjwproduct_num: productNum, user_id: id }, id);
          break;
        default:
          break;
      }
    });
  }
  /**
   * 장바구니에 담기 버튼을 클릭한 상품 정보를 저장하는 함수
   * @param {object} data 찾거나 추가할 데이터 내용
   */
  function saveCartProducts(data, id) {
    Cart.findOne({ where: data }).then((value) => {
      //
      if (value === null) Cart.create(data).then(() => cartTotalCount(id).then((count) => res.send({ count })));
      else {
        Cart.increment({ product_count: 1 }, { where: data }).then(() => cartTotalCount(id).then((count) => res.send({ count })));
      }
    });
  }
});
module.exports = router;
//
// 09.03.10 수정
