const sendProductTags = require("../controller/sendProductTags_AJJ");
const cartTotalCount = require("../controller/cartTotalCount_AJJ");
//
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
//
module.exports = router;
//
// 09.01.13 수정
