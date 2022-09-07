////////////////////////////////////////////
// 목적: 장바구니 기능을 위한 router 코드 모음

const { Cart, User, AJYproduct, JBHproduct, JJWproduct } = require("../model/index_AJJ");
const _cartTotalCount = require("../controller/cartTotalCount_AJJ");
const express = require("express");
const router = express.Router();
const { log } = console;

///////////////////////////////
// ㅜ 장바구니에 상품을 담을 경우
// 1. 세션 정보로 로그인 유무 판단
// 2. 비회원이면서 첫 접속일 경우
//    세션에 새로운 장바구니 배열 생성
// 3. 비회원이면서 세션에 저장된 장바구니 정보가 있을 경우
//    params를 통해 상점의 이름과 상품 번호를 가져와서
//    해당 상품이 저장 되어 있는지 확인 후
//    있다면 해당 상품의 수량 1 증가
// 4. 해당 상품의 수량을 증가시키지 않았다면
//    장바구니 세션에 해당 상품 정보 추가
// 5. 장바구니 세션을 통해
//    현재 장바구니에 담긴 모든 상품의 수량을 가져와서
//    ajax에 전송
// 6. 로그인한 회원일 경우
//    세션에 저장된 이메일을 통해서
//    유저 테이블의 id 컬럼 값을 가져오고
//    params를 통해 상점의 이름과 상품 번호를 가져와서
//    해당 회원의 장바구니 테이블에
//    해당 상품이 기존에 저장 되어 있는지 확인
// 7. 있다면 해당 상품의 수량 1 증가
// 8. 없다면 장바구니 테이블에 해당 상품 정보의 로우 추가
// 9. 해당 회원의 장바구니 테이블에서
//    모든 상품의 수량을 가져와서
//    ajax에 전송
router.post("/:shopName/:productNum", async (req, res) => {
  //
  let { shopName, productNum } = req.params;
  productNum = Number(productNum);
  //
  // ㅜ 비회원일 경우
  if (req.session.email === undefined) {
    //
    const id = null;
    let update = false;
    let cartSession = req.session.cart;
    const _shopName = shopName.toUpperCase();
    //
    // ㅜ 첫 접속일 경우
    if (cartSession === undefined) {
      cartSession = new Array();
    }
    //
    else {
      cartSession.forEach((el) => {
        //
        // ㅜ 해당 상품이 이미 저장 되어 있을 경우
        // if (el[`${_shopName}product`]?.id === productNum) {
        if (el[`${_shopName}product`].id === productNum) {
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
      .then((obj) => {
        return (id = obj.dataValues.id);
      })
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
        // ㅜ 이미 저장 되어 있는 상품인지에 따라 수량만 증가시키거나 로우 생성하기
        return Cart.findOne({ where: conditionObj });
      })
      .then((obj) => {
        if (obj !== null) {
          return Cart.increment({ product_count: 1 }, { where: conditionObj });
        }
        //
        else {
          return Cart.create(conditionObj);
        }
      })
      // ㅜ 장바구니에 담긴 모든 상품의 수량
      .then(() => {
        const cartSession = null;
        return _cartTotalCount(id, cartSession);
      })
      .then((cartTotalCount) => {
        res.send({ cartTotalCount });
      });
  }
});

////////////////////////////////////////////////
// ㅜ 장바구니 아이콘을 클릭 했을 때의 장바구니 화면
// 1. 세션 정보로 로그인 유무 판단
// 2. 비회원이면서 첫 접속일 경우
//    세션에 새로운 장바구니 배열 생성
// 3. 장바구니 세션 정보 ajax에 전송
// 4. 로그인한 회원일 경우
//    세션에 저장된 이메일을 통해서
//    유저 테이블의 id 컬럼 값을 가져오고
//    그를 통해 해당 회원의 장바구니 테이블에서
//    모든 상품 정보를 가져오고
//    원하는 객체 형태로 정리한 후
//    ajax에 전송
router.post("/list", (req, res) => {
  //
  // ㅜ 비회원일 경우
  if (req.session.email === undefined) {
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
      .then((id) => findAllCart(id))
      .then((cartProducts) => res.send({ cartProducts }));
  }
});

///////////////////////////////////////
// ㅜ 장바구니 화면에서 상품을 삭제할 경우
// 1. 세션 정보로 로그인 유무 판단
// 2. 비회원일 경우
//    params를 통해 상점의 이름과 상품 번호를 가져와서
router.post("/delete/:shopName/:productNum", async (req, res) => {
  //
  // [{ product_count: number, JJWproduct: { id: number, name: string, price: number, img: string } }]
  let { shopName, productNum } = req.params;
  productNum = Number(productNum);
  let cartTotalCount = 0;
  //
  // ㅜ 비회원일 경우
  if (req.session.email === undefined) {
    //
    const id = null;
    let cartSession = req.session.cart;
    const _shopName = shopName.toUpperCase();
    //
    cartSession = cartSession.reduce((prev, curr) => {
      //
      if (curr[`${_shopName}product`].id !== productNum) {
        return [...prev, curr];
      }
      //
      else if (curr.product_count > 1) {
        curr.product_count--;
        return [...prev, curr];
      }
      //
      else return [...prev];
    }, new Array());
    //
    req.session.cart = cartSession;
    cartTotalCount = await _cartTotalCount(id, cartSession);
    //
    res.send({ cartProducts: cartSession, cartTotalCount });
  }
  // ㅜ 로그인한 회원일 경우
  else {
    let id = null;
    let conditionObj = null;
    const email = req.session.email;
    //
    User.findOne({ where: { email: email }, attributes: ["id"] })
      .then((obj) => {
        return (id = obj.dataValues.id);
      })
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
        };
        // ㅜ 이미 저장 되어 있는 상품인지에 따라 수량만 감소시키거나 로우 삭제하기
        return Cart.findOne({ where: conditionObj });
      })
      .then((obj) => {
        if (obj !== null) {
          return Cart.decrement({ product_count: 1 }, { where: conditionObj });
        }
        //
        else {
          return Cart.destroy(conditionObj);
        };
      })
      // ㅜ 장바구니에 담긴 모든 상품의 수량
      .then(async () => {
        const cartSession = null;
        return cartTotalCount = await _cartTotalCount(id, cartSession);
      })
      .then(() => findAllCart(id))
      .then((cartProducts) => {
        res.send({ cartProducts, cartTotalCount });
      });
  }
});

////////////////////////////////////////////
/**
 * 장바구니에 담은 상품을 세션에 추가하는 함수
 * @param {string} shopName 상점 이름
 * @param {number} productNum 상품 번호
 * @param {object} cartSession 세션에 저장된 장바구니 정보
 * @returns {object} cartSession 세션에 새롭게 저장할 장바구니 정보
 */
// ㅜ 역할:
// 상점 이름에 따라
// 장바구니에 담은 상품의 가격을 찾고
// 장바구니 세션에 해당 상품의 정보 추가
async function addCartSession(shopName, productNum, cartSession) {
  //
  let cartProductObj = null;
  switch (shopName) {
    case "ajy":
      await AJYproduct.findOne({
        where: { id: productNum },
        attributes: ["id", "name", "price", "img"],
      })
        .then((obj) => obj.dataValues)
        .then((_obj) => {
          const { id, name, price, img } = _obj;
          cartProductObj = {
            product_count: 1,
            AJYproduct: { id, name, price, img },
          };
        });
      break;
    case "jbh":
      await JBHproduct.findOne({
        where: { id: productNum },
        attributes: ["id", "name", "price", "img"],
      })
        .then((obj) => obj.dataValues)
        .then((_obj) => {
          const { id, name, price, img } = _obj;
          cartProductObj = {
            product_count: 1,
            JBHproduct: { id, name, price, img },
          };
        });
      break;
    case "jjw":
      await JJWproduct.findOne({
        where: { id: productNum },
        attributes: ["id", "name", "price", "img"],
      })
        .then((obj) => obj.dataValues)
        .then((_obj) => {
          const { id, name, price, img } = _obj;
          cartProductObj = {
            product_count: 1,
            JJWproduct: { id, name, price, img },
          };
        });
      break;
  }
  cartSession.push(cartProductObj);
  return cartSession;
}

/**
 * 
 * @param {number} id 
 * @returns 
 */
async function findAllCart(id) {
  //
  return await Cart.findAll({
    where: { user_id: id },
    attributes: ["product_count"],
    order: [["updated_at", "ASC"]],
    include: [
      { model: AJYproduct, attributes: ["id", "name", "price", "img"] },
      { model: JBHproduct, attributes: ["id", "name", "price", "img"] },
      { model: JJWproduct, attributes: ["id", "name", "price", "img"] },
    ],
  })
    .then((obj) => {
      return obj.map((_obj) => _obj.dataValues);
    })
    .then((arr) => {
      arr.forEach((el) => {
        //
        for (const key in el) {
          if (Object.hasOwnProperty.call(el, key)) {
            //
            let element = el[key];
            //
            if (element === null) {
              delete el[key];
              continue;
            }
            if (element.dataValues !== undefined) {
              el[key] = element.dataValues;
            }
          }
        }
      });
      return arr;
      // ㅗ [{ product_count: number, JJWproduct: { id: number, name: string, price: number, img: string } }]
    })
}
module.exports = router;
//
// 09.07.00 수정
