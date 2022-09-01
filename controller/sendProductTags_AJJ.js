const { AJYproduct, JBHproduct, JJWproduct } = require("../model/index_AJJ");
const createProductTags = require("./createProductTags_AJJ");
const { log } = console;
//
module.exports = function sendProductTags(shopName, userEmail, res, condition, cartTotalCount) {
  //
  switch (shopName) {
    case "ajy":
      AJYproduct.findAll(condition).then((products) => {
        //
        const productTags = createProductTags(shopName, products, userEmail);
        res.send({ shopName, productTags, cartTotalCount });
      });
      break;
    case "jbh":
      JBHproduct.findAll(condition).then((products) => {
        //
        const productTags = createProductTags(shopName, products, userEmail);
        res.send({ shopName, productTags, cartTotalCount });
      });
      break;
    case "jjw":
      JJWproduct.findAll(condition).then((products) => {
        //
        const productTags = createProductTags(shopName, products, userEmail);
        res.send({ shopName, productTags, cartTotalCount });
      });
      break;
    default:
      break;
  }
};
//
// 09.01.17 수정
