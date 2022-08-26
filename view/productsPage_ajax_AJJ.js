const JuShopBtnTag = document.querySelector(".Ju-shop-btn");
const AhnShopBtnTag = document.querySelector(".Ahn-shop-btn");
const JangShopBtnTag = document.querySelector(".Jang-shop-btn");

const shopBtnTags = [AhnShopBtnTag, JuShopBtnTag, JangShopBtnTag];

shopBtnTags.forEach((el) => {
  //
  el.addEventListener("click", () => {
    let tag = null;
    const shopName = el.className.replace("-btn", "");
    //
    $.ajax({
      //
      url: `/${shopName}`,
      type: "post",
      //
      // ㅜ 각 상점의 상품 목록 태그를 생성해주는 함수
      success: (sendResult) => {
        switch (sendResult.shopName) {
          //
          case "AJY":
            tag = document.querySelector(".Ahn-product-list").querySelector(".product-list-row");
            //
            tag.innerHTML = sendResult.productsTag.join("");
            break;
          //
          case "JBH":
            tag = document.querySelector(".Ju-product-list").querySelector(".product-list-row");
            tag.innerHTML = sendResult.productsTag.join("");
            break;
          //
          case "JJW":
            tag = document.querySelector(".Jang-product-list").querySelector(".product-list-row");
            tag.innerHTML = sendResult.productsTag.join("");
            break;
          //
          default:
            break;
        }
      },
    });
  });
});

// 08.26.10 수정
