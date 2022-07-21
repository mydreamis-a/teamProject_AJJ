// ㅜ json 파일에서 상품 목록의 데이터를 가져오는 함수
function getProductsData() {
  return fetch("/JSON/productsData_AJJ.json")
    .then((resolve) => resolve.json())
    .then((json) => json.productInfor)
    .catch((reject) => {
      console.log("가져오기 실패");
    });
}

(async () => {
  let productsData = new Array();
  let AhnProducts = new Array();
  let JuProducts = new Array();
  let JangProducts = new Array();

  await getProductsData().then((result) => {
    productsData = [...result];
  });

  AhnProducts = productsData.filter((el) => el.designerName === "AJY");
  JuProducts = productsData.filter((el) => el.designerName === "JBH");
  JangProducts = productsData.filter((el) => el.designerName === "JJW");

  let productListColTags = new Array();
  let productContainerTags = new Array();
  let productImgTags = new Array();
  let productImgDarkTags = new Array();
  let productImgTextTags = new Array();
  let productBoxTags = new Array();
  let productNameTags = new Array();
  let productPriceTags = new Array();
  let productBtnContainerTags = new Array();
  let productBtnGroupTags = new Array();
  let inCartBtnTags = new Array();
  let showProductBtnTags = new Array();

  let cartTotalCount = 0;
  let cartTotalAmount = 0;
  const showProductCount = 20;
  const cartTotalAmountTag = document.createElement("p");
  const cartIconTag = document.querySelector(".cart-icon");
  const productSearchLastTag = document.createElement("div");
  const JuShopBtnTag = document.querySelector(".Ju-shop-btn");
  const productSearchNameTag = document.createElement("input");
  const productSortNewBtnTag = document.createElement("input");
  const AhnShopBtnTag = document.querySelector(".Ahn-shop-btn");
  const cartListRowTag = document.querySelector(".cart-list-row");
  const cartExitBtnTag = document.querySelector(".cart-exit-btn");
  const JangShopBtnTag = document.querySelector(".Jang-shop-btn");
  const productSearchNameBtnTag = document.createElement("input");
  const productSearchPriceBtnTag = document.createElement("input");
  const productSearchPriceEndTag = document.createElement("input");
  const productSortLowPriceBtnTag = document.createElement("input");
  const productSortHighPriceBtnTag = document.createElement("input");
  const productSearchPriceStartTag = document.createElement("input");
  const productSearchPriceLabelTag = document.createElement("label");
  const JuProductListTag = document.querySelector(".Ju-product-list");
  const AhnProductListTag = document.querySelector(".Ahn-product-list");
  const JangProductListTag = document.querySelector(".Jang-product-list");
  const cartModalContainerTag = document.querySelector(".cart-modal-container");
  const cartTotalCountNumberTag = document.querySelector(".cart-total-count-number");

  const breadKeywords = ["bread", "빵", "포켓몬", "poketmon", "포켓몬빵"];
  const figureKeywords = ["figure", "피규어", "포켓몬", "poketmon", "헬창"];
  const pantsKeywords = ["pants", "바지", "팬츠"];
  const leggingsKeywords = ["leggings", "레깅스"];
  const setKeywords = ["set", "세트"];
  const shoesKeywords = ["shoes", "신발", "슈즈"];
  const bagKeywords = ["bag", "가방", "백", "샤넬", "샤넬백"];
  const musicKeywords = ["music", "뮤직", "음악", "뮤지컬"];
  const musicalKeywords = ["musical", "뮤지컬", "연극", "music", "뮤직", "음악"];
  const classicalMusicKeywords = ["classical music", "classical", "클래식", "music", "뮤직", "음악"];
  const keywords = [breadKeywords, figureKeywords, pantsKeywords, leggingsKeywords, setKeywords, shoesKeywords, bagKeywords, musicKeywords, musicalKeywords, classicalMusicKeywords];

  // ㅜ 장바구니의 합계 금액 태그에 대해 설정하기
  cartTotalAmountTag.classList.add("cart-total-amount");
  cartTotalAmountTag.innerHTML = "총 합계 금액: " + cartTotalAmount;
  cartListRowTag.after(cartTotalAmountTag);

  // ㅜ 각 상점의 메뉴 버튼을 클릭했을 때
  // ㅜ 해당 상점의 상품 목록 태그는 생성하고 다른 상점의 상품 목록 태그는 삭제하기
  AhnShopBtnTag.addEventListener("click", () => {
    if (JuProductListTag.querySelector(".product-list-col") !== null) {
      JuProductListTag.querySelector(".product-list-col").remove();
    }
    if (JangProductListTag.querySelector(".product-list-col") !== null) {
      JangProductListTag.querySelector(".product-list-col").remove();
    }
    createProductList(AhnProductListTag, AhnProducts, 0);
  });

  JuShopBtnTag.addEventListener("click", () => {
    if (AhnProductListTag.querySelector(".product-list-col") !== null) {
      AhnProductListTag.querySelector(".product-list-col").remove();
    }
    if (JangProductListTag.querySelector(".product-list-col") !== null) {
      JangProductListTag.querySelector(".product-list-col").remove();
    }
    createProductList(JuProductListTag, JuProducts, 0);
  });

  JangShopBtnTag.addEventListener("click", () => {
    if (AhnProductListTag.querySelector(".product-list-col") !== null) {
      AhnProductListTag.querySelector(".product-list-col").remove();
    }
    if (JuProductListTag.querySelector(".product-list-col") !== null) {
      JuProductListTag.querySelector(".product-list-col").remove();
    }
    createProductList(JangProductListTag, JangProducts, 0);
  });

  // ㅜ 상품 목록 관련 HTML 태그를 생성하는 함수
  function createProductList(productListTag, productsData, startIdx) {
    const productListRowTag = productListTag.querySelector(".product-list-row");

    for (const key in productsData) {
      if (Object.hasOwnProperty.call(productsData, key)) {
        if (key < startIdx) {
        } else if (key < startIdx + showProductCount) {
          productListColTags[key] = document.createElement("div");
          productListColTags[key].classList.add("product-list-col");
          productListRowTag.appendChild(productListColTags[key]);

          productContainerTags[key] = document.createElement("div");
          productContainerTags[key].classList.add("product-container");
          productListColTags[key].appendChild(productContainerTags[key]);

          productImgTags[key] = document.createElement("div");
          productImgTags[key].classList.add("product-img");
          productImgTags[key].style.backgroundImage = productsData[key].img;
          productContainerTags[key].appendChild(productImgTags[key]);

          productImgDarkTags[key] = document.createElement("div");
          productImgDarkTags[key].classList.add("product-img-dark");
          productImgTags[key].appendChild(productImgDarkTags[key]);

          productImgTextTags[key] = document.createElement("p");
          productImgTextTags[key].classList.add("product-img-text");
          productImgTextTags[key].innerHTML = "사진 크게 보기";
          productImgDarkTags[key].appendChild(productImgTextTags[key]);

          productBoxTags[key] = document.createElement("div");
          productBoxTags[key].classList.add("product-box");
          productImgTags[key].after(productBoxTags[key]);

          productNameTags[key] = document.createElement("p");
          productNameTags[key].classList.add("product-name");
          productNameTags[key].innerHTML = productsData[key].name;
          productBoxTags[key].appendChild(productNameTags[key]);

          productPriceTags[key] = document.createElement("p");
          productPriceTags[key].classList.add("product-price");
          productPriceTags[key].innerHTML = `${productsData[key].price}원`;
          productNameTags[key].after(productPriceTags[key]);

          productBtnContainerTags[key] = document.createElement("div");
          productBtnContainerTags[key].classList.add("product-btn-container");
          productPriceTags[key].after(productBtnContainerTags[key]);

          productBtnGroupTags[key] = document.createElement("div");
          productBtnGroupTags[key].classList.add("product-btn-group");
          productBtnContainerTags[key].appendChild(productBtnGroupTags[key]);

          inCartBtnTags[key] = document.createElement("input");
          inCartBtnTags[key].classList.add(`in-cart-btn${key}`);
          inCartBtnTags[key].setAttribute("type", "button");
          inCartBtnTags[key].setAttribute("value", "장바구니에 담기");
          productBtnGroupTags[key].appendChild(inCartBtnTags[key]);

          showProductBtnTags[key] = document.createElement("input");
          showProductBtnTags[key].classList.add(`show-product-btn${key}`);
          showProductBtnTags[key].setAttribute("type", "button");
          showProductBtnTags[key].setAttribute("value", "상품 보기");
          inCartBtnTags[key].after(showProductBtnTags[key]);

          // ㅜ 장바구니에 담기 버튼을 클릭했을 때
          cartTotalCountNumberTag.innerHTML = cartTotalCount;
          inCartBtnTags[key].addEventListener("click", () => {
            // ㅜ 장바구니에 담은 상품 수
            cartTotalCount++;
            cartTotalCountNumberTag.innerHTML = cartTotalCount;

            // ㅜ 장바구니에 담은 상품의 합계 금액
            cartTotalAmount += Number(productsData[key].price);
            cartTotalAmountTag.innerHTML = "총 합계 금액: " + cartTotalAmount;

            // ㅜ 클릭한 상품의 태그를 복사한 다음에 삭제하기 버튼으로 바꾸기
            const copyTag = inCartBtnTags[key].closest(".product-list-col").cloneNode(true);
            const cartDeleteBtnTag = copyTag.querySelector(`.in-cart-btn${key}`);
            cartDeleteBtnTag.className = `cart-delete-btn${key}`;
            cartDeleteBtnTag.setAttribute("value", "삭제하기");
            cartListRowTag.appendChild(copyTag);

            // ㅜ 삭제하기 버튼을 클릭했을 때
            cartDeleteBtnTag.addEventListener("click", () => {
              // ㅜ 장바구니에 담은 상품 수
              cartTotalCount--;
              cartTotalCountNumberTag.innerHTML = cartTotalCount;

              // ㅜ 장바구니에 담은 상품의 합계 금액
              cartTotalAmount -= Number(productsData[key].price);
              cartTotalAmountTag.innerHTML = "총 합계 금액: " + cartTotalAmount;

              cartDeleteBtnTag.closest(".product-list-col").remove();
            });
          });
        }
      }

      // ㅜ 보여줄 상품이 더 남아 있을 경우에 더보기 버튼 생성하기
      if (document.querySelector(".product-show-more-btn") !== null) {
        document.querySelector(".product-show-more-btn").remove();
      }
      if (productsData.length > startIdx + showProductCount) {
        const productShowMoreBtnTag = document.createElement("input");
        productShowMoreBtnTag.classList.add("product-show-more-btn");
        productShowMoreBtnTag.setAttribute("type", "button");
        productShowMoreBtnTag.setAttribute("value", "더보기");
        productListRowTag.appendChild(productShowMoreBtnTag);
        productShowMoreBtnTag.style.display = "block";

        // ㅜ 더보기 버튼을 클릭하면 상품을 더 보여주기
        productShowMoreBtnTag.addEventListener("click", () => {
          createProductList(productListTag, productsData, startIdx + showProductCount);
        });
      }
    }

    // ㅜ 장바구니 아이콘을 클릭했을 때
    cartModalContainerTag.style.display = "";
    cartIconTag.addEventListener("click", () => {
      cartModalContainerTag.style.display = "block";
    });
    cartExitBtnTag.addEventListener("click", () => {
      cartModalContainerTag.style.display = "";
    });
  }

  // ㅜ 검색 관련 HTML 태그 생성하기
  productSearchPriceLabelTag.classList.add("product-search-price-start");
  productSearchPriceLabelTag.setAttribute("for", "product-search-price-start");
  productSearchPriceLabelTag.innerHTML = "가격 검색";
  document.querySelector(".search").appendChild(productSearchPriceLabelTag);

  productSearchPriceStartTag.id = "product-search-price-start";
  productSearchPriceStartTag.classList.add("product-search");
  productSearchPriceStartTag.setAttribute("type", "number");
  productSearchPriceLabelTag.appendChild(productSearchPriceStartTag);

  productSearchPriceEndTag.id = "product-search-price-end";
  productSearchPriceEndTag.classList.add("product-search");
  productSearchPriceEndTag.setAttribute("type", "number");
  productSearchPriceStartTag.after(productSearchPriceEndTag);

  productSearchPriceBtnTag.id = "product-search-price-btn";
  productSearchPriceBtnTag.classList.add("product-search");
  productSearchPriceBtnTag.setAttribute("type", "button");
  productSearchPriceBtnTag.setAttribute("value", "검색");
  productSearchPriceEndTag.after(productSearchPriceBtnTag);

  productSortNewBtnTag.id = "product-sort-new";
  productSortNewBtnTag.classList.add("product-search");
  productSortNewBtnTag.setAttribute("type", "button");
  productSortNewBtnTag.setAttribute("value", "신상품순");
  productSearchPriceBtnTag.after(productSortNewBtnTag);

  productSortLowPriceBtnTag.id = "product-sort-low-price";
  productSortLowPriceBtnTag.classList.add("product-search");
  productSortLowPriceBtnTag.setAttribute("type", "button");
  productSortLowPriceBtnTag.setAttribute("value", "낮은가격순");
  productSortNewBtnTag.after(productSortLowPriceBtnTag);

  productSortHighPriceBtnTag.id = "product-sort-high-price";
  productSortHighPriceBtnTag.classList.add("product-search");
  productSortHighPriceBtnTag.setAttribute("type", "button");
  productSortHighPriceBtnTag.setAttribute("value", "높은가격순");
  productSortLowPriceBtnTag.after(productSortHighPriceBtnTag);

  productSearchNameTag.id = "product-search-name";
  productSearchNameTag.classList.add("cart-input-search-item");
  productSearchNameTag.setAttribute("type", "search");
  productSortHighPriceBtnTag.after(productSearchNameTag);

  productSearchNameBtnTag.id = "product-search-name-btn";
  productSearchNameBtnTag.classList.add("product-search");
  productSearchNameBtnTag.setAttribute("type", "button");
  productSearchNameBtnTag.setAttribute("value", "검색");
  productSearchNameTag.after(productSearchNameBtnTag);

  productSearchLastTag.classList.add("product-search-last");
  productSearchLastTag.innerHTML = "최근검색어";
  productSearchNameBtnTag.after(productSearchLastTag);

  // ㅜ 가격 검색 기능
  productSearchPriceBtnTag.addEventListener("click", () => {
    let resultProducts = new Array();
    const min = productSearchPriceStartTag.value;
    const max = productSearchPriceEndTag.value;
    if (min === null && max === null) resultProducts = productsData;
    else if (min === null) resultProducts.push(productsData.filter((el) => el.price >= min));
    else if (max === null) resultProducts.push(productsData.filter((el) => el.price <= max));
    else {
      resultProducts.push(productsData.filter((el) => el.price >= min && el.price <= max));
    }
    resultProducts = resultProducts.sort((a, b) => a - b);
    createProductList(productListTag, resultProducts, startIdx)

  })
})();
