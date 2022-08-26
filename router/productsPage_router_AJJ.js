const { AJYproduct, JBHproduct, JJWproduct } = require("../model/index_AJJ");
const express = require("express");
const router = express.Router();
const { log } = console;

router.post("/Ahn-shop", (req, res) => {
  AJYproduct.findAll({}).then((AJYproducts) => {
    //
    const productsTag = createProducts(AJYproducts);
    res.send({ name: "AJY", productsTag });
  });
});

router.post("/Ju-shop", (req, res) => {
  //
  JBHproduct.findAll({}).then((JBHproducts) => {
    //
    const productsTag = createProducts(JBHproducts);
    res.send({ name: "JBH", productsTag });
  });
});

router.post("/Jang-shop", (req, res) => {
  //
  JJWproduct.findAll({}).then((JJWproducts) => {
    //
    const productsTag = createProducts(JJWproducts);
    res.send({ name: "JJW", productsTag });
  });
});

/**
 * 상품 목록의 태그 생성을 위해 HTML 태그를 문자열로 담은 함수
 * @param {array} products 각 상점의 상품 DB
 * @returns 필요한 HTML 태그
 */
function createProducts(products) {
  const productsTag = new Array();
  //
  const _products = products.map((el) => el.dataValues);
  _products.forEach((el) => {
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
            <input class="in-cart-btn0" type="button" value="장바구니에 담기">
            <input class="show-product-btn0" type="button" value="상품 보기">
          </div>
        </div>
      </div>
    </div>
  </div>
    `);
  });
  return productsTag;
}

module.exports = router;

// 08.26.10 수정
