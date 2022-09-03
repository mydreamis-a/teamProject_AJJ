const { log } = console;
const { Op } = require("sequelize");
const { Cart } = require("../model/index_AJJ");
/**
 * 해당하는 회원의 장바구니 테이블에 담긴 모든 상품의 수량을 반환하는 함수
 * @param {string} id 어느 회원인지를 특정하는 id 컬럼의 값
 * @returns 장바구니에 담긴 모든 상품의 수량
 */
module.exports = function cartTotalCount(id) {
  return (
    Cart.sum("product_count", { where: { user_id: id } })
      //
      .then((_Cart) => {
        if (_Cart !== null) return _Cart;
        else return 0;
      })
  );
};
//
// 09.03.14 수정
