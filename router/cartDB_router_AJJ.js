const { Cart } = require("../model/index_AJJ");
const express = require("express");
const router = express.Router();
const { log } = console;

// ㅜ 로그인 여부 확인 및 로그인 정보 연동 필요
router.post("/:products", (req, res) => {
  //
  const shopName = req.params.products.slice(0, 3);
  const productNum = req.params.products.replace(shopName, "");
  //
  switch (shopName) {
    //
    case "AJY":
      Cart.findAll({
        where: { ajyproduct_num: productNum }
        //
      }).then(value => {
        //
        if (!value[0]) {
          Cart.create({ ajyproduct_num: productNum }).then(() => {
            // log("새 컬럼 추가");
            cartListCount(res);
          })
            .catch(() => {
              //
              Cart.increment({ product_count: 1 }, { where: { ajyproduct_num: productNum } })
                .then(() => {
                  //
                  // log("catch => 기존 컬럼에 수량 증가");
                  cartListCount(res);
                })
            });
        }
        else {
          Cart.increment({ product_count: 1 }, { where: { ajyproduct_num: productNum } })
            .then(() => {
              //
              // log("기존 컬럼에 수량 증가");
              cartListCount(res);
            });
        };
      });
      break;
    default:
      break;
  }
});

function cartListCount(res) {
  //
  // ㅜ 로그인 여부 확인 및 로그인 정보 연동 필요
  Cart.sum("product_count", { where: { user_id: null } })
    .then(count => {
      // log(count);
      res.send({ count });
    });
};

module.exports = router;

// 08.28.04 수정