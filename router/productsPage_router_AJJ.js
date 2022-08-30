const { AJYproduct, JBHproduct, JJWproduct,Like,User } = require("../model/index_AJJ");
const express = require("express");
const router = express.Router();
const { log } = console;
const session = require("express-session");
const FileStore = require("session-file-store")(session);
router.post("/Ahn-shop", (req, res) => {
  AJYproduct.findAll({}).then((AJYproducts) => {
    //
    const shopName = "AJY";
    const productsTag = createProducts(shopName, AJYproducts);
    res.send({ shopName, productsTag });
  });
});

router.post("/Ju-shop", (req, res) => {
  //
  JBHproduct.findAll({}).then((JBHproducts) => {
    //
    const shopName = "JBH";
    const productsTag = createProducts(shopName, JBHproducts);
    res.send({ shopName, productsTag });
  });
});

router.post("/Jang-shop", (req, res) => {
  //
  JJWproduct.findAll({}).then((JJWproducts) => {
    //
    const shopName = "JJW";
    const productsTag = createProducts(shopName, JJWproducts);
    res.send({ shopName, productsTag });
  });
});

/**
 * 상품 목록의 태그 생성을 위해 HTML 태그를 문자열로 담은 함수
 * @param {array} products 각 상점의 상품 DB
 * @returns 필요한 HTML 태그
 */
function createProducts(shopName, products) {

  
  const productsTag = new Array();
  const _products = products.map((el) => el.dataValues);
  _products.forEach((el, idx) => {
    //
    productsTag.push(`
    <div class="product-list-col">
    <div class="product-container">
      <div class="product-img" style="background-image: url('${el.img}');">
        <div class="product-img-dark">
          <p class="product-img-text">사진 크게 보기</p>
        </div>
      </div>
      <div class="product-box">
        <p class="product-name">${el.name}</p>
        <p class="product-price">${el.price} 원</p>
        <div class="product-btn-container">
          <div class="product-btn-group">
            <input class="in-cart-btn${idx+1}" data-shopName=${shopName} type="button" value="장바구니에 담기" onclick="incart('${shopName}', ${idx+1})">
            <input class="show-product-btn${idx+1}" type="button" value="상품 보기">
          </div>
        </div>
        <button><a href="/like${idx+1}${shopName}">좋아요</a></button>
      </div>
    </div>
  </div>
    `);
  });
  return productsTag;
}

module.exports = router;

// 08.26.13 수정
