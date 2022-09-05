const sendProductTags = require("../controller/sendProductTags_AJJ");
const _cartTotalCount = require("../controller/cartTotalCount_AJJ");
//
const { Op } = require("sequelize");
const express = require("express");
const { User } = require("../model/index_AJJ");
const router = express.Router();
const { log } = console;

////////////////////////////////////////////////
// ㅜ 각 상점의 버튼을 클릭했을 때의 상품 목록 화면
router.post("/:shopName", async (req, res) => {
  //
  let id = null;
  let email = null;
  let cartTotalCount = 0;
  const shopName = req.params.shopName;
  const { skipCount, limitCount } = req.body;
  const condition = { attributes: ["name", "price", "img", "like_count"], offset: Number(skipCount), limit: Number(limitCount) };
  //
  // ㅜ 로그인한 회원일 경우
  if (req.session.email !== "") {
    email = req.session.email;
    //
    await User.findOne({ where: { email: email }, attributes: ["id"] })
      .then(obj => id = obj.dataValues.id)
      .then(async () => {
        const cartSession = null;
        cartTotalCount = await _cartTotalCount(id, cartSession); // question: 함수 안에 await 할 경우 모든 코드가 대기하는 것은 아닌가? 함수 스코프 안에서만 await 하는 거?
        // log("2");
      })
  }
  // ㅜ 비회원일 경우
  else {
    if (req.session.cart !== undefined) {
      //
      const cartSession = req.session.cart;
      cartTotalCount = _cartTotalCount(id, cartSession);
    }
    else cartTotalCount = 0;
  }
  sendProductTags(shopName, condition, res, email, cartTotalCount);
});

/////////////////////////////////////////////////
// ㅜ 신상품순의 버튼을 클릭했을 때의 상품 목록 화면
router.post("/new/:shopName", (req, res) => {
  //
  const _cartTotalCount = null;
  const email = req.session.email;
  const _shopName = req.params.shopName;
  const { skipCount, limitCount } = req.body;
  const condition = { order: [["id", "DESC"]], offset: Number(skipCount), limit: Number(limitCount) };
  //
  sendProductTags(_shopName, email, res, condition, _cartTotalCount);
});

///////////////////////////////////////////////////
// ㅜ 낮은 가격순의 버튼을 클릭했을 때의 상품 목록 화면
router.post("/lowPrice/:shopName", (req, res) => {
  //
  const _cartTotalCount = null;
  const email = req.session.email;
  const _shopName = req.params.shopName;
  const { skipCount, limitCount } = req.body;
  const condition = { order: [["price", "ASC"]], offset: Number(skipCount), limit: Number(limitCount) };
  //
  sendProductTags(_shopName, email, res, condition, _cartTotalCount);
});

///////////////////////////////////////////////////
// ㅜ 높은 가격순의 버튼을 클릭했을 때의 상품 목록 화면
router.post("/highPrice/:shopName", (req, res) => {
  //
  const _cartTotalCount = null;
  const email = req.session.email;
  const _shopName = req.params.shopName;
  const { skipCount, limitCount } = req.body;
  const condition = { order: [["price", "DESC"]], offset: Number(skipCount), limit: Number(limitCount) };
  //
  sendProductTags(_shopName, email, res, condition, _cartTotalCount);
});

//////////////////////////////////////////////////////W////////
// ㅜ 가격 범위를 입력하고 검색 버튼을 클릭했을 때의 상품 목록 화면
router.post("/sortPrice/:shopName/:min/:max", (req, res) => {
  //
  const min = req.params.min;
  const max = req.params.max;
  const _cartTotalCount = null;
  const email = req.session.email;
  const _shopName = req.params.shopName;
  const { skipCount, limitCount } = req.body;
  const condition = { where: { price: { [Op.gte]: min, [Op.lte]: max } }, offset: Number(skipCount), limit: Number(limitCount) };
  //
  sendProductTags(_shopName, email, res, condition, _cartTotalCount);
});
//
module.exports = router;
//
// 09.04.20 수정
