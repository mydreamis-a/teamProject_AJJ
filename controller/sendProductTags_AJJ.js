const { AJYproduct, JBHproduct, JJWproduct } = require("../model/index_AJJ");
const createProductTags = require("./createProductTags_AJJ");
const { log } = console;
/**
 * 각 상점에 해당하는 상품 목록을 찾는 함수
 * @param {string} shopName 상점 이름
 * @param {string} userEmail 상품의 좋아요 기능을 위한 회원의 이메일
 * @param {*} res
 * @param {object} condition 해당하는 상품 목록을 찾거나 정렬하기 위한 조건
 * @param {number} cartTotalCount 장바구니에 담긴 상품의 총 수량
 */
module.exports = function sendProductTags(shopName, userEmail, res, condition, cartTotalCount) {
  //
  switch (shopName) {
    case "ajy":
      AJYproduct.findAndCountAll(condition).then((products) => _sendProductTags(products));
      break;
    case "jbh":
      JBHproduct.findAndCountAll(condition).then((products) => _sendProductTags(products));
      break;
    case "jjw":
      JJWproduct.findAndCountAll(condition).then((products) => _sendProductTags(products));
      break;
    default:
      break;
  }
  /**
   * 결과 값의 상품 목록을 문자열의 HTML 태그로 담아서 보내는 함수
   * @param {array} products 찾은 상품 목록
   */
  const _sendProductTags = (products) => {
    const productTags = createProductTags(shopName, products.rows, userEmail);
    const resultCount = products.count;
    //
    res.send({ productTags, resultCount, cartTotalCount });
  };
};
//
// 09.02.10 수정
