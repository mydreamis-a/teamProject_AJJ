const JuShopBtnTag = document.querySelector(".Ju-shop-btn");
const AhnShopBtnTag = document.querySelector(".Ahn-shop-btn");
const JangShopBtnTag = document.querySelector(".Jang-shop-btn");

const shopBtnTags = [AhnShopBtnTag, JuShopBtnTag, JangShopBtnTag];

shopBtnTags.forEach((el) => {
  //
  el.addEventListener("click", () => {
    $.ajax({
      //
      url: `/${el.className.replace("-btn", "")}`,
      type: "post",
      //
      success: function (result) {
        switch (result.name) {
          //
          case "AJY":
            let tag = document.querySelector(".Ahn-product-list").querySelector(".product-list-row");
            //
            tag.innerHTML = result.createProducts.join("");
            break;
          //
          case "JBH":
            tag = document.querySelector(".Ju-product-list").querySelector(".product-list-row");
            tag.innerHTML = result.createProducts.join("");
            break;
          //
          case "JJW":
            tag = document.querySelector(".Jang-product-list").querySelector(".product-list-row");
            tag.innerHTML = result.createProducts.join("");
            break;
          //
          default:
            break;
        }
      },
    });
  });
});
