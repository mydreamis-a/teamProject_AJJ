////////////////////////////////////////////////////////////////////
/**
 * 해당하는 상품 목록의 태그 생성을 위해 문자열의 HTML 태그를 담은 함수
 * @param {string} shopName 상점 이름
 * @param {array} products 상품 목록 정보
 * @param {string} email 상품의 좋아요 기능을 위한 회원의 이메일
 * @returns {string} 문자열의 HTML 태그
 */
// ㅜ 역할:
// 상품 정보에 담긴 인덱스 id, 이름, 가격, 이미지 경로, 좋아요 개수와
// 좋아요 기능을 위한 버튼 클릭 이벤트와
// 장바구니 담기 기능을 위한 버튼 클릭 이벤트를 담은
// 문자열의 HTML 태그를 반환
const createProductTags = (shopName, products, email) => {
  const productTags = new Array();
  //
  products.forEach((el) => {
    productTags.push(`
        <div class ="product-list-col">
          <div class ="product-container">
            <div class ="product-img" style="background-image: url('${el.img}');">
              <div class ="product-img-dark">
                <p class ="product-img-text">사진 크게 보기</p>
              </div>
            </div>
            <div class ="product-box">
              <p class ="product-name">${el.name}</p>
              <p class ="product-price">${el.price} 원</p>
              <img class ="like-product-btn${el.id}" src="/img_Ahn_Ju/heart.gif" alt="" onclick="likeInsert('${el.name}','${el.id}','${email}')">
              <span style="font-size: 2vw; font-weight: 900;">${el.like_count}</span>
              <div class ="product-btn-container">
                <div class ="product-btn-group">
                <input class ="in-cart-btn${el.id}" data-name="${shopName}" type="button" value="장바구니에 담기" onclick="_cart.inCartAjax()">
                <input class ="show-product-btn${el.id}" type="button" value="상품 보기">
              </div>
              </div>
            </div>
          </div>
        </div>
      `);
  });
  return productTags;
};

/////////////////////////////////////////////////////////////////////////
/**
 * 장바구니에 담긴 상품 목록의 태그 생성을 위해 문자열의 HTML 태그를 담은 함수
 * @param {object} cartProducts 장바구니에 담긴 상품 목록 정보
 * { [{ product_count: number, JJWproduct: { id: number, name: string, price: number, img: string } }] }
 * @returns {string} 문자열의 HTML 태그
 */
const createCartProductTags = (cartProducts) => {
  const cartProductTags = new Array();
  //
  cartProducts.forEach((el) => {
    //
    let id = 0;
    let price = 0;
    let img = null;
    let name = null;
    let shopName = null;
    const productCount = el.product_count;
    for (const key in el) {
      if (Object.hasOwnProperty.call(el, key)) {
        //
        if (key !== "product_count") {
          //
          const productData = el[key];
          //
          id = productData.id;
          img = productData.img;
          name = productData.name;
          price = productData.price;
          shopName = key.replace("product", "").toLowerCase();
        }
      }
    }
    for (let i = 0; i < productCount; i++) {
      cartProductTags.push(`
          <div class ="product-list-col">
            <div class ="product-container">
              <div class ="product-img" style="background-image: url('${img}');">
                <div class ="product-img-dark">
                  <p class ="product-img-text">사진 크게 보기</p>
                </div>
              </div>
              <div class ="product-box">
                <p class ="product-name">${name}</p>
                <p class ="product-price">${price} 원</p>
                <div class ="product-btn-container">
                  <div class ="product-btn-group">
                  <input class ="cart-delete-btn${id}" data-name="${shopName}" type="button" value="삭제하기" onclick="_cart.deleteCartProducts()">
                  <input class ="show-product-btn${id}" type="button" value="상품 보기">
                </div>
                </div>
              </div>
            </div>
          </div>
        `);
    }
  });
  return cartProductTags.reverse();
};
//
// 09.07.01 수정
