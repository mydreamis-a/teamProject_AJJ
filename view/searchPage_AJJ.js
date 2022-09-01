/**
 * 검색 창에 대한 클래스
 */
class Search {
  constructor() {}
}

///////////////////////////////////////
/**
 * 검색 창 태그의 생성 및 숨김에 대한 함수
 */
Search.prototype.createSearchTags = function () {
  //
  const width = document.querySelector("[class $= '-product-list']").clientWidth;
  const searchTag = document.querySelector(".search");
  //
  searchTag.style.width = `${this.widthFromPxToVw(width)}vw`;
  searchTag.style.visibility = "visible";
  searchTag.innerHTML = `
    <label class="product-search-price-start" for="product-search-price-start">가격 검색</label>
    <input id="product-search-price-start" class="product-search" type="number">
    <input id="product-search-price-end" class="product-search" type="number">
    <input id="product-search-price-btn" class="product-search" type="button" value="검색">
    <input id="product-sort-new" class="product-search" type="button" value="신상품순">
    <input id="product-sort-low-price" class="product-search" type="button" value="낮은가격순">
    <input id="product-sort-high-price" class="product-search" type="button" value="높은가격순">
    <input id="product-keyword" class="cart-input-search-item" type="search">
    <input name="q" id="product-keyword-btn" class="product-search" type="button" value="검색">
    <div class="product-keyword-last">최근검색어</div>
    `;

  const mainHeaderTag = document.querySelector(".main-header");
  mainHeaderTag.style.backgroundColor = "white";

  // ㅜ TOP 버튼을 클릭했을 때 검색 창 태그 숨기기
  const topIconTag = document.querySelector(".top-icon");
  topIconTag.addEventListener("click", () => {
    //
    searchTag.style.visibility = "hidden";
    mainHeaderTag.style.backgroundColor = "";
  });
};

/////////////////////////////////////////////////
/**
 * px 단위의 너비를 vw 단위의 너비로 반환해주는 함수
 * @param {number} value px 단위의 너비
 * @returns vw 단위의 너비
 */
Search.prototype.widthFromPxToVw = function (value) {
  const bodyWidth = document.querySelector("body").offsetWidth;
  return (value / bodyWidth) * 100;
};

//////////////////////////////////////
/**
 * 검색어 테이블에 검색어를 저장하는 함수
 * @param {*} id 어느 회원인지를 특정하는 id 컬럼의 값
 */
Search.prototype.saveKeyword = function (id) {
  //
  const productKeywordBtnTag = document.querySelector("#product-keyword-btn");
  const productKeywordTag = document.querySelector("#product-keyword");

  // ㅜ 검색 창에 검색어를 입력하고 검색 버튼을 클릭했을 때
  productKeywordBtnTag.addEventListener("click", () => {
    //
    if (!productKeywordTag.value) return;
    this.saveKeywordAjax(id);
  });

  // ㅜ 검색 창에 검색어를 입력하고 엔터를 입력했을 때
  productKeywordTag.addEventListener("keypress", (e) => {
    if (e.code === "Enter") {
      //
      if (!productKeywordTag.value) return;
      this.saveKeywordAjax(id);
    }
  });

  ///////////////////////////////////
  /**
   * 검색어를 저장하는 ajax에 대한 함수
   */
  Search.prototype.saveKeywordAjax = function (id) {
    //
    const keyword = productKeywordTag.value;
    $.ajax({
      url: "/keyword/save",
      type: "post",
      data: { id, keyword },
    });
  };
};

/////////////////////////
/**
 * 최근 검색어에 대한 함수
 * @param {*} id 어느 회원인지를 특정하는 id 컬럼의 값
 */
Search.prototype.showKeyword = function (id) {
  //
  const productLastKeywordsTag = document.querySelector(".product-keyword-last");
  const productKeywordTag = document.querySelector("#product-keyword");
  //
  // ㅜ 검색 창의 focus 여부에 따라 최근 검색어 보여주고 숨겨주기
  productKeywordTag.addEventListener("focus", () => {
    $.ajax({
      url: "/keyword/last",
      type: "post",
      data: { id },
      //
      success: (result) => {
        productLastKeywordsTag.innerHTML = "최근 검색어";
        result.forEach((el) => {
          productLastKeywordsTag.innerHTML += `<br>${el}`;
        });
      },
    });
    productLastKeywordsTag.style.visibility = "visible";
  });

  productKeywordTag.addEventListener("focusout", () => {
    productLastKeywordsTag.style.visibility = "hidden";
  });
};

////////////////////////////////////////////////////////////////////////
/**
 * 현재 보고 있는 상점의 상품 목록을 정렬하기 위해 어느 상점인지 구별하는 함수
 * @param {string} method 상품 목록의 정렬 방법
 */
Search.prototype.sortProducts = function (method) {
  //
  const allSectionsTag = document.querySelector(".all-sections");
  let top = allSectionsTag.style.top;
  top = top.replace("vh", "");
  top = Number(top);

  switch (top) {
    case -100:
      createProductTagsAjax(`/${method}/ajy`);
    case -200:
      createProductTagsAjax(`/${method}/jbh`);
    case -300:
      createProductTagsAjax(`/${method}/jjw`);
    default:
      break;
  }
};

// 08.31.16 수정
