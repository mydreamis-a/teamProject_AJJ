const { log } = console;
const { Cart } = require("../model/index_AJJ");

//////////////////////////////////////////////////////////////
/**
 * 해당하는 회원의 장바구니에 담긴 모든 상품의 수량을 반환하는 함수
 * @param {string} id 어느 회원인지를 특정하는 id 컬럼의 값
 * @param {object} cartSession 세션에 담긴 비회원의 장바구니 정보
 * @returns {number} 장바구니에 담긴 모든 상품의 수량
 */
// 1. 로그인한 회원일 경우
//    매개 변수인 id 컬럼의 값을 이용해
//    해당 회원의 장바구니 테이블에 담긴 모든 상품의 수량을 더한 후 return
// 2. 비회원일 경우
//    장바구니 세션에 담긴 모든 상품의 수량을 더한 후 return
module.exports = function cartTotalCount(id, cartSession) {
  //
  // ㅜ 로그인한 회원일 경우
  if (id !== null) {
    return Cart.sum("product_count", { where: { user_id: id } }).then((obj) => {
      // log("1");
      if (obj !== null) {
        return obj;
      }
      //
      else {
        return 0;
      }
    });
  }
  // ㅜ 비회원일 경우
  else {
    return cartSession.reduce((prev, curr) => {
      return prev + curr.product_count;
    }, 0);
  }
};
//
// 09.07.00 수정
