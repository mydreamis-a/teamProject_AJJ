const sendProductTags = require("../controller/sendProductTags_AJJ");
const cartTotalCount = require("../controller/cartTotalCount_AJJ");
//
const { Op } = require("sequelize");
const express = require("express");
const router = express.Router();
const { log } = console;

////////////////////////////////////////////////
// ㅜ 각 상점의 버튼을 클릭했을 때의 상품 목록 화면
router.post("/:shopName", async (req, res) => {
  //
  const order = {};
  const userEmail = req.session.email;
  const _shopName = req.params.shopName;
  const _cartTotalCount = await cartTotalCount(res);
  sendProductTags(_shopName, userEmail, res, order, _cartTotalCount);
});

/////////////////////////////////////////////////
// ㅜ 신상품순의 버튼을 클릭했을 때의 상품 목록 화면
router.post("/new/:shopName", (req, res) => {
  //
  const _cartTotalCount = null;
  const userEmail = req.session.email;
  const _shopName = req.params.shopName;
  const order = { order: [["id", "DESC"]] };
  sendProductTags(_shopName, userEmail, res, order, _cartTotalCount);
});

///////////////////////////////////////////////////
// ㅜ 낮은 가격순의 버튼을 클릭했을 때의 상품 목록 화면
router.post("/lowPrice/:shopName", (req, res) => {
  //
  const _cartTotalCount = null;
  const userEmail = req.session.email;
  const _shopName = req.params.shopName;
  const order = { order: [["price", "ASC"]] };
  sendProductTags(_shopName, userEmail, res, order, _cartTotalCount);
});

///////////////////////////////////////////////////
// ㅜ 높은 가격순의 버튼을 클릭했을 때의 상품 목록 화면
router.post("/highPrice/:shopName", (req, res) => {
  //
  const _cartTotalCount = null;
  const userEmail = req.session.email;
  const _shopName = req.params.shopName;
  const order = { order: [["price", "DESC"]] };
  sendProductTags(_shopName, userEmail, res, order, _cartTotalCount);
});

//////////////////////////////////////////////////////////////
// ㅜ 가격 범위를 입력하고 검색 버튼을 클릭했을 때의 상품 목록 화면
router.post("/sortPrice/:min/:max/:shopName", (req, res) => {
  //
  const min = req.params.min;
  const max = req.params.max;
  const _cartTotalCount = null;
  const userEmail = req.session.email;
  const _shopName = req.params.shopName;
  const where = { where: { price: { [Op.gte]: min, [Op.lte]: max } } };
  sendProductTags(_shopName, userEmail, res, where, _cartTotalCount);
});
//
module.exports = router;
//
// 09.01.13 수정
