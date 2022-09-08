/////////////////////////////////////////////
// 목적: 상품 목록 화면을 위한 router 코드 모음

const sendProductTags = require("../controller/sendProductTags_AJJ");
const _cartTotalCount = require("../controller/cartTotalCount_AJJ");
//
const { User } = require("../model/index_AJJ");
const { Op } = require("sequelize");
const express = require("express");
const router = express.Router();
const { log } = console;

////////////////////////////////////////////////
// ㅜ 각 상점의 버튼을 클릭 했을 때의 상품 목록 화면
// 1. 세션 정보로 로그인 유무 판단
// 2. 비회원이면서 첫 접속일 경우
//    장바구니 수량은 0으로
//    sendProductTags 함수에 전송
// 3. 비회원이면서 세션에 저장된 장바구니 정보가 있을 경우
//    cartTotalCount 함수를 통해
//    현재 장바구니에 담긴 모든 상품의 수량을 가져와서
//    sendProductTags 함수에 전송
// 4. 로그인한 회원일 경우
//    세션에 저장된 이메일을 통해서
//    유저 테이블의 id 컬럼 값을 가져오고
//    cartTotalCount 함수를 통해
//    해당 회원의 장바구니 테이블에서
//    모든 상품의 수량을 가져와서
//    sendProductTags 함수에 전송
router.post("/:shopName", async (req, res) => {
  //
  let id = null;
  let email = null;
  let cartTotalCount = 0;
  const shopName = req.params.shopName;
  const { skipCount, limitCount } = req.body;
  const condition = { attributes: ["id", "name", "price", "img", "like_count"], offset: Number(skipCount), limit: Number(limitCount) };
  //
  // ㅜ 비회원일 경우
  if (req.session.email === undefined) {
    //
    if (req.session.cart === undefined) {
      cartTotalCount = 0;
    }
    //
    else {
      const cartSession = req.session.cart;
      cartTotalCount = _cartTotalCount(id, cartSession);
    }
  }
  // ㅜ 로그인한 회원일 경우
  else {
    email = req.session.email;
    //
    await User.findOne({ where: { email: email }, attributes: ["id"] })
      .then((obj) => {
        return (id = obj.dataValues.id);
      })
      .then(async () => {
        const cartSession = null;
        cartTotalCount = await _cartTotalCount(id, cartSession);
        // log("2");
      });
  }
  sendProductTags(shopName, condition, res, email, cartTotalCount);
});

///////////////////////////////////////////////
// ㅜ 검색어로 상품 검색 했을 때의 상품 목록 화면
router.post("/search/:shopName/:keyword", (req, res) => {
  //
  const _cartTotalCount = null;
  const { keyword } = req.params;
  const email = req.session.email; // log(email === undefined); // 비회원일 경우
  const shopName = req.params.shopName;
  const { skipCount, limitCount } = req.body;
  const condition = { where: { name: { [Op.like]: `%${keyword}%` } }, attributes: ["id", "name", "price", "img", "like_count"], offset: Number(skipCount), limit: Number(limitCount) };
  //
  sendProductTags(shopName, condition, res, email, _cartTotalCount);
})

/////////////////////////////////////////////////
// ㅜ 신상품순의 버튼을 클릭 했을 때의 상품 목록 화면
router.post("/new/:shopName", (req, res) => {
  //
  const _cartTotalCount = null;
  const email = req.session.email; // log(email === undefined); // 비회원일 경우
  const shopName = req.params.shopName;
  const { skipCount, limitCount } = req.body;
  const condition = { order: [["id", "DESC"]], attributes: ["id", "name", "price", "img", "like_count"], offset: Number(skipCount), limit: Number(limitCount) };
  //
  sendProductTags(shopName, condition, res, email, _cartTotalCount);
});

///////////////////////////////////////////////////
// ㅜ 낮은 가격순의 버튼을 클릭 했을 때의 상품 목록 화면
router.post("/lowPrice/:shopName", (req, res) => {
  //
  const _cartTotalCount = null;
  const email = req.session.email; // log(email === undefined); // 비회원일 경우
  const shopName = req.params.shopName;
  const { skipCount, limitCount } = req.body;
  const condition = { order: [["price", "ASC"]], attributes: ["id", "name", "price", "img", "like_count"], offset: Number(skipCount), limit: Number(limitCount) };
  //
  sendProductTags(shopName, condition, res, email, _cartTotalCount);
});

///////////////////////////////////////////////////
// ㅜ 높은 가격순의 버튼을 클릭 했을 때의 상품 목록 화면
router.post("/highPrice/:shopName", (req, res) => {
  //
  const _cartTotalCount = null;
  const email = req.session.email; // log(email === undefined); // 비회원일 경우
  const shopName = req.params.shopName;
  const { skipCount, limitCount } = req.body;
  const condition = { order: [["price", "DESC"]], attributes: ["id", "name", "price", "img", "like_count"], offset: Number(skipCount), limit: Number(limitCount) };
  //
  sendProductTags(shopName, condition, res, email, _cartTotalCount);
});

//////////////////////////////////////////////////////W////////
// ㅜ 가격 범위를 입력하고 검색 버튼을 클릭 했을 때의 상품 목록 화면
router.post("/sortPrice/:shopName/:min/:max", (req, res) => {
  //
  const min = req.params.min;
  const max = req.params.max;
  const _cartTotalCount = null;
  const email = req.session.email; // log(email === undefined); // 비회원일 경우
  const shopName = req.params.shopName;
  const { skipCount, limitCount } = req.body;
  const condition = { where: { price: { [Op.gte]: min, [Op.lte]: max } }, attributes: ["id", "name", "price", "img", "like_count"], offset: Number(skipCount), limit: Number(limitCount) };
  //
  sendProductTags(shopName, condition, res, email, _cartTotalCount);
});
//
module.exports = router;
//
// 09.07.00 수정
