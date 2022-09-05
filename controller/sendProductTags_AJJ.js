const { AJYproduct, JBHproduct, JJWproduct } = require("../model/index_AJJ");
const createProductTags = require("./createProductTags_AJJ");
const { log } = console;
/**
 * 각 상점에 해당하는 상품 목록을 찾아서 문자열의 HTML 태그로 보내는 함수
 * @param {string} shopName 상점 이름
 * @param {object} condition 해당하는 상품 목록을 찾거나 정렬하기 위한 조건
 * @param {*} res
 * @param {string} email 상품의 좋아요 기능을 위한 회원의 이메일
 * @param {number} cartTotalCount 장바구니에 담긴 모든 상품의 수량
 */
module.exports = function sendProductTags (shopName, condition, res, email, cartTotalCount) {
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
    default:
      break;
  };
  //
  productsClass.findAndCountAll(condition).then((obj) => {
    //
    const products = obj.rows.map(modelName => modelName.dataValues);
    const productTags = createProductTags(shopName, products, email);
    const resultCount = obj.count;
    //
    res.send({ productTags, resultCount, cartTotalCount });
  });
};
//
// 09.04.18 수정
