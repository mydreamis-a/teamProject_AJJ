const { log } = console;
const { Op } = require("sequelize");
const { Cart } = require("../model/index_AJJ");
/**
 * 장바구니 DB에서 장바구니에 담은 총 수량을 반환하는 함수
 */
module.exports = function cartTotalCount() {
  return (
    Cart.sum("product_count", { where: { user_id: { [Op.is]: null } } })
      //
      .then((value) => {
        if (value !== null) return value;
        else return 0;
      })
  );
};
//
// 09.01.17 수정
