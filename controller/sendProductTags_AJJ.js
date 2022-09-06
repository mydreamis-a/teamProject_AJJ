const { AJYproduct, JBHproduct, JJWproduct } = require("../model/index_AJJ");
const { log } = console;

/////////////////////////////////////////////////
/**
 * 각 상점에 해당하는 상품 목록을 찾아서 보내는 함수
 * @param {string} shopName 상점 이름
 * @param {object} condition 해당하는 상품 목록을 찾거나 정렬하기 위한 조건
 * @param {*} res
 * @param {string} email 상품의 좋아요 기능을 위한 회원의 이메일
 * @param {number} cartTotalCount 장바구니에 담긴 모든 상품의 수량
 */
// ㅜ 역할:
// 각 상점의 상품 목록 테이블에서
// 상점의 이름과 조건을 통해
// 해당하는 상품 목록을 찾은 후
// ajax에 전송
module.exports = function sendProductTags(shopName, condition, res, email, cartTotalCount) {
  //
  let productsClass = null;
  switch (shopName) {
    case "ajy":
      productsClass = AJYproduct;
      break;
    case "jbh":
      productsClass = JBHproduct;
      break;
    case "jjw":
      productsClass = JJWproduct;
      break;
  }
  //
  productsClass.findAndCountAll(condition).then((obj) => {
    const products = obj.rows.map((modelName) => modelName.dataValues);
    const resultCount = obj.count;
    //
    res.send({ products, resultCount, cartTotalCount, email });
  });
};
//
// 09.07.00 수정
