const JuShopBtnTag = document.querySelector(".Ju-shop-btn");
const AhnShopBtnTag = document.querySelector(".Ahn-shop-btn");
const JangShopBtnTag = document.querySelector(".Jang-shop-btn");
<<<<<<< HEAD

=======
//
// ㅜ 각 상점의 버튼을 클릭했을 때
>>>>>>> 3bca3fb (정렬 기능 최적화 구현 완료)
const shopBtnTags = [AhnShopBtnTag, JuShopBtnTag, JangShopBtnTag];
shopBtnTags.forEach((el) => {
  //
  el.addEventListener("click", async() => {
    //
    // ㅜ 비회원으로 가정
    const id = null;
    let parentTag = null;
    const shopName = el.className.replace("-btn", "");
    const cartTotalCountNumberTag = document.querySelector(".cart-total-count-number");
    //
<<<<<<< HEAD
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
        //
        createSearchTags();
        saveKeyword(id);
        showKeyword(id);
      },
    });
  });
});

// 08.30.08 수정
=======
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
    const cartTotalCount = await createProductTagsAjax(shopName);
    cartTotalCountNumberTag.innerHTML = cartTotalCount;
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
      _search.sortProducts("new");
    });
    //
    // ㅜ 낮은 가격순의 버튼을 클릭했을 때
    const productSortLowPriceBtnTag = document.querySelector("#product-sort-low-price");
    productSortLowPriceBtnTag.addEventListener("click", () => {
      //
      _search.sortProducts("lowPrice");
    });
    //
    // ㅜ 높은 가격순의 버튼을 클릭했을 때
    const productSortHighPriceBtnTag = document.querySelector("#product-sort-high-price");
    productSortHighPriceBtnTag.addEventListener("click", () => {
      //
      _search.sortProducts("highPrice");
    });
  });
});

////////////////////////////////////////////////////
/**
 * 각 상점의 상품 목록 태그 생성을 위한 ajax에 대한 함수
 * @param {string} url 상점 이름
 */
const createProductTagsAjax = function (url) {
  let parentTag = null;
  //
  $.ajax({
    url: `/shop/${url}`,
    type: "post",
    /**
     * 각 상점의 상품 목록 태그를 생성해주는 함수
     * @param {*} result { 상점 이름, 문자열의 상품 목록 태그, 장바구니의 총 수량 }
     * @returns 장바구니의 총 수량
     */
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
      return result.cartTotalCount;
    },
  });
};
//
// 09.01.08 수정
>>>>>>> 3bca3fb (정렬 기능 최적화 구현 완료)
