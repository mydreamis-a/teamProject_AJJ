// ㅜ json 파일에서 상품 목록의 데이터를 가져오는 함수
function getProductData() {
  return fetch("/json/productData.json")
    .then((resolve) => resolve.json())
    .then((json) => json.productInfor)
    .catch((reject) => {
      console.log("가져오기 실패");
    });
}


(async () => {
  let productData = new Array();
  let AhnProducts = new Array();
  let JuProducts = new Array();
  let JangProducts = new Array();

  await getProductData().then((result) => {
    productData = [...result];
  })

  for (const key in productData) {
    if (Object.hasOwnProperty.call(productData, key)) {
      AhnProducts = productData.filter((el) => el.designerName === "AJY");
      JuProducts = productData.filter((el) => el.designerName === "JBH");
      JangProducts = productData.filter((el) => el.designerName === "JJW");
    }
  }

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

  let cartTotalAmount = 0;
  let cartUserListPrice = new Array();

  
  let cartTotalCount = 0;
  const showProductCount = 20;
  const cartTotalAmountTag = document.createElement("p");
  const cartIconTag = document.querySelector('.cart-icon');
  const JuShopBtnTag = document.querySelector('.Ju-shop-btn');
  const AhnShopBtnTag = document.querySelector('.Ahn-shop-btn');
  const cartListRowTag = document.querySelector('.cart-list-row');
  const cartExitBtnTag = document.querySelector('.cart-exit-btn');
  const JangShopBtnTag = document.querySelector('.Jang-shop-btn');
  const JuProductListTag = document.querySelector('.Ju-product-list');
  const AhnProductListTag = document.querySelector('.Ahn-product-list');
  const JangProductListTag = document.querySelector('.Jang-product-list');
  const cartModalContainerTag = document.querySelector('.cart-modal-container');
  const cartTotalCountNumberTag = document.querySelector('.cart-total-count-number');
  
  // ㅜ 장바구니의 합계 금액 태그에 대해 설정하기
  cartTotalAmountTag.classList.add("cart-total-amount");
  cartTotalAmountTag.innerHTML = "총 합계 금액: " + cartTotalAmount;
  cartListRowTag.after(cartTotalAmountTag);

  // ㅜ 각 상점의 메뉴 버튼을 클릭했을 때
  // ㅜ 해당 상점의 상품 목록 태그는 생성하고 다른 상점의 상품 목록 태그는 삭제하기
  AhnShopBtnTag.addEventListener("click", () => {
    if (JuProductListTag.querySelector('.product-list-col') !== null) {
      JuProductListTag.querySelector('.product-list-col').remove();
    }
    if (JangProductListTag.querySelector('.product-list-col') !== null) {
      JangProductListTag.querySelector('.product-list-col').remove();
    }
    createProductList(AhnProductListTag, AhnProducts, 0);
  })

  JuShopBtnTag.addEventListener("click", () => {
    if (AhnProductListTag.querySelector('.product-list-col') !== null) {
      AhnProductListTag.querySelector('.product-list-col').remove();
    }
    if (JangProductListTag.querySelector('.product-list-col') !== null) {
      JangProductListTag.querySelector('.product-list-col').remove();
    }
    createProductList(JuProductListTag, JuProducts, 0);
  })

  JangShopBtnTag.addEventListener("click", () => {
    if (AhnProductListTag.querySelector('.product-list-col') !== null) {
      AhnProductListTag.querySelector('.product-list-col').remove();
    }
    if (JuProductListTag.querySelector('.product-list-col') !== null) {
      JuProductListTag.querySelector('.product-list-col').remove();
    }
    createProductList(JangProductListTag, JangProducts, 0);
  })


  // ㅜ 상품 목록 관련 HTML 태그를 생성하는 함수
  function createProductList(productListTag, productData, startIdx) {
    const productListRowTag = productListTag.querySelector('.product-list-row');

    for (const key in productData) {
      if (Object.hasOwnProperty.call(productData, key)) {
        if (key < startIdx) { }

        else if (key < startIdx + showProductCount) {
          productListColTags[key] = document.createElement('div');
          productListColTags[key].classList.add('product-list-col');
          productListRowTag.appendChild(productListColTags[key]);

          productContainerTags[key] = document.createElement('div');
          productContainerTags[key].classList.add('product-container');
          productListColTags[key].appendChild(productContainerTags[key]);

          productImgTags[key] = document.createElement('div');
          productImgTags[key].classList.add('product-img');
          productImgTags[key].style.backgroundImage = productData[key].img;
          productContainerTags[key].appendChild(productImgTags[key]);

          productImgDarkTags[key] = document.createElement('div');
          productImgDarkTags[key].classList.add('product-img-dark');
          productImgTags[key].appendChild(productImgDarkTags[key]);

          productImgTextTags[key] = document.createElement('p');
          productImgTextTags[key].classList.add('product-img-text');
          productImgTextTags[key].innerHTML = "사진 크게 보기";
          productImgDarkTags[key].appendChild(productImgTextTags[key]);

          productBoxTags[key] = document.createElement('div');
          productBoxTags[key].classList.add('product-box');
          productImgTags[key].after(productBoxTags[key]);

          productNameTags[key] = document.createElement('p');
          productNameTags[key].classList.add('product-name');
          productNameTags[key].innerHTML = productData[key].name;
          productBoxTags[key].appendChild(productNameTags[key]);

          productPriceTags[key] = document.createElement('p');
          productPriceTags[key].classList.add('product-price');
          productPriceTags[key].innerHTML = `${productData[key].price}원`;
          productNameTags[key].after(productPriceTags[key]);

          productBtnContainerTags[key] = document.createElement('div');
          productBtnContainerTags[key].classList.add('product-btn-container');
          productPriceTags[key].after(productBtnContainerTags[key]);

          productBtnGroupTags[key] = document.createElement('div');
          productBtnGroupTags[key].classList.add('product-btn-group');
          productBtnContainerTags[key].appendChild(productBtnGroupTags[key]);

          inCartBtnTags[key] = document.createElement('input');
          inCartBtnTags[key].classList.add(`in-cart-btn${key}`);
          inCartBtnTags[key].setAttribute("type", "button");
          inCartBtnTags[key].setAttribute("value", "장바구니에 담기");
          productBtnGroupTags[key].appendChild(inCartBtnTags[key]);

          showProductBtnTags[key] = document.createElement('input');
          showProductBtnTags[key].classList.add(`show-product-btn${key}`);
          showProductBtnTags[key].setAttribute("type", "button");
          showProductBtnTags[key].setAttribute("value", "상품 보기");
          inCartBtnTags[key].after(showProductBtnTags[key]);


          // ㅜ 장바구니에 담기 버튼을 클릭했을 때
          // ㅜ 상품의 태그를 복사하고 삭제하기 버튼으로 바꾸기
          inCartBtnTags[key].addEventListener("click", () => {
            console.log("@@");
            cartTotalCount++;
            cartTotalCountNumberTag.innerHTML = cartTotalCount;
            cartTotalAmount += Number(productData[key].price);

            const copyTag = inCartBtnTags[key].closest('.product-list-col').cloneNode(true);
            const cartDeleteBtnTag = copyTag.querySelector(`.in-cart-btn${key}`);
            cartDeleteBtnTag.className = `cart-delete-btn${key}`;
            cartDeleteBtnTag.setAttribute("value", "삭제하기");
            cartListRowTag.appendChild(copyTag);

            // ㅜ 삭제하기 버튼을 클릭했을 때
            cartDeleteBtnTag.addEventListener("click", () => {
              cartTotalCount--;
              cartTotalCountNumberTag.innerHTML = cartTotalCount;
              cartTotalAmount -= Number(productData[key].price);
              cartDeleteBtnTag.closest('.product-list-col').remove();
            })
          })
        }
      }
    }

    // ㅜ 상품이 더 남아있을 경우에만 더보기 버튼을 생성하고
    // ㅜ 더보기 버튼을 클릭하면 상품 목록을 더 보여주기
    if (document.querySelector('.product-show-more-btn') !== null) {
      document.querySelector('.product-show-more-btn').remove();
    }
    if (productData.length > startIdx + showProductCount) {
      const productShowMoreBtnTag = document.createElement('input');
      productShowMoreBtnTag.classList.add('product-show-more-btn');
      productShowMoreBtnTag.setAttribute("type", "button");
      productShowMoreBtnTag.setAttribute("value", "더보기");
      productListRowTag.appendChild(productShowMoreBtnTag);

      productShowMoreBtnTag.addEventListener("click", () => {
        createProductList(productListTag, productData, startIdx + showProductCount);
      })
    }
  }

  // ㅜ 장바구니 아이콘을 클릭했을 때
  cartModalContainerTag.style.display = "hidden";
  cartIconTag.addEventListener("click", () => {
    cartModalContainerTag.style.display = "block";
  })
  cartExitBtnTag.addEventListener("click", () => {
    cartModalContainerTag.style.display = "hidden";
  })

})();