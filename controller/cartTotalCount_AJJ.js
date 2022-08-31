const { Op } = require("sequelize");
const { Cart } = require("../model/index_AJJ");
/**
 * 장바구니 DB에서 장바구니에 담은 총 수량을 반환하는 함수
 * @param {*} res
 */
module.exports = function cartTotalCount(res) {
  // ㅜ 비회원일 경우
  return (
    Cart.sum("product_count", { where: { user_id: { [Op.is]: null } } })
      //
      .then((value) => {
        if (value !== null) return value;
        else return 0;
      })
  );
};

// 08.31.15 수정
