const { Cart } = require("../model/index_AJJ");
const { Op } = require("sequelize");
const express = require("express");
const router = express.Router();
const { log } = console;

router.post("/", async (req, res) => {
    const cartProducts = {};
    
    // ㅜ 비회원의 장바구니 DB 연동
    await Cart.findAll({ where: { user_id: { [Op.is]: null }, ajyproduct_num: { [Op.not]: null } } })
        .then(ajyproducts => {
            cartProducts.ajyproducts = ajyproducts.map(value => value.dataValues);
        });
    await Cart.findAll({ where: { user_id: { [Op.is]: null }, jbhproduct_num: { [Op.not]: null } } })
        .then(jbhproducts => {
            cartProducts.jbhproducts = jbhproducts.map(value => value.dataValues);
        });
    await Cart.findAll({ where: { user_id: { [Op.is]: null }, jjwproduct_num: { [Op.not]: null } } })
        .then(jjwproducts => {
            cartProducts.jjwproducts = jjwproducts.map(value => value.dataValues);
        });
    res.send(cartProducts);
});

module.exports = router;


