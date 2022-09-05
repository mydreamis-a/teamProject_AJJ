// ### 개발 일기
//
// 1. 페이지 로드와 동시에 상품 목록 태그를 생성했다.
// why 로그인 회원이 로그인 하자마자 장바구니 버튼을 클릭할 경우 장바구니에 담긴 상품 목록의 태그를 장바구니 DB에서 불러와서 장바구니 화면에 생성해줘야 하는데, 장바구니의 상품 목록의 태그를 생성하는 방식이 기존 상품 목록의 태그를 복사하는 방식이기 때문에 기존에 해당하는 상품 목록의 태그가 생성되어 있어야 한다.
// ㅁ

const shopNameArr = ["ajy", "jbh", "jjw"];
const JuShopBtnTag = document.querySelector(".Ju-shop-btn");
const AhnShopBtnTag = document.querySelector(".Ahn-shop-btn");
const JangShopBtnTag = document.querySelector(".Jang-shop-btn");
const shopBtnTags = [AhnShopBtnTag, JuShopBtnTag, JangShopBtnTag];
//
// ㅜ 각 상점의 상품 목록 태그 생성
shopNameArr.forEach((el) => {
  const method = null;
  const skipCount = 0;
  const limitCount = 20;
  const priceScope = null;
  createProductTagsAjax(method, el, priceScope, skipCount, limitCount);
});

// ㅜ 각 상점의 버튼을 클릭했을 때
shopBtnTags.forEach((el, idx) => {
  el.addEventListener("click", async () => {
    //
    let method = null;
    const skipCount = 0;
    let priceScope = null;
    const limitCount = 20; // 이 변수들 사용하나?
    const cartTotalCountNumberTag = document.querySelector(".cart-total-count-number");
    //
    // ㅜ 각 상점의 상품 목록 태그 생성
    createProductTagsAjax(method, shopNameArr[idx], priceScope, skipCount, limitCount)
      //
      // ㅜ 장바구니에 담긴 모든 상품의 수량
      .then(({ productTags, resultCount, cartTotalCount }) => (cartTotalCountNumberTag.innerHTML = cartTotalCount));
    //
    // ㅜ 장바구니 아이콘에 대한 함수
    _cart.clickCartIcon();
    //
    // ㅜ 검색 창 태그 생성 및 검색어 기능에 대하여
    _search.createSearchTags();
    _search.saveKeyword();
    _search.showKeyword();
    //
    // ㅜ 신상품순의 버튼을 클릭했을 때
    const productSortNewBtnTag = document.querySelector("#product-sort-new");
    productSortNewBtnTag.addEventListener("click", () => {
      //
      _search.sortProducts("new", null);
    });
    //
    // ㅜ 낮은 가격순의 버튼을 클릭했을 때
    const productSortLowPriceBtnTag = document.querySelector("#product-sort-low-price");
    productSortLowPriceBtnTag.addEventListener("click", () => {
      //
      _search.sortProducts("lowPrice", null);
    });
    //
    // ㅜ 높은 가격순의 버튼을 클릭했을 때
    const productSortHighPriceBtnTag = document.querySelector("#product-sort-high-price");
    productSortHighPriceBtnTag.addEventListener("click", () => {
      //
      _search.sortProducts("highPrice", null);
    });
    //
    // ㅜ 가격 범위를 입력하고 검색 버튼을 클릭했을 때
    const productSearchPriceBtnTag = document.querySelector("#product-search-price-btn");
    productSearchPriceBtnTag.addEventListener("click", () => {
      //
      _search.searchPriceProducts();
    });
    //
    // ㅜ 더보기 버튼을 클릭했을 때
    if (document.querySelector(`[class ^= "product-show-more-btn"]`)) {
      //
      productShowMoreBtnEvent();
    }
  });
});

/////////////////////////////////////
/**
 * 더보기 버튼의 클릭 이벤트에 대한 함수
 */
const productShowMoreBtnEvent = function () {
  //
  const productShowMoreBtnTags = document.querySelectorAll(`[class ^= "product-show-more-btn"]`);
  productShowMoreBtnTags.forEach((el) => {
    el.addEventListener("click", function () {
      //
      const limitCount = 20;
      let method = el.dataset.method;
      const shopName = el.dataset.name;
      let priceScope = el.dataset.pricescope;
      //
      if (method === undefined) method = null;
      if (priceScope === undefined) priceScope = null;
      //
      const btnNumber = el.className.replace("product-show-more-btn", "");
      const skipCount = btnNumber * 20;
      //
      createProductTagsAjax(method, shopName, priceScope, skipCount, limitCount);
      this.remove();
    });
  });
};

////////////////////////////////////////////////////
/**
 * 각 상점의 상품 목록 태그 생성을 위한 ajax에 대한 함수
 * @param {string} method 상품 검색 및 정렬 조건
 * @param {string} shopName 상점 이름
 * @param {string} priceScope 가격 검색일 경우 입력 범위
 * @param {number} skipCount 상품 제외 개수
 * @param {number} limitCount 상품 조회 개수
 * @returns {object} { 문자열의 상품 목록 태그, 조건에 해당되는 모든 상품 목록의 개수, 장바구니에 담긴 모든 상품의 수량 }
 */
function createProductTagsAjax(method, shopName, priceScope, skipCount, limitCount) {
  //
  let url = null;
  let parentTag = null;
  //
  if (priceScope !== null) url = `shop/${method}/${shopName}/${priceScope}`;
  if (method !== null) url = `shop/${method}/${shopName}`;
  else url = `shop/${shopName}`;
  //
  return $.ajax({
    url: url,
    type: "post",
    data: { skipCount, limitCount },

    //////////////////////////////////////////
    /**
     * 각 상점의 상품 목록 태그를 생성해주는 함수
     * @param {object} { 문자열의 상품 목록 태그, 조건에 해당되는 모든 상품 목록의 개수, 장바구니에 담긴 모든 상품의 수량 }
     */
    success: ({ productTags, resultCount, cartTotalCount }) => {
      let lastName = null;
      switch (shopName) {
        case "ajy":
          lastName = "Ahn";
          break;
        case "jbh":
          lastName = "Ju";
          break;
        case "jjw":
          lastName = "Jang";
          break;
        default:
          break;
      }
      parentTag = document.querySelector(`.${lastName}-product-list`).querySelector(".product-list-row");
      //
      // ㅜ 태그 생성에 있어 덮어쓰거나 추가하거나
      if (skipCount === 0) {
        parentTag.innerHTML = productTags.join("");
        //
        const section3Tag = document.querySelector(".section3");
        section3Tag.scroll(0, 0);
      } else parentTag.innerHTML += productTags.join("");
      //
      // ㅜ 이전에 더보기 버튼이 있었다면 삭제하기
      const productShowMoreBtnTag = document.querySelector(`[class ^= "product-show-more-btn"][data-name = "${shopName}"][data-method = "${method}"][data-priceScope = "${priceScope}"]`);
      if (productShowMoreBtnTag !== null) productShowMoreBtnTag.remove();
      //
      // ㅜ 더보기 버튼이 필요하다면 생성하기
      if (resultCount > skipCount + limitCount) {
        //
        const productShowMoreBtnTag = document.createElement("input");
        if (priceScope !== null) {
          productShowMoreBtnTag.setAttribute("data-pricescope", priceScope);
        }
        if (method !== null) {
          productShowMoreBtnTag.setAttribute("data-method", method);
        }
        productShowMoreBtnTag.setAttribute("data-name", shopName);
        productShowMoreBtnTag.setAttribute("value", "더보기");
        productShowMoreBtnTag.setAttribute("type", "button");
        //
        btnNumber = parseInt(skipCount / 20) + 1;
        productShowMoreBtnTag.classList.add(`product-show-more-btn${btnNumber}`);
        //
        parentTag.appendChild(productShowMoreBtnTag);
        productShowMoreBtnEvent();
      }
    },
  });
}
//
// 09.05.17 수정
