const JuShopBtnTag = document.querySelector(".Ju-shop-btn");
const AhnShopBtnTag = document.querySelector(".Ahn-shop-btn");
const JangShopBtnTag = document.querySelector(".Jang-shop-btn");

const shopBtnTags = [AhnShopBtnTag, JuShopBtnTag, JangShopBtnTag];
shopBtnTags.forEach((el) => {
  //
  el.addEventListener("click", () => {
    //
    let parentTag = null;
    const shopName = el.className.replace("-btn", "");
    const cartTotalCountNumberTag = document.querySelector(".cart-total-count-number");
    //
    $.ajax({
      //
      url: `/${shopName}`,
      type: "post",
      //
      // ㅜ 각 상점의 상품 목록 태그를 생성해주는 함수
      success: (result) => {
        switch (result.shopName) {
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
        cartTotalCountNumberTag.innerHTML = result.count;
        createSearchTags();
      },
    });
  });
});

/**
 * 검색 관련 태그 생성 및 TOP 버튼의 클릭 이벤트에 대한 함수
 */
function createSearchTags() {
  //
  const width = document.querySelector("[class $= '-product-list']").clientWidth;
  const searchTag = document.querySelector(".search");
  //
  searchTag.style.width = `${widthFromPxToVw(width)}vw`;
  searchTag.style.visibility = "visible";
  searchTag.innerHTML = `
    <label class="product-search-price-start" for="product-search-price-start">가격 검색</label>
    <input id="product-search-price-start" class="product-search" type="number">
    <input id="product-search-price-end" class="product-search" type="number">
    <input id="product-search-price-btn" class="product-search" type="button" value="검색">
    <input id="product-sort-new" class="product-search" type="button" value="신상품순">
    <input id="product-sort-low-price" class="product-search" type="button" value="낮은가격순">
    <input id="product-sort-high-price" class="product-search" type="button" value="높은가격순">
    <input id="product-search-keyword" class="cart-input-search-item" type="search">
    <input name="q" id="product-search-keyword-btn" class="product-search" type="button" value="검색">
    <div class="product-search-last">최근검색어</div>
    `;

  const mainHeaderTag = document.querySelector(".main-header");
  mainHeaderTag.style.backgroundColor = "white";

  // ㅜ TOP 버튼을 클릭했을 때 검색 관련 태그들 숨기기
  const topIconTag = document.querySelector(".top-icon");
  topIconTag.addEventListener("click", () => {
    //
    searchTag.style.visibility = "hidden";
    mainHeaderTag.style.backgroundColor = "";
  });
}

/**
 * px 단위의 너비를 vw 단위의 너비로 반환해주는 함수
 * @param {number} value 
 * @returns vw 단위의 너비
 */
function widthFromPxToVw(value) {
  const bodyWidth = document.querySelector("body").offsetWidth;
  return value / bodyWidth * 100;
}

// 08.29.03 수정
