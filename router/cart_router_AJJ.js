const cartTotalCount = require("../controller/cartTotalCount_AJJ");
const { Cart, AJYproduct, JBHproduct, JJWproduct, User } = require("../model/index_AJJ");
const { Op } = require("sequelize");
const express = require("express");
const router = express.Router();
const { log } = console;

////////////////////////////////////////////////
// ㅜ 장바구니 아이콘을 클릭했을 때의 장바구니 화면
router.post("/list", async (req, res) => {
  let cartProducts = new Object();
  //
  // ㅜ 비회원일 경우
  // [ { ajyproduct_num: number, product_count: number, AJYproduct: { price: number } } ]
  if (!req.session.email) {
    //
    cartProducts = req.session.cart;
    res.send(cartProducts);
  }
  // ㅜ 로그인한 회원일 경우
  else {
    let id;
    const email = req.session.email;
    //
    await User.findOne({ where: { email: email }, attributes: ["id"] }).then((_User) => {
      id = _User.dataValues.id;
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
      ajyproducts = ajyproducts.map((_Cart) => _Cart.dataValues);
      ajyproducts.map((_Cart) => (_Cart.AJYproduct = _Cart.AJYproduct.dataValues));
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
      jbhproducts = jbhproducts.map((_Cart) => _Cart.dataValues);
      jbhproducts.map((_Cart) => (_Cart.JBHproduct = _Cart.JBHproduct.dataValues));
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
      jjwproducts = jjwproducts.map((_Cart) => _Cart.dataValues);
      jjwproducts.map((_Cart) => (_Cart.JJWproduct = _Cart.JJWproduct.dataValues));
      //
      cartProducts.jjwproducts = jjwproducts;
    });
    res.send(cartProducts);
  }
});

///////////////////////////////
// ㅜ 장바구니에 상품을 담을 경우
router.post("/:shopName/:productNum", async (req, res) => {
  //
  const { shopName, productNum } = req.params;
  //
  // ㅜ 비회원일 경우
  if (!req.session.email) {
    //
    // ㅜ 첫 접속 시
    if (!req.session.cart) {
      req.session.cart = new Object();
      req.session.cart.ajyproduct = new Array();
      req.session.cart.jbhproduct = new Array();
      req.session.cart.jjwproduct = new Array();
    }
    const cartSession = req.session.cart;
    let _cartTotalCount = 0;
    let increment = false;
    let price;
    switch (shopName) {
      //
      case "ajy":
        await AJYproduct.findOne({ where: { id: productNum }, attributes: ["price"] })
          .then((_AJYproduct) => (price = _AJYproduct.dataValues.price))
          .then(() => {
            cartSession.ajyproduct.forEach((el) => {
              if (el.ajyproduct_num === productNum) {
                el.product_count++;
                increment = true;
                return;
              }
            });
            if (!increment) {
              cartSession.ajyproduct.push({ ajyproduct_num: productNum, product_count: 1, AJYproduct: { price: price } });
            }
          });
        break;
      //
      case "jbh":
        await JBHproduct.findOne({ where: { id: productNum }, attributes: ["price"] })
          .then((_JBHproduct) => (price = _JBHproduct.dataValues.price))
          .then(() => {
            cartSession.jbhproduct.forEach((el) => {
              if (el.jbhproduct_num === productNum) {
                el.product_count++;
                increment = true;
                return;
              }
            });
            if (!increment) {
              cartSession.jbhproduct.push({ jbhproduct_num: productNum, product_count: 1, JBHproduct: { price: price } });
            }
          });
        break;
      //
      case "jjw":
        await JJWproduct.findOne({ where: { id: productNum }, attributes: ["price"] })
          .then((_JJWproduct) => (price = _JJWproduct.dataValues.price))
          .then(() => {
            cartSession.jjwproduct.forEach((el) => {
              if (el.jjwproduct_num === productNum) {
                el.product_count++;
                increment = true;
                return;
              }
            });
            if (!increment) {
              cartSession.jjwproduct.push({ jjwproduct_num: productNum, product_count: 1, JJWproduct: { price: price } });
            }
          });
        break;
      default:
        break;
    }
    // ㅜ 비회원의 장바구니 수량
    _cartTotalCount = cartSession.ajyproduct.reduce((prev, curr) => (prev += curr.product_count), _cartTotalCount);
    _cartTotalCount = cartSession.jbhproduct.reduce((prev, curr) => (prev += curr.product_count), _cartTotalCount);
    _cartTotalCount = cartSession.jjwproduct.reduce((prev, curr) => (prev += curr.product_count), _cartTotalCount);
    res.send({ _cartTotalCount });
  }
  // ㅜ 로그인한 회원일 경우
  else {
    let id;
    const email = req.session.email;
    //
    User.findOne({ where: { email: email }, attributes: ["id"] }).then((_User) => {
      id = _User.dataValues.id;
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
    Cart.findOne({ where: data }).then((_Cart) => {
      //
      if (_Cart === null) Cart.create(data).then(() => cartTotalCount(id).then((_cartTotalCount) => res.send({ _cartTotalCount })));
      //
      else {
        Cart.increment({ product_count: 1 }, { where: data }).then(() => cartTotalCount(id).then((_cartTotalCount) => res.send({ _cartTotalCount })));
      }
    });
  }
});
module.exports = router;
//
// 09.03.14 수정
