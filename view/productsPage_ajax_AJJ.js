const JuShopBtnTag = document.querySelector(".Ju-shop-btn");
const AhnShopBtnTag = document.querySelector(".Ahn-shop-btn");
const JangShopBtnTag = document.querySelector(".Jang-shop-btn");

const shopBtnTags = [AhnShopBtnTag, JuShopBtnTag, JangShopBtnTag];

shopBtnTags.forEach((el) => {
  //
  el.addEventListener("click", () => {
    //
    let tag = null;
    const shopName = el.className.replace("-btn", "");
    //
    const cartTotalCountNumberTag = document.querySelector(".cart-total-count-number");
    cartTotalCountNumberTag.innerHTML = 0;
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
            tag = document.querySelector(".Ahn-product-list").querySelector(".product-list-row");
            //
            tag.innerHTML = result.productTags.join("");
            break;
          //
          case "jbh":
            tag = document.querySelector(".Ju-product-list").querySelector(".product-list-row");
            tag.innerHTML = result.productTags.join("");
            break;
          //
          case "jjw":
            tag = document.querySelector(".Jang-product-list").querySelector(".product-list-row");
            tag.innerHTML = result.productTags.join("");
            break;
          //
          default:
            break;
        }
      },
    });
  });
});

// 08.28.04 수정
