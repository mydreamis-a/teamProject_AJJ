const { AJYproduct, JBHproduct, JJWproduct } = require("../model/index_AJJ");
const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const { log } = console;

router.post("/Ahn-shop", (req, res) => {
  AJYproduct.findAll({})
    .then((AJYproducts) => {
      const JBHproducts = new Array();
      const JJWproducts = new Array();

      res.send(
        ejs.render("main_AJJ", {
          AJYproducts: AJYproducts.dataValues,
          JBHproducts: JBHproducts.dataValues,
          JJWproducts: JJWproducts.dataValues,
        })
      );
      //res.render("main_AJJ", { AJYproducts, JBHproducts, JJWproducts });
    })
    .catch((e) => {
      console.log(e);
    });
});

router.post("/Ju-shop", (req, res) => {
  //
  JBHproduct.findAll({}).then((JBHproducts) => {
    //
    const createProducts = new Array();
    //
    const _JBHproducts = JBHproducts.map((i) => i.dataValues);
    _JBHproducts.forEach((el) => {
      //
      createProducts.push(`
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
    res.send({ name: "JBH", createProducts });
  });
});
router.post("/Jang-shop", (req, res) => {
  //
  JJWproduct.findAll({}).then((JJWproducts) => {
    //
    const AJYproducts = new Array();
    const JBHproducts = new Array();
    //
    res.render("main_AJJ", { AJYproducts, JBHproducts, JJWproducts });
  });
});

module.exports = router;

// 08.25.11 수정
