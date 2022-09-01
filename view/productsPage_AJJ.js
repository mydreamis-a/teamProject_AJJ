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
    let method = null;
    let skipCount = 0;
    let shopName = null;
    let limitCount = 20;
    let priceScope = null;
    //
    // ㅜ 비회원으로 가정
    const id = null;
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
    log(priceScope, "dd")
    createProductTagsAjax(method, shopName, priceScope, skipCount, limitCount)
      //
      .then((result) => (cartTotalCountNumberTag.innerHTML = result.cartTotalCount));
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

const productShowMoreBtnEvent = function () {
  //
  const productShowMoreBtnTags = document.querySelectorAll(`[class ^= "product-show-more-btn"]`);
  productShowMoreBtnTags.forEach(el => {
    el.addEventListener("click", function () {
      //
      let method = el.dataset.method;
      const shopName = el.dataset.name;
      let priceScope = el.dataset.pricescope;
      //
      if (method === undefined) method = null;
      if (priceScope === undefined) priceScope = null;
      //
      const btnNumber = el.className.replace("product-show-more-btn", "");
      skipCount = btnNumber * 20;
      limitCount = skipCount + 20;
      //
      createProductTagsAjax(method, shopName, priceScope, skipCount, limitCount);
      this.remove();
    })
  })
}

////////////////////////////////////////////////////
/**
 * 각 상점의 상품 목록 태그 생성을 위한 ajax에 대한 함수
 * @param {string} url 상점 이름
 */
const createProductTagsAjax = function (method, shopName, priceScope, skipCount, limitCount) {
  //
  let url = null;
  let parentTag = null;
  //
  if (priceScope !== null) url = `shop/${method}/${shopName}/${priceScope}`;
  if (method !== null) url = `shop/${method}/${shopName}`;
  else url = `shop/${shopName}`;
  log(url)
  //
  return $.ajax({
    url: url,
    type: "post",
    data: { skipCount, limitCount },
    /**
     * 각 상점의 상품 목록 태그를 생성해주는 함수
     * @param {object} result { 상점 이름, 문자열의 상품 목록 태그, 장바구니의 총 수량 }
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
      if (result.resultCount <= 20) parentTag.innerHTML = result.productTags.join("");
      else parentTag.innerHTML += result.productTags.join("");
      //
      let productShowMoreBtnTag = null;
      log(document.querySelector(`[class ^= "product-show-more-btn"][data-name = "${shopName}"][data-method = "${method}"][data-priceScope = "${priceScope}"]`))
      if (document.querySelector(`[class ^= "product-show-more-btn"][data-name = "${shopName}"][data-method = "${method}"][data-priceScope = "${priceScope}"]`)) {
        productShowMoreBtnTag = document.querySelector(`[class ^= "product-show-more-btn"][data-name = "${shopName}"][data-method = "${method}"][data-priceScope = "${priceScope}"]`);
        productShowMoreBtnTag.remove();
      }
      if (result.resultCount > limitCount) {
        //
        productShowMoreBtnTag = document.createElement("input");
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
        btnNumber = parseInt(limitCount / 20);
        productShowMoreBtnTag.classList.add(`product-show-more-btn${btnNumber}`);
        //
        parentTag.appendChild(productShowMoreBtnTag);
        productShowMoreBtnEvent();
      }
    },
  });
};
//
// 09.02.07 수정
