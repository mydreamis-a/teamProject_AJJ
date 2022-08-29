const cartListCount = require("./cartListCount_AJJ");
const { Cart } = require("../model/index_AJJ");
const { Op } = require("sequelize");
const express = require("express");
const router = express.Router();
const { log } = console;

// ㅜ 로그인 여부 확인 및 로그인 정보 연동 필요
router.post("/:products", (req, res) => {
  //
  const shopName = req.params.products.slice(0, 3);
  const productNum = parseInt(req.params.products.replace(shopName, ""));
  //
  switch (shopName) {
    //
    case "ajy":
      Cart.findAll({ where: { ajyproduct_num: productNum } }).then((value) => {
        //
        if (!value[0]) {
          Cart.create({ ajyproduct_num: productNum })
            //
            .then(() => {
              cartListCount(res).then(count => res.send({ count }));
            })
            //
            .catch(() => {
              Cart.increment({ product_count: 1 }, { where: { ajyproduct_num: productNum } })
                .then(() => {
                  cartListCount(res).then(count => res.send({ count }));
                });
            });
        } else {
          Cart.increment({ product_count: 1 }, { where: { ajyproduct_num: productNum } })
            .then(() => {
              cartListCount(res).then(count => res.send({ count }));
            });
        };
      });
      break;
    case "jbh":
      Cart.findAll({ where: { jbhproduct_num: productNum } }).then((value) => {
        //
        if (!value[0]) {
          Cart.create({ jbhproduct_num: productNum })
            //
            .then(() => {
              cartListCount(res).then(count => res.send({ count }));
            })
            //
            .catch(() => {
              Cart.increment({ product_count: 1 }, { where: { jbhproduct_num: productNum } })
                .then(() => {
                  cartListCount(res).then(count => res.send({ count }));
                });
            });
        } else {
          Cart.increment({ product_count: 1 }, { where: { jbhproduct_num: productNum } })
            .then(() => {
              cartListCount(res).then(count => res.send({ count }));
            });
        };
      });
      break;
    case "jjw":
      Cart.findAll({ where: { jjwproduct_num: productNum } }).then((value) => {
        //
        if (!value[0]) {
          Cart.create({ jjwproduct_num: productNum })
            //
            .then(() => {
              cartListCount(res).then(count => res.send({ count }));
            })
            //
            .catch(() => {
              Cart.increment({ product_count: 1 }, { where: { jjwproduct_num: productNum } })
                .then(() => {
                  cartListCount(res).then(count => res.send({ count }));
                });
            });
        } else {
          Cart.increment({ product_count: 1 }, { where: { jjwproduct_num: productNum } })
            .then(() => {
              cartListCount(res).then(count => res.send({ count }));
            });
        };
      });
      break;
    default:
      break;
  }
});
module.exports = router;

// 08.29.11 수정
