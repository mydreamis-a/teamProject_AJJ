const JuShopBtnTag = document.querySelector(".Ju-shop-btn");
const AhnShopBtnTag = document.querySelector(".Ahn-shop-btn");
const JangShopBtnTag = document.querySelector(".Jang-shop-btn");

const shopBtnTags = [AhnShopBtnTag, JuShopBtnTag, JangShopBtnTag];
shopBtnTags.forEach((el) => {
  //
  el.addEventListener("click", () => {
    //
    // ㅜ 비회원으로 가정
    const id = null;
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
        //
        createSearchTags();
        saveKeyword(id);
      },
    });
  });
});

// 08.30.08 수정
