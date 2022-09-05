const { Cart, AJYproduct, JBHproduct, JJWproduct, User } = require("../model/index_AJJ");
const _cartTotalCount = require("../controller/cartTotalCount_AJJ");
const { Op } = require("sequelize");
const express = require("express");
const router = express.Router();
const { log } = console;

///////////////////////////////
// ㅜ 장바구니에 상품을 담을 경우
router.post("/:shopName/:productNum", async (req, res) => {
  //
  const { shopName, productNum } = req.params;
  //
  // ㅜ 비회원일 경우
  if (req.session.email === "") {
    //
    const id = null;
    let update = false;
    let cartSession = req.session.cart;
    //
    // ㅜ 첫 접속일 경우
    if (cartSession === undefined) {
      cartSession = new Array();
    }
    //
    else {
      cartSession.forEach(async (el) => {
        //
        // ㅜ 해당 상품이 이미 저장되어 있을 경우
        if (el[`${shopName}product_num`] === productNum) {
          //
          el.product_count++;
          update = true;
          return;
        }
      });
    }
    if (!update) {
      cartSession = await addCartSession(shopName, productNum, cartSession);
    }
    req.session.cart = cartSession;
    //
    // ㅜ 장바구니에 담긴 모든 상품의 수량
    const cartTotalCount = _cartTotalCount(id, cartSession);
    res.send({ cartTotalCount });
  }
  // ㅜ 로그인한 회원일 경우
  else {
    let id = null;
    let conditionObj = null;
    const email = req.session.email;
    //
    User.findOne({ where: { email: email }, attributes: ["id"] })
      .then((obj) => (id = obj.dataValues.id))
      .then(() => {
        switch (shopName) {
          case "ajy":
            conditionObj = { ajyproduct_num: productNum, user_id: id };
            break;
          case "jbh":
            conditionObj = { jbhproduct_num: productNum, user_id: id };
            break;
          case "jjw":
            conditionObj = { jjwproduct_num: productNum, user_id: id };
            break;
        }
        // ㅜ 이미 저장되어 있는 상품인지에 따라 수량만 증가시키거나 로우 생성하기
        return Cart.findOne({ where: conditionObj });
      })
      .then((obj) => {
        if (obj !== null) return Cart.increment({ product_count: 1 }, { where: conditionObj });
        else return Cart.create(conditionObj);
      })
      // ㅜ 장바구니에 담긴 모든 상품의 수량
      .then(() => {
        const cartSession = null;
        return _cartTotalCount(id, cartSession);
      })
      .then((cartTotalCount) => res.send({ cartTotalCount }));
  }
});

////////////////////////////////////////////
/**
 * 장바구니에 담은 상품을 세션에 추가하는 함수
 * @param {string} shopName 상점 이름
 * @param {number} productNum 상품 번호
 * @param {object} cartSession 세션에 저장된 장바구니 정보
 * @returns {object} cartSession
 */
async function addCartSession(shopName, productNum, cartSession) {
  //
  let cartProductObj = null;
  switch (shopName) {
    case "ajy":
      await AJYproduct.findOne({ where: { id: productNum }, attributes: ["price"] })
        .then((obj) => obj.dataValues.price)
        .then((price) => {
          cartProductObj = {
            ajyproduct_num: productNum,
            jbhproduct_num: null,
            jjwproduct_num: null,
            product_count: 1,
            AJYproduct: { price: price },
          };
        });
      break;
    case "jbh":
      await JBHproduct.findOne({ where: { id: productNum }, attributes: ["price"] })
        .then((obj) => obj.dataValues.price)
        .then((price) => {
          cartProductObj = {
            ajyproduct_num: null,
            jbhproduct_num: productNum,
            jjwproduct_num: null,
            product_count: 1,
            JBHproduct: { price: price },
          };
        });
      break;
    case "jjw":
      await JJWproduct.findOne({ where: { id: productNum }, attributes: ["price"] })
        .then((obj) => obj.dataValues.price)
        .then((price) => {
          cartProductObj = {
            ajyproduct_num: null,
            jbhproduct_num: null,
            jjwproduct_num: productNum,
            product_count: 1,
            JJWproduct: { price: price },
          };
        });
      break;
  }
  cartSession.push(cartProductObj);
  return cartSession;
}

////////////////////////////////////////////////
// ㅜ 장바구니 아이콘을 클릭했을 때의 장바구니 화면
router.post("/list", (req, res) => {
  //
  // ㅜ 비회원일 경우
  if (req.session.email === "") {
    //
    // ㅜ 첫 접속 시
    if (req.session.cart === undefined) {
      req.session.cart = new Array();
    }
    const cartProducts = req.session.cart;
    res.send({ cartProducts });
  }
  // ㅜ 로그인한 회원일 경우
  else {
    const email = req.session.email;
    //
    User.findOne({ where: { email: email }, attributes: ["id"] })
      .then((obj) => obj.dataValues.id)
      .then((id) => {
        return Cart.findAll({
          where: { user_id: id },
          order: [["updated_at", "ASC"]],
          include: [{ model: AJYproduct, attributes: ["price"] }],
          attributes: ["ajyproduct_num", "jbhproduct_num", "jjwproduct_num", "product_count"],
        });
      })
      .then((obj) => obj.map((_Cart) => _Cart.dataValues))
      .then((cartProducts) => res.send({ cartProducts }));
  }
});

////////////////////////////////////////
// ㅜ 장바구니 화면에서 상품을 삭제할 경우
router.post("/delete/:shopName/:productNum", (req, res) => {
  const { shopName, productNum } = req.params;
  //
  // ㅜ 비회원일 경우
  if (!req.session.email) {
    //
    const cartProducts = req.session.cart;
    //
    // key: ajyproduct, jhbproduct, jjwproduct
    for (const key in cartProducts) {
      if (Object.hasOwnProperty.call(cartProducts, key)) {
        //
        cartProducts[key] = cartProducts[key].reduce((prev, curr) => {
          if (curr[`${shopName}product_num`] === productNum) {
            return [...prev];
          } else return [...prev, curr];
        }, new Array());
        //
      }
    }
    req.session.cart = cartProducts;
    req.session.save();
  }
  // ㅜ 로그인한 회원일 경우
  else {
    switch (shopName) {
      case "ajy":
        AJYproduct.destroy({});
        break;

      default:
        break;
    }
  }
});
module.exports = router;
//
// 09.05.07 수정
