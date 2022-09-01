const JuShopBtnTag = document.querySelector(".Ju-shop-btn");
const AhnShopBtnTag = document.querySelector(".Ahn-shop-btn");
const JangShopBtnTag = document.querySelector(".Jang-shop-btn");
//
// ㅜ 각 상점의 버튼을 클릭했을 때
const shopBtnTags = [AhnShopBtnTag, JuShopBtnTag, JangShopBtnTag];
shopBtnTags.forEach((el, idx) => {
  //
  el.addEventListener("click", async () => {
    //
    // ㅜ 비회원으로 가정
    const id = null;
    let skipCount = 0;
    let shopName = null;
    let limitCount = 20;
    const cartTotalCountNumberTag = document.querySelector(".cart-total-count-number");
    //
    switch (idx) {
      case 0:
        shopName = "ajy";
        break;
      case 1:
        shopName = "jbh";
        break;
      case 2:
        shopName = "jjw";
        break;
      default:
        break;
    }
    // ㅜ 각 상점의 상품 목록 태그 생성 및 장바구니 기능에 대하여
    createProductTagsAjax(null, shopName, skipCount, limitCount).then((result) => (cartTotalCountNumberTag.innerHTML = result.cartTotalCount));
    _cart.clickCartIcon();
    //
    // ㅜ 검색 창 태그 생성 및 검색어 기능에 대하여
    _search.createSearchTags();
    _search.saveKeyword(id);
    _search.showKeyword(id);
    //
    // ㅜ 신상품순의 버튼을 클릭했을 때
    const productSortNewBtnTag = document.querySelector("#product-sort-new");
    productSortNewBtnTag.addEventListener("click", () => {
      //
      _search.sortProducts("new", skipCount, limitCount);
    });
    //
    // ㅜ 낮은 가격순의 버튼을 클릭했을 때
    const productSortLowPriceBtnTag = document.querySelector("#product-sort-low-price");
    productSortLowPriceBtnTag.addEventListener("click", () => {
      //
      _search.sortProducts("lowPrice", skipCount, limitCount);
    });
    //
    // ㅜ 높은 가격순의 버튼을 클릭했을 때
    const productSortHighPriceBtnTag = document.querySelector("#product-sort-high-price");
    productSortHighPriceBtnTag.addEventListener("click", () => {
      //
      _search.sortProducts("highPrice", skipCount, limitCount);
    });
    //
    // ㅜ 가격 범위를 입력하고 검색 버튼을 클릭했을 때
    const productSearchPriceBtnTag = document.querySelector("#product-search-price-btn");
    productSearchPriceBtnTag.addEventListener("click", () => {
      //
      _search.searchPriceProducts();
    });
  });
});

////////////////////////////////////////////////////
/**
 * 각 상점의 상품 목록 태그 생성을 위한 ajax에 대한 함수
 * @param {string} url 상점 이름
 */
const createProductTagsAjax = function (method, shopName, skipCount, limitCount) {
  //
  let url;
  let skipCount;
  let btnNumber;
  let limitCount;
  let parentTag = null;
  let productShowMoreBtnTag;
  //
  if (method === null) url = `shop/${shopName}`;
  else url = `shop/${method}/${shopName}`;
  //
  // ㅜ 더보기 버튼이 있다면
  if (document.querySelector(`[data-name = "${shopName}"][data-method = "${method}"][class ^= "product-show-more-btn"]`)) {
    productShowMoreBtnTag = document.querySelector(`[data-name = "${shopName}"][data-method = "${method}"][class ^= "product-show-more-btn"]`);
    //
    log(productShowMoreBtnTag);
    btnNumber = productShowMoreBtnTag.className.replace("product-show-more-btn", "");
    skipCount = btnNumber * 20;
    limitCount = skipCount + 20;
    //
    productShowMoreBtnTag.remove();
  } else {
    skipCount = 0;
    limitCount = 20;
  }
  //
  return $.ajax({
    url: url,
    type: "post",
    data: { skipCount, limitCount },
    /**
     * 각 상점의 상품 목록 태그를 생성해주는 함수
     * @param {*} result { 상점 이름, 문자열의 상품 목록 태그, 장바구니의 총 수량 }
     * @returns 장바구니의 총 수량
     */
    success: (result) => {
      switch (shopName) {
        //
        case "ajy":
          parentTag = document.querySelector(".Ahn-product-list").querySelector(".product-list-row");
          break;
        //
        case "jbh":
          parentTag = document.querySelector(".Ju-product-list").querySelector(".product-list-row");
          break;
        //
        case "jjw":
          parentTag = document.querySelector(".Jang-product-list").querySelector(".product-list-row");
          break;
        //
        default:
          break;
      }
      parentTag.innerHTML = result.productTags.join("");
      //
      if (result.resultCount > limitCount) {
        //
        btnNumber = parseInt(limitCount / 20);
        productShowMoreBtnTag = document.createElement("input");
        productShowMoreBtnTag.classList.add(`product-show-more-btn${btnNumber}`);
        productShowMoreBtnTag.setAttribute("data-method", method);
        productShowMoreBtnTag.setAttribute("data-name", shopName);
        productShowMoreBtnTag.setAttribute("value", "더보기");
        productShowMoreBtnTag.setAttribute("type", "button");
        parentTag.appendChild(productShowMoreBtnTag);
        //
        skipCount += 20;
        limitCount += 20;
      }
    },
  });
};
//
// 09.01.21 수정
