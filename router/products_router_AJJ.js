const { AJYproduct, JBHproduct, JJWproduct } = require("../model/index_AJJ");
const cartListCount = require("../controller/cartTotalCount_AJJ");
const express = require("express");
const session = require("express-session");
const router = express.Router();
const { log } = console;

router.use(
  session({
    secret: process.env.JU_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

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

/**
 * 상품 목록의 태그 생성을 위해 HTML 태그를 문자열로 담은 함수
 * @param {array} products 각 상점의 상품 DB
 * @returns 필요한 HTML 태그
 */
function createProducts(shopName, products,userEmail) {
  const productTags = new Array();
  //
  const _products = products.map((el) => el.dataValues);
  _products.forEach((el, idx) => {
    //
    productTags.push(`
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
                <input class="in-cart-btn${idx + 1}" data-name="${shopName}" type="button" value="장바구니에 담기" onclick="incart('${shopName}', '${idx + 1}')">
                <input class="show-product-btn${idx + 1}" type="button" value="상품 보기">
                <input class="like-product-btn${idx + 1}" type="button" value="좋아요" onclick="likeInsert('${el.name}','${idx + 1}','${userEmail}')">
                <h2>${el.like_count}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  });

  return productTags;
}

module.exports = router;

// 08.29.20 수정
