const sendProductTags = require("../controller/sendProductTags_AJJ");
const cartTotalCount = require("../controller/cartTotalCount_AJJ");
//
const { Op } = require("sequelize");
const express = require("express");
const router = express.Router();
const { log } = console;


router.post("/Ahn-shop", (req, res) => {
  AJYproduct.findAll({}).then(async (AJYproducts) => {
    const shopName = "ajy";
    const count = await cartListCount(res);
    const userEmail = req.session.email;
    const productTags = createProducts(shopName, AJYproducts,userEmail);
    res.send({ shopName, count, productTags });
  });
});

router.post("/Ju-shop", (req, res) => {
  JBHproduct.findAll({}).then(async (JBHproducts) => {
    const shopName = "jbh";
    const count = await cartListCount(res);
    const userEmail = req.session.email;
    const productTags = createProducts(shopName, JBHproducts,userEmail);
    res.send({ shopName, count, productTags });
  });
});

router.post("/Jang-shop", (req, res) => {
  JJWproduct.findAll({}).then(async (JJWproducts) => {
    const shopName = "jjw";
    const count = await cartListCount(res);
    const userEmail = req.session.email;
    const productTags = createProducts(shopName, JJWproducts,userEmail);
    res.send({ shopName, count, productTags });
  });
});

////////////////////////////////////////////////
// ㅜ 각 상점의 버튼을 클릭했을 때의 상품 목록 화면
router.post("/:shopName", async (req, res) => {
  //
  const userEmail = req.session.email;
  const _shopName = req.params.shopName;
  const { skipCount, limitCount } = req.body;
  const _cartTotalCount = await cartTotalCount(res);
  const condition = { offset: Number(skipCount), limit: Number(limitCount) };
  //
  sendProductTags(_shopName, userEmail, res, condition, _cartTotalCount);
});

/////////////////////////////////////////////////
// ㅜ 신상품순의 버튼을 클릭했을 때의 상품 목록 화면
router.post("/new/:shopName", (req, res) => {
  //
  const _cartTotalCount = null;
  const userEmail = req.session.email;
  const _shopName = req.params.shopName;
  const { skipCount, limitCount } = req.body;
  const condition = { order: [["id", "DESC"]], offset: Number(skipCount), limit: Number(limitCount) };
  //
  sendProductTags(_shopName, userEmail, res, condition, _cartTotalCount);
});

///////////////////////////////////////////////////
// ㅜ 낮은 가격순의 버튼을 클릭했을 때의 상품 목록 화면
router.post("/lowPrice/:shopName", (req, res) => {
  //
  const _cartTotalCount = null;
  const userEmail = req.session.email;
  const _shopName = req.params.shopName;
  const { skipCount, limitCount } = req.body;
  const condition = { order: [["price", "ASC"]], offset: Number(skipCount), limit: Number(limitCount) };
  //
  sendProductTags(_shopName, userEmail, res, condition, _cartTotalCount);
});

///////////////////////////////////////////////////
// ㅜ 높은 가격순의 버튼을 클릭했을 때의 상품 목록 화면
router.post("/highPrice/:shopName", (req, res) => {
  //
  const _cartTotalCount = null;
  const userEmail = req.session.email;
  const _shopName = req.params.shopName;
  const { skipCount, limitCount } = req.body;
  const condition = { order: [["price", "DESC"]], offset: Number(skipCount), limit: Number(limitCount) };
  //
  sendProductTags(_shopName, userEmail, res, condition, _cartTotalCount);
});

//////////////////////////////////////////////////////////////
// ㅜ 가격 범위를 입력하고 검색 버튼을 클릭했을 때의 상품 목록 화면
router.post("/sortPrice/:shopName/:min/:max", (req, res) => {
  //
  const min = req.params.min;
  const max = req.params.max;
  const _cartTotalCount = null;
  const userEmail = req.session.email;
  const _shopName = req.params.shopName;
  const { skipCount, limitCount } = req.body;
  const condition = { where: { price: { [Op.gte]: min, [Op.lte]: max } }, offset: Number(skipCount), limit: Number(limitCount) };
  //
  sendProductTags(_shopName, userEmail, res, condition, _cartTotalCount);
});
//
module.exports = router;
//
// 09.02.09 수정
