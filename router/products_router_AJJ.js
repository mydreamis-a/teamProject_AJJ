const { AJYproduct, JBHproduct, JJWproduct } = require("../model/index_AJJ");
const createProductTags = require("../controller/createProductTags_AJJ");
const cartTotalCount = require("../controller/cartTotalCount_AJJ");
const express = require("express");
const router = express.Router();
const { log } = console;

////////////////////////////////////////////////
// ㅜ 각 상점의 버튼을 클릭했을 때의 상품 목록 화면
router.post("/:shopName", (req, res) => {
  //
  const _shopName = req.params.shopName;
  console.log(_shopName);
  switch (_shopName) {
    case "ajy":
      AJYproduct.findAll({}).then(async (products) => {
        //
        const _cartTotalCount = await cartTotalCount(res);
        const productTags = createProductTags(_shopName, products);
        res.send({ _shopName, productTags, _cartTotalCount });
      });
      break;
    case "jbh":
      JBHproduct.findAll({}).then(async (products) => {
        //
        const _cartTotalCount = await cartTotalCount(res);
        const productTags = createProductTags(_shopName, products);
        res.send({ _shopName, productTags, _cartTotalCount });
      });
      break;
    case "jjw":
      JJWproduct.findAll({}).then(async (products) => {
        //
        const _cartTotalCount = await cartTotalCount(res);
        const productTags = createProductTags(_shopName, products);
        res.send({ _shopName, productTags, _cartTotalCount });
      });
      break;
    default:
      break;
  }
});

/////////////////////////////////////////////////
// ㅜ 신상품순의 버튼을 클릭했을 때의 상품 목록 화면
router.post("/new/:shopName", (req, res) => {
  //


  ()
  const _shopName = req.params.shopName;
  switch (_shopName) {
    case "ajy":
      AJYproduct.findAll({ order: [["id", "DESC"]] }).then((products) => {
        //
        const _cartTotalCount = null;
        const productTags = createProductTags(_shopName, products);
        res.send({ _shopName, productTags, _cartTotalCount });
      });
      break;
    case "jbh":
      JBHproduct.findAll({ order: [["id", "DESC"]] }).then((products) => {
        //
        const _cartTotalCount = null;
        const productTags = createProductTags(_shopName, products);
        res.send({ _shopName, productTags, _cartTotalCount });
      });
      break;
    case "jjw":
      JJWproduct.findAll({ order: [["id", "DESC"]] }).then((products) => {
        //
        const _cartTotalCount = null;
        const productTags = createProductTags(_shopName, products);
        res.send({ _shopName, productTags, _cartTotalCount });
      });
      break;
    default:
      break;
  }
});


///////////////////////////////////////////////////
// ㅜ 높은 가격순의 버튼을 클릭했을 때의 상품 목록 화면
router.post("/highPrice/:shopName", (req, res) => {
  //
  const _shopName = req.params.shopName;
  switch (_shopName) {
    case "ajy":
      AJYproduct.findAll({ order: [["price", "DESC"]] }).then((products) => {
        //
        const _cartTotalCount = null;
        const productTags = createProductTags(_shopName, products);
        res.send({ _shopName, productTags, _cartTotalCount });
      });
      break;
    case "jbh":
      JBHproduct.findAll({ order: [["price", "DESC"]] }).then((products) => {
        //
        const _cartTotalCount = null;
        const productTags = createProductTags(_shopName, products);
        res.send({ _shopName, productTags, _cartTotalCount });
      });
      break;
    case "jjw":
      JJWproduct.findAll({ order: [["price", "DESC"]] }).then((products) => {
        //
        const _cartTotalCount = null;
        const productTags = createProductTags(_shopName, products);
        res.send({ _shopName, productTags, _cartTotalCount });
      });
      break;
    default:
      break;
  }
});

module.exports = router;

// 08.31.16 수정
