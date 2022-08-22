class productsPage {
  constructor() {
    this.init();
  }
  // ㅜ json 파일에서 상품 목록의 데이터를 가져오는 함수
  getProductsData() {
    return fetch("/JSON/productsData_AJJ.json")
      .then((resolve) => resolve.json())
      .then((json) => json.productsInfor)
      .catch((reject) => {
        console.log("가져오기 실패");
      });
  }
  init() {
    (async () => {
      let productsData = new Array();
      let AhnProducts = new Array();
      let JuProducts = new Array();
      let JangProducts = new Array();

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
      const searchTag = document.querySelector('.search');
      const topIconTag = document.querySelector('.top-icon');
      const cartTotalAmountTag = document.createElement('p');
      const cartIconTag = document.querySelector('.cart-icon');
      const productLastKeywordsTag = document.createElement('div');
      const JuShopBtnTag = document.querySelector('.Ju-shop-btn');
      const productSortNewBtnTag = document.createElement('input');
      const AhnShopBtnTag = document.querySelector('.Ahn-shop-btn');
      const cartListRowTag = document.querySelector('.cart-list-row');
      const cartExitBtnTag = document.querySelector('.cart-exit-btn');
      const JangShopBtnTag = document.querySelector('.Jang-shop-btn');
      const productSearchKeywordTag = document.createElement('input');
      const productSearchPriceBtnTag = document.createElement('input');
      const productSearchPriceEndTag = document.createElement('input');
      const productSortLowPriceBtnTag = document.createElement('input');
      const productSearchKeywordBtnTag = document.createElement('input');
      const productSortHighPriceBtnTag = document.createElement('input');
      const productSearchPriceStartTag = document.createElement('input');
      const productSearchPriceLabelTag = document.createElement('label');
      const JuProductListTag = document.querySelector('.Ju-product-list');
      const AhnProductListTag = document.querySelector('.Ahn-product-list');
      const JangProductListTag = document.querySelector('.Jang-product-list');
      const cartModalContainerTag = document.querySelector('.cart-modal-container');
      const cartTotalCountNumberTag = document.querySelector('.cart-total-count-number');

      let lastKeywords = new Array();
      const breadKeywords = ["bread", "빵", "포켓몬", "poketmon", "포켓몬빵"];
      const figureKeywords = ["figure", "피규어", "포켓몬", "poketmon", "헬창"];
      const setKeywords = ["set", "세트", "패션", "옷"];
      const pantsKeywords = ["pants", "바지", "팬츠", "패션", "옷"];
      const leggingsKeywords = ["leggings", "레깅스", "패션", "옷"];
      const shoesKeywords = ["shoes", "신발", "슈즈", "패션", "잡화"];
      const bagKeywords = ["bag", "가방", "백", "샤넬", "샤넬백", "패션", "잡화"];
      const musicKeywords = ["music", "뮤직", "음악", "노래", "예술"];
      const musicalKeywords = ["musical", "뮤지컬", "연기", "music", "뮤직", "음악", "노래", "예술"];
      const classicalMusicKeywords = ["classical music", "classical", "클래식", "music", "뮤직", "음악", "노래", "예술"];
      const similarKeywords = [breadKeywords, figureKeywords, setKeywords, pantsKeywords, leggingsKeywords, shoesKeywords, bagKeywords, musicKeywords, musicalKeywords, classicalMusicKeywords];

      await this.getProductsData().then((result) => {
        productsData = [...result];
      });

      // ㅜ 각 상점별로 상품 목록 분류하기
      AhnProducts = sortByDesignerName(productsData, "AJY");
      JuProducts = sortByDesignerName(productsData, "JBH");
      JangProducts = sortByDesignerName(productsData, "JJW");

      // ㅜ 해당 상점명을 클릭하면 그 상점의 상품 목록을 보여주기
      showProductList(AhnShopBtnTag, AhnProductListTag, AhnProducts, 0);
      showProductList(JuShopBtnTag, JuProductListTag, JuProducts, 0);
      showProductList(JangShopBtnTag, JangProductListTag, JangProducts, 0);

      // ㅜ 장바구니의 합계 금액 태그에 대해 설정하기
      cartTotalAmountTag.classList.add('cart-total-amount');
      cartTotalAmountTag.innerHTML = "총 합계 금액: " + cartTotalAmount;
      cartListRowTag.after(cartTotalAmountTag);

      // ㅜ 검색 관련 HTML 태그 생성하기
      productSearchPriceLabelTag.classList.add('product-search-price-start');
      productSearchPriceLabelTag.setAttribute("for", "product-search-price-start");
      productSearchPriceLabelTag.innerHTML = "가격 검색";
      searchTag.appendChild(productSearchPriceLabelTag);

      productSearchPriceStartTag.id = "product-search-price-start";
      productSearchPriceStartTag.classList.add('product-search');
      productSearchPriceStartTag.setAttribute("type", "number");
      searchTag.appendChild(productSearchPriceStartTag);

      productSearchPriceEndTag.id = "product-search-price-end";
      productSearchPriceEndTag.classList.add('product-search');
      productSearchPriceEndTag.setAttribute("type", "number");
      searchTag.appendChild(productSearchPriceEndTag);

      productSearchPriceBtnTag.id = "product-search-price-btn";
      productSearchPriceBtnTag.classList.add('product-search');
      productSearchPriceBtnTag.setAttribute("type", "button");
      productSearchPriceBtnTag.setAttribute("value", "검색");
      searchTag.appendChild(productSearchPriceBtnTag);

      productSortNewBtnTag.id = "product-sort-new";
      productSortNewBtnTag.classList.add('product-search');
      productSortNewBtnTag.setAttribute("type", "button");
      productSortNewBtnTag.setAttribute("value", "신상품순");
      searchTag.appendChild(productSortNewBtnTag);

      productSortLowPriceBtnTag.id = "product-sort-low-price";
      productSortLowPriceBtnTag.classList.add('product-search');
      productSortLowPriceBtnTag.setAttribute("type", "button");
      productSortLowPriceBtnTag.setAttribute("value", "낮은가격순");
      searchTag.appendChild(productSortLowPriceBtnTag);

      productSortHighPriceBtnTag.id = "product-sort-high-price";
      productSortHighPriceBtnTag.classList.add('product-search');
      productSortHighPriceBtnTag.setAttribute("type", "button");
      productSortHighPriceBtnTag.setAttribute("value", "높은가격순");
      searchTag.appendChild(productSortHighPriceBtnTag);

      productSearchKeywordTag.id = "product-search-keyword";
      productSearchKeywordTag.classList.add('cart-input-search-item');
      productSearchKeywordTag.setAttribute("type", "search");
      productSearchKeywordBtnTag.setAttribute("name", "q");
      searchTag.appendChild(productSearchKeywordTag);

      productSearchKeywordBtnTag.id = "product-search-keyword-btn";
      productSearchKeywordBtnTag.classList.add('product-search');
      productSearchKeywordBtnTag.setAttribute("type", "button");
      productSearchKeywordBtnTag.setAttribute("value", "검색");
      searchTag.appendChild(productSearchKeywordBtnTag);

      productLastKeywordsTag.classList.add('product-search-last');
      productLastKeywordsTag.innerHTML = "최근검색어";
      searchTag.appendChild(productLastKeywordsTag);

      // ㅜ 가격 범위를 입력하고 검색 버튼을 클릭 했을 때
      productSearchPriceBtnTag.addEventListener("click", () => {

        // ㅜ 입력한 가격의 범위 안에 해당하는 상품 목록 추출하기
        let resultProducts = new Array();
        const min = productSearchPriceStartTag.value;
        const max = productSearchPriceEndTag.value;
        if (min === "" && max === "") resultProducts = productsData;
        else if (min === "") resultProducts = productsData.filter((el) => el.price <= max);
        else if (max === "") resultProducts = productsData.filter((el) => el.price >= min);
        else {
          resultProducts = productsData.filter((el) => el.price >= min && el.price <= max);
        }
        resultProducts = resultProducts.sort((a, b) => a.price - b.price);

        deleteProductListColTags();
        showResultProducts(resultProducts);
      });

      // ㅜ 신상품순의 버튼을 클릭했을 때
      productSortNewBtnTag.addEventListener("click", () => {
        const resultProducts = productsData.sort((a, b) => b.index - a.index);

        deleteProductListColTags();
        showResultProducts(resultProducts);
      });

      // ㅜ 낮은 가격순의 버튼을 클릭했을 때
      productSortLowPriceBtnTag.addEventListener("click", () => {
        const resultProducts = productsData.sort((a, b) => a.price - b.price);

        deleteProductListColTags();
        showResultProducts(resultProducts);
      });

      // ㅜ 높은 가격순의 버튼을 클릭했을 때
      productSortHighPriceBtnTag.addEventListener("click", () => {
        const resultProducts = productsData.sort((a, b) => b.price - a.price);

        deleteProductListColTags();
        showResultProducts(resultProducts);
      });

      // ㅜ 검색 창에 검색어를 입력하고 검색 버튼을 클릭했을 때
      productSearchKeywordBtnTag.addEventListener("click", () => {
        _lastKeywords();
        searchKeyword();
      });

      // ㅜ 검색 창에 검색어를 입력하고 엔터를 입력했을 때
      productSearchKeywordTag.addEventListener("keypress", (e) => {
        if (e.code === "Enter") {
          _lastKeywords();
          searchKeyword();
        }
      })

      // ㅜ 검색 창의 focus 여부에 따라 최근 검색어 보여주고 숨겨주기
      productSearchKeywordTag.addEventListener("focus", () => {
        productLastKeywordsTag.style.visibility = "visible";
      })
      productSearchKeywordTag.addEventListener("focusout", () => {
        productLastKeywordsTag.style.visibility = "hidden";
      })

      // ㅜ TOP 버튼을 클릭했을 때 검색 관련 태그 숨기기
      topIconTag.addEventListener("click", () => {
        searchTag.style.visibility = "hidden";
      })

      // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 여기서부터 함수 시작 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

      // ㅜ 각 상점별로 상품 목록 분류하는 함수
      function sortByDesignerName(productsData, name) {
        return productsData.filter((el) => el.designerName === name);
      }

      // ㅜ 해당 상점명을 클릭하면 그 상점의 상품 목록을 보여주는 함수
      function showProductList(btnTag, productListTag, products, startIdx) {
        btnTag.addEventListener("click", () => {
          searchTag.style.visibility = "visible";
          deleteProductListColTags();
          createProductList(productListTag, products, startIdx);
        });
      }

      // ㅜ 기존에 생성된 상품 목록에 대한 태그가 있다면 삭제시키는 함수
      function deleteProductListColTags() {
        const allProductListTags = document.querySelectorAll('[class $= "-product-list"]');
        allProductListTags.forEach((el) => {
          if (el.querySelector('.product-list-col') !== null) {
            const _deleteTags = el.querySelectorAll('.product-list-col');
            _deleteTags.forEach((_el) => _el.remove());
          }
        })
      }

      // ㅜ 추출한 상품 목록을 각 상점별로 분류하고 보여주는 함수
      function showResultProducts(resultProducts) {

        // ㅜ 각 상점별로 상품 목록 분류하기
        const AhnResultProducts = sortByDesignerName(resultProducts, "AJY");
        const JuResultProducts = sortByDesignerName(resultProducts, "JBH");
        const JangResultProducts = sortByDesignerName(resultProducts, "JJW");

        // ㅜ 해당 상점명을 클릭하면 그 상점의 상품 목록을 보여주기
        showProductList(AhnShopBtnTag, AhnProductListTag, AhnResultProducts, 0);
        showProductList(JuShopBtnTag, JuProductListTag, JuResultProducts, 0);
        showProductList(JangShopBtnTag, JangProductListTag, JangResultProducts, 0);

        // ㅜ 현재 보고 있는 상점의 상품 목록을 보여주기
        const allSectionsTag = document.querySelector('.all-sections');
        let top = allSectionsTag.style.top;
        top = top.replace("vh", "");
        top = Number(top);

        switch (top) {
          case -100:
            createProductList(AhnProductListTag, AhnResultProducts, 0)
          case -200:
            createProductList(JuProductListTag, JuResultProducts, 0)
          case -300:
            createProductList(JangProductListTag, JangResultProducts, 0)
          default:
            break;
        }
      }

      // ㅜ 상품 목록 관련 HTML 태그를 생성하는 함수
      function createProductList(productListTag, productsData, startIdx) {
        const productListRowTag = productListTag.querySelector('.product-list-row');

        for (const key in productsData) {
          if (Object.hasOwnProperty.call(productsData, key)) {
            if (key < startIdx) {
            } else if (key < startIdx + showProductCount) {
              productListColTags[key] = document.createElement('div');
              productListColTags[key].classList.add('product-list-col');
              productListRowTag.appendChild(productListColTags[key]);

              productContainerTags[key] = document.createElement('div');
              productContainerTags[key].classList.add('product-container');
              productListColTags[key].appendChild(productContainerTags[key]);

              productImgTags[key] = document.createElement('div');
              productImgTags[key].classList.add('product-img');
              productImgTags[key].style.backgroundImage = productsData[key].img;
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
              productNameTags[key].innerHTML = productsData[key].name;
              productBoxTags[key].appendChild(productNameTags[key]);

              productPriceTags[key] = document.createElement('p');
              productPriceTags[key].classList.add('product-price');
              productPriceTags[key].innerHTML = `${productsData[key].price}원`;
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
              cartTotalCountNumberTag.innerHTML = cartTotalCount;
              inCartBtnTags[key].addEventListener("click", () => {

                // ㅜ 장바구니에 담은 상품 수
                cartTotalCount++;
                cartTotalCountNumberTag.innerHTML = cartTotalCount;

                // ㅜ 장바구니에 담은 상품의 합계 금액
                cartTotalAmount += Number(productsData[key].price);
                cartTotalAmountTag.innerHTML = "총 합계 금액: " + cartTotalAmount;

                // ㅜ 클릭한 상품의 태그를 복사한 다음에 삭제하기 버튼으로 바꾸기
                const copyTag = inCartBtnTags[key].closest('.product-list-col').cloneNode(true);
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
          if (document.querySelector('.product-show-more-btn') !== null) {
            document.querySelector('.product-show-more-btn').remove();
          }
          if (productsData.length > startIdx + showProductCount) {
            const productShowMoreBtnTag = document.createElement('input');
            productShowMoreBtnTag.classList.add('product-show-more-btn');
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

      // ㅜ 검색 창의 검색 기능에 대한 함수
      function searchKeyword() {
        deleteProductListColTags();

        // ㅜ 입력된 검색어가 유사 검색어와 일치한다면 해당하는 모든 분류명 추출하기
        let resultProducts = new Array();
        let classification = new Array();
        const inputKeyword = productSearchKeywordTag.value;
        similarKeywords.forEach((el) => {
          if (el.some((_el) => _el === inputKeyword)) {
            classification.push(el[0]);
          }
        });

        // ㅜ 분류명에 해당하는 상품 목록 데이터 추출하기
        classification.forEach((el) => {
          resultProducts = resultProducts.concat(productsData.filter((_el) => _el.classification === el));
        });
        resultProducts.sort((a, b) => a.price - b.price);

        deleteProductListColTags();
        showResultProducts(resultProducts);
      }

      // ㅜ 최근 검색어를 저장하는 함수
      function _lastKeywords() {
        lastKeywords = [...lastKeywords, productSearchKeywordTag.value];

        // ㅜ 중복된 검색어일 경우 기존 검색어를 삭제하고 새로 추가하기
        lastKeywords = lastKeywords.reduce((prev, curr) => {
          if (prev.includes(curr)) {
            prev.splice(prev.indexOf(curr), 1);
          }
          return [...prev, curr];
        }, new Array());

        // ㅜ 최근 검색어가 5개를 넘어가면 첫 번째 검색어부터 삭제하기
        if (lastKeywords.length > 5) {
          while (lastKeywords.length > 5) lastKeywords.shift();
        }

        productLastKeywordsTag.innerHTML = "최근 검색어";
        lastKeywords.forEach((el) => {
          productLastKeywordsTag.innerHTML += `<br>${el}`;
        })
      }
    })();
  }
}

// 07 24 19 수정