const { Cart } = require("../model/index_AJJ");
const { Op } = require("sequelize");
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
    case "ajy":
      Cart.findAll({ where: { ajyproduct_num: productNum } }).then(value => {
        //
        if (!value[0]) {
          Cart.create({ ajyproduct_num: productNum }).then(() => cartListCount(res))
            .catch(() => {
              //
              Cart.increment({ product_count: 1 }, { where: { ajyproduct_num: productNum } })
                .then(() => cartListCount(res))
            });
        }
        else {
          Cart.increment({ product_count: 1 }, { where: { ajyproduct_num: productNum } })
            .then(() => cartListCount(res));
        };
      });
      break;
    //
    case "jbh":
      Cart.findAll({ where: { jbhproduct_num: productNum } }).then(value => {
        //
        if (!value[0]) {
          Cart.create({ jbhproduct_num: productNum }).then(() => cartListCount(res))
            .catch(() => {
              //
              Cart.increment({ product_count: 1 }, { where: { jbhproduct_num: productNum } })
                .then(() => cartListCount(res))
            });
        }
        else {
          Cart.increment({ product_count: 1 }, { where: { jbhproduct_num: productNum } })
            .then(() => cartListCount(res));
        };
      });
      break;
    //
    case "jjw":
      Cart.findAll({ where: { jjwproduct_num: productNum } }).then(value => {
        //
        if (!value[0]) {
          Cart.create({ jjwproduct_num: productNum }).then(() => cartListCount(res))
            .catch(() => {
              //
              Cart.increment({ product_count: 1 }, { where: { jjwproduct_num: productNum } })
                .then(() => cartListCount(res))
            });
        }
        else {
          Cart.increment({ product_count: 1 }, { where: { jjwproduct_num: productNum } })
            .then(() => cartListCount(res));
        };
      });
      break;
    //
    default:
      break;
  }
});

/**
 * 장바구니 DB에서 장바구니에 담은 총 수량을 보내는 함수
 * @param {*} res 
 */
function cartListCount(res) {
  //
  // ㅜ 비회원일 경우
  Cart.sum("product_count", { where: { user_id: { [Op.is]: null } } })
    .then(count => {
      // log(count);
      res.send({ count });
    });
};

module.exports = router;

// 08.28.08 수정