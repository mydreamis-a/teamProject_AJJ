const { log } = console;
/**
 * 해당하는 상품 목록의 태그 생성을 위해 문자열의 HTML 태그로 담은 함수
 * @param {string} shopName 상점 이름
 * @param {array} products 각 상점별로 분류된 상품 목록
 * @param {string} userEmail 상품의 좋아요 기능을 위한 회원의 이메일
 * @returns 문자열의 HTML 태그
 */
module.exports = function createProductTags(shopName, products, userEmail) {
  const productTags = new Array();
  //
  const _products = products.map((el) => el.dataValues);
  _products.forEach((el, idx) => {
    //
    productTags.push(`
        <div class="product-list-col">
          <div class="product-container">
            <div class="product-img" style="background-image: url('${el.img}');">
              <div class="product-img-dark">
                <p class="product-img-text">사진 크게 보기</p>
              </div>
            </div>
            <div class="product-box">
              <p class="product-name">${el.name}</p>
              <p class="product-price">${el.price} 원</p>
              <img class="like-product-btn${idx + 1}" src="/img_Ahn_Ju/heart.gif" alt="" onclick="likeInsert('${el.name}','${idx + 1}','${userEmail}')">
              <span style="font-size: 2vw; font-weight: 900;">${el.like_count}</span>
              <div class="product-btn-container">
                <div class="product-btn-group">
                <input class="in-cart-btn${idx + 1}" data-name="${shopName}" type="button" value="장바구니에 담기" onclick="_cart.inCartProducts()">
                <input class="show-product-btn${idx + 1}" type="button" value="상품 보기">
              </div>
              </div>
            </div>
          </div>
        </div>
      `);
  });
  return productTags;
};
//
// 09.03.23 수정
