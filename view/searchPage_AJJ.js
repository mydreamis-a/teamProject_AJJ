/**
 * 검색 창에 대한 클래스
 */
class Search {
  constructor() { }
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
    <input id="product-keyword" class="cart-input-search-item" type="search" autocomplete="off">
    <input id="product-keyword-btn" class="product-search" type="submit" value="검색">
    <div class="product-keyword-last">최근검색어</div>
    `;
  const mainHeaderTag = document.querySelector(".main-header");
  mainHeaderTag.style.backgroundColor = "white";
  //
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
 */
Search.prototype.saveKeyword = function () {
  //
  const productKeywordBtnTag = document.querySelector("#product-keyword-btn");
  const productKeywordTag = document.querySelector("#product-keyword");
  //
  // ㅜ 검색 창에 검색어를 입력하고 검색 버튼을 클릭했을 때
  productKeywordBtnTag.addEventListener("click", () => {
    //
    if (!productKeywordTag.value) return;
    const keyword = productKeywordTag.value;
    this.saveKeywordAjax(keyword);
  });
  //
  // ㅜ 검색 창에 검색어를 입력하고 엔터를 입력했을 때
  productKeywordTag.addEventListener("keypress", (e) => {
    if (e.code === "Enter") {
      //
      if (!productKeywordTag.value) return;
      const keyword = productKeywordTag.value;
      this.saveKeywordAjax(keyword);
    }
  });
  // function saveKeywordAjax(keyword) {
  //   //
  //   $.ajax({
  //     url: "/keyword/save",
  //     type: "post",
  //     data: { keyword },
  //     //
  //     success: ({ stringKeywords }) => {
  //       log(this)
  //       this._search.createCookie("keyword", stringKeywords, 0.0001);
  //     }
  //   });
  // };
};

/**
 * 검색어를 저장하는 ajax에 대한 함수
 */
Search.prototype.saveKeywordAjax = function (keyword) {
  $.ajax({
    url: "/keyword/save",
    type: "post",
    data: { keyword },
    /**
     * 
     * @param {object} { array or undefined: 쿠키에 들어 있는 최근 검색어 정보 }
     */
    success: ({ keywords }) => {
      if (keywords) {
        const stringKeywords = keywords.join(", ");
        this.createCookie("keyword", stringKeywords, 0.1);
      }
    }
  });
};

////////////////////////////
/**
 * 최근 검색어를 보여주는 함수
 */
Search.prototype.showKeyword = function () {
  //
  const productKeywordTag = document.querySelector("#product-keyword");
  productKeywordTag.addEventListener("focus", () => {
    this.showKeywordAjax();
  });
  //
  productKeywordTag.addEventListener("keyup", (e) => {
    if (e.code === "Enter") this.showKeywordAjax();
  })
};

/**
 * 최근 검색어를 보여주는 ajax에 대한 함수
 */
Search.prototype.showKeywordAjax = function () {
  //
  const productLastKeywordsTag = document.querySelector(".product-keyword-last");
  const productKeywordTag = document.querySelector("#product-keyword");
  const keywords = this.getCookie("keyword");
  $.ajax({
    url: "/keyword/last",
    type: "post",
    data: { keywords },
    /**
     * 비회원일 경우 쿠키에, 로그인한 회원일 경우 DB에 저장 되어 있는 최근 검색어 정보를 보여주는 함수
     * @param {object} { array: 5개의 최근 검색어 정보 } 
     */
    success: ({ keywords }) => {
      //
      productLastKeywordsTag.innerHTML = "최근 검색어";
      keywords.forEach((el) => {
        productLastKeywordsTag.innerHTML += `<br>${el}`;
      });
      productLastKeywordsTag.style.visibility = "visible";
    },
  });
  //
  productKeywordTag.addEventListener("focusout", () => {
    productLastKeywordsTag.style.visibility = "hidden";
  });
};

//////////////////////
/**
 * 쿠키를 생성하는 함수
 * @param {string} name 쿠키의 키 값
 * @param {string} value 쿠키의 value 값
 * @param {number} time 저장 일수
 */
Search.prototype.createCookie = function (name, value, time) {
  //
  const date = new Date();
  date.setTime(date.getTime() + time * 24 * 60 * 60 * 1000);
  //
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/;`;
};

//////////////////////////
/**
 * 쿠키의 값을 조회하는 함수
 * @param {string} name 쿠키의 키 값
 * @returns 쿠키의 value 값
 */
Search.prototype.getCookie = function (name) {
  const value = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  return value ? value[2] : null;
};

////////////////////////////////////////////////////////////////////////
/**
 * 현재 보고 있는 상점의 상품 목록을 정렬하기 위해 어느 상점인지 구별하는 함수
 * @param {string} method 상품 목록의 정렬 방법
 */
Search.prototype.sortProducts = function (method, priceScope) {
  //
  const allSectionsTag = document.querySelector(".all-sections");
  let top = allSectionsTag.style.top;
  const limitCount = 20;
  const skipCount = 0;
  //
  top = top.replace("vh", "");
  top = Number(top);
  switch (top) {
    case -100:
      createProductTagsAjax(method, "ajy", priceScope, skipCount, limitCount);
    case -200:
      createProductTagsAjax(method, "jbh", priceScope, skipCount, limitCount);
    case -300:
      createProductTagsAjax(method, "jjw", priceScope, skipCount, limitCount);
    default:
      break;
  }
};

///////////////////////////
/**
 * 가격 검색 기능에 대한 함수
 * @returns
 */
Search.prototype.searchPriceProducts = function () {
  //
  const productSearchPriceStartTag = document.querySelector("#product-search-price-start");
  const productSearchPriceEndTag = document.querySelector("#product-search-price-end");
  //
  let min = productSearchPriceStartTag.value;
  let max = productSearchPriceEndTag.value;
  //
  if (min < 0 || max < 0) return inputPriceAlert();
  if (max !== "" && max < min) return inputPriceAlert();
  if (min === "" && max === "") return inputPriceAlert();
  //
  if (min === "") {
    productSearchPriceStartTag.value = 0;
    min = 0;
  }
  if (max === "") {
    productSearchPriceEndTag.value = 99999999;
    max = 99999999;
  }
  _search.sortProducts("sortPrice", `${min}/${max}`);
  /**
   * 가격의 범위를 제대로 입력하지 않은 경우에 대한 함수
   */
  function inputPriceAlert() {
    //
    alert("다시 입력해주세요.");
    productSearchPriceEndTag.value = "";
    productSearchPriceStartTag.value = "";
  }
};
//
// 09.03.22 수정
