let deleteCartControl = false;
let inCartControl = false;
const shopNameArr = ["ajy", "jbh", "jjw"];
const JuShopBtnTag = document.querySelector(".Ju-shop-btn");
const AhnShopBtnTag = document.querySelector(".Ahn-shop-btn");
const JangShopBtnTag = document.querySelector(".Jang-shop-btn");
const shopBtnTags = [AhnShopBtnTag, JuShopBtnTag, JangShopBtnTag];

// ㅜ 각 상점의 버튼을 클릭 했을 때
shopBtnTags.forEach((el, idx) => {
  el.addEventListener("click", async () => {
    //
    let method = null;
    const skipCount = 0;
    const keyword = null;
    let priceScope = null;
    const limitCount = 20;
    const cartTotalCountNumberTag = document.querySelector(".cart-total-count-number");
    //
    // ㅜ 각 상점의 상품 목록 태그 생성
    createProductTagsAjax(method, shopNameArr[idx], priceScope, keyword, skipCount, limitCount)
      //
      // ㅜ 장바구니에 담긴 모든 상품의 수량
      .then(({ products, resultCount, cartTotalCount, email }) => (cartTotalCountNumberTag.innerHTML = cartTotalCount));
    //
    // ㅜ 장바구니 아이콘에 대한 함수
    _cart.clickCartIcon();
    //
    // ㅜ 검색 창 태그 생성 및 검색어 기능에 대하여
    _search.createSearchTags();
    _search.searchKeyword();
    _search.showKeyword();
    //
    // ㅜ 신상품순의 버튼을 클릭 했을 때
    const productSortNewBtnTag = document.querySelector("#product-sort-new");
    productSortNewBtnTag.addEventListener("click", () => {
      //
      method = "new";
      _search.sortProducts(method, priceScope, keyword);
    });
    //
    // ㅜ 낮은 가격순의 버튼을 클릭 했을 때
    const productSortLowPriceBtnTag = document.querySelector("#product-sort-low-price");
    productSortLowPriceBtnTag.addEventListener("click", () => {
      //
      method = "lowPrice";
      _search.sortProducts(method, priceScope, keyword);
    });
    //
    // ㅜ 높은 가격순의 버튼을 클릭 했을 때
    const productSortHighPriceBtnTag = document.querySelector("#product-sort-high-price");
    productSortHighPriceBtnTag.addEventListener("click", () => {
      //
      method = "highPrice";
      _search.sortProducts(method, priceScope, keyword);
    });
    //
    // ㅜ 가격 범위를 입력하고 검색 버튼을 클릭 했을 때
    const productSearchPriceBtnTag = document.querySelector("#product-search-price-btn");
    productSearchPriceBtnTag.addEventListener("click", () => {
      //
      _search.searchPriceProducts();
    });
    //
  });
});

//////////////////////////////////////
/**
 * 더 보기 버튼의 클릭 이벤트에 대한 함수
 */
// ㅜ 역할:
// 모든 더 보기 버튼에 대해서 클릭 했을 때
// 버튼에 담긴 정보를 통해
// createProductTagsAjax 함수로 더 많은 상품을 가져올 수 있도록 하고
// 기존의 클릭한 버튼은 삭제
const productShowMoreBtnEvent = function () {
  //
  const productShowMoreBtnTags = document.querySelectorAll(`[class ^= "product-show-more-btn"]`);
  productShowMoreBtnTags.forEach((el) => {
    el.addEventListener("click", function () {
      //
      const keyword = null;
      const limitCount = 20;
      let method = el.dataset.method;
      const shopName = el.dataset.name;
      let priceScope = el.dataset.pricescope;
      //
      if (method === undefined) {
        method = null;
      }
      if (priceScope === undefined) {
        priceScope = null;
      }
      const btnNumber = el.className.replace("product-show-more-btn", "");
      const skipCount = btnNumber * 20;
      //
      createProductTagsAjax(method, shopName, priceScope, keyword, skipCount, limitCount);
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
 * @param {string} keyword 문자열의 상품 검색어
 * @param {number} skipCount 상품 제외 개수
 * @param {number} limitCount 상품 조회 개수
 * @returns {object}
 * products 해당 되는 상품 목록, resultCount 조건에 해당되는 모든 상품 목록의 개수, cartTotalCount 장바구니에 담긴 모든 상품의 수량, email 상품의 좋아요 기능을 위한 회원의 이메일
 */
// 1. method, shopName, priceScope의 변수를 통해
//    어떤 상점의 어떤 방법의 어느 가격 범위의 결과 값을 요하는 지에 대한 경로를 설정하고
//    결과 값에 해당되는 모든 상품 목록에서 몇 개부터 몇 개까지 받을 건지 경로와 함께 전송
// 2. 전송 받은 데이터가 해당되는 모든 상품 목록 중에서 첫 데이터일 경우
//    createProductTags 함수의 반환 값인 문자열의 HTML 태그를
//    덮어쓰기로서 상품 목록의 태그를 생성하고
//    위로 스크롤
// 3. 중간 데이터일 경우
//    기존의 상품 목록 태그 아래에 생성
// 4. 전송 받은 데이터가 마지막 데이터가 아니라면
//    더 보기 버튼 생성
// 5. 더 보기 버튼에 대한 이벤트 등록
function createProductTagsAjax(method, shopName, priceScope, keyword, skipCount, limitCount) {
  //
  let url = null;
  //
  if (priceScope !== null) {
    url = `shop/${method}/${shopName}/${priceScope}`;
  }
  //
  else if (keyword !== null) {
    url = `shop/${method}/${shopName}/${keyword}`;
  }
  //
  else if (method !== null) {
    url = `shop/${method}/${shopName}`;
  }
  //
  else {
    url = `shop/${shopName}`;
  }
  return $.ajax({
    url: url,
    type: "post",
    data: { skipCount, limitCount },
    //
    success: ({ products, resultCount, cartTotalCount, email }) => {
      //
      let lastName = null;
      let parentTag = null;
      const productTags = createProductTags(shopName, products, email);
      //
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
      }
      parentTag = document.querySelector(`.${lastName}-product-list`).querySelector(".product-list-row");
      //
      // ㅜ 태그 생성에 있어 덮어쓰거나 추가하거나
      if (skipCount === 0) {
        parentTag.innerHTML = productTags.join("");
        //
        const section2Tag = document.querySelector(".section2");
        const section3Tag = document.querySelector(".section3");
        const section4Tag = document.querySelector(".section4");
        section2Tag.scroll(0, 0);
        section3Tag.scroll(0, 0);
        section4Tag.scroll(0, 0);
      }
      //
      else {
        parentTag.innerHTML += productTags.join("");
      }
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
// 09.07.00 수정
