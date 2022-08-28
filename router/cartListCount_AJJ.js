const { Op } = require("sequelize");
const { Cart } = require("../model/index_AJJ");
/**
 * 장바구니 DB에서 장바구니에 담은 총 수량을 반환하는 함수
 * @param {*} res 
 */
module.exports = async function cartListCount(res) {
    //
    let count = 0;
    // ㅜ 비회원일 경우
    await Cart.sum("product_count", { where: { user_id: { [Op.is]: null } } })
        //
        .then(value => {
            if (value !== null) count = value;
        });
    return count;
};

// 08.29.02 수정