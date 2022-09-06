/**
 * 상품 검색에 대한 클래스
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
    <label class ="product-search-price-start" for="product-search-price-start">가격 검색</label>
    <input id ="product-search-price-start" class ="product-search" type="number">
    <input id ="product-search-price-end" class ="product-search" type="number">
    <input id ="product-search-price-btn" class ="product-search" type="button" value="검색">
    <input id ="product-sort-new" class ="product-search" type="button" value="신상품순">
    <input id ="product-sort-low-price" class ="product-search" type="button" value="낮은가격순">
    <input id ="product-sort-high-price" class ="product-search" type="button" value="높은가격순">
    <input id ="product-keyword" class ="cart-input-search-item" type="search" autocomplete="off">
    <input id ="product-keyword-btn" class ="product-search" type="submit" value="검색">
    <div class ="product-last-keyword">최근검색어</div>
    `;
  const mainHeaderTag = document.querySelector(".main-header");
  mainHeaderTag.style.backgroundColor = "white";
  //
  // ㅜ TOP 버튼을 클릭 했을 때 검색 창 태그 숨기기
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

/////////////////////////////////////
/**
 * 상품 검색 및 검색어 저장에 대한 함수
 */
Search.prototype.searchKeyword = function () {
  //
  const productKeywordBtnTag = document.querySelector("#product-keyword-btn");
  const productKeywordTag = document.querySelector("#product-keyword");
  //
  // ㅜ 검색 창에 검색어를 입력하고 검색 버튼을 클릭 했을 때
  productKeywordBtnTag.addEventListener("click", () => {
    //
    if (!productKeywordTag.value) return;
    const keyword = String(productKeywordTag.value);
    //
    this.saveKeywordAjax(keyword);
    this.searchProducts(keyword);
  });
  //
  // ㅜ 검색 창에 검색어를 입력하고 엔터를 입력했을 때
  productKeywordTag.addEventListener("keypress", (e) => {
    if (e.code === "Enter") {
      //
      if (!productKeywordTag.value) return;
      const keyword = String(productKeywordTag.value);
      //
      this.saveKeywordAjax(keyword);
      this.searchProducts(keyword);
    }
  });
};

//////////////////////
/**
 * 
 * @param {string} keyword 문자열의 상품 검색어
 */
Search.prototype.searchProducts = function (keyword) {
  //
  const method = "search";
  const priceScope = null;
  this.sortProducts(method, priceScope, keyword);
}

///////////////////////////////////
/**
 * 검색어를 저장하는 ajax에 대한 함수
 * @param {string} keyword 문자열의 상품 검색어
 * @returns {object}
 * keywords 비회원일 경우에 쿠키에 저장되어 있는 최근 검색어에 대한 배열
 */
// 1. 입력된 검색어를 해당 경로로 전송
// 2. 전송 받은 최근 검색어 배열을 문자열로 바꿔서
//    쿠키 생성
Search.prototype.saveKeywordAjax = function (keyword) {
  $.ajax({
    url: "/keyword/save",
    type: "post",
    data: { keyword },
    //
    success: ({ keywords }) => {
      // log(keywords); // 로그인한 회원일 경우 실행되지 않음
      //
      if (keywords) {
        const stringKeywords = keywords.join(", ");
        this.createCookie("keyword", stringKeywords, 0.1);
      }
    },
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
    if (e.code === "Enter") {
      this.showKeywordAjax();
    }
  });
};

///////////////////////////////////////
/**
 * 최근 검색어를 보여주는 ajax에 대한 함수
 * @returns {object}
 * keywords 쿠키 혹은 검색어 테이블에 저장되어 있는 최근 검색어에 대한 배열
 */
// 1. 쿠키에 저장된 최근 검색어 정보를 가져와서
//    해당 경로로 전송
// 2. 전송 받은 최근 검색어의 배열을
//    검색 창 아래에 태그를 생성해서 보여주고
// 3. 해당 검색어에 대한 이벤트 등록
// 4. 최근 검색어 태그 숨김에 대한 이벤트 등록
Search.prototype.showKeywordAjax = function () {
  //
  const productLastKeywordsTag = document.querySelector(".product-last-keyword");
  const productKeywordTag = document.querySelector("#product-keyword");
  const keywords = this.getCookie("keyword");
  $.ajax({
    url: "/keyword/last",
    type: "post",
    data: { keywords },
    //
    success: ({ keywords }) => {
      //
      productLastKeywordsTag.innerHTML = "최근 검색어";
      productLastKeywordsTag.style.display = "block";
      //
      keywords.forEach((el) => {
        productLastKeywordsTag.innerHTML += `<p>${el}</p>`;
      });
      //
      // ㅜ 검색어를 클릭 했을 때 검색 창에 해당 검색어 입력하기
      const productLastKeywordPTag = document.querySelectorAll(".product-last-keyword > p");
      productLastKeywordPTag.forEach((el) => {
        el.addEventListener("click", () => {
          productKeywordTag.value = el.innerHTML;
        });
      });
    },
  });
  // ㅜ 최근 검색어 태그 숨기기
  productKeywordTag.addEventListener("focusout", () => {
    setTimeout(() => {
      productLastKeywordsTag.style.display = "none";
    }, 100);
  });
};

///////////////////////////
/**
 * 가격 검색 기능에 대한 함수
 */
// 1. 희망하는 가격의 범위를 입력하고 검색 버튼을 클릭 했을 때
// 2. 최소 가격과 최대 가격에 모두 빈 값을 입력하거나
//    최소 가격 혹은 최대 가격에 숫자가 아닌 값을 입력하거나
//    최소 가격 혹은 최대 가격에 0보다 작은 수를 입력하거나
//    최대 가격이 최소 가격보다 작다면
//    입력 창의 값을 비우고
//    다시 입력하라는 alert 생성과 함께 return
// 3. 최소 가격 혹은 최대 가격에 빈 값을 입력한 경우
//    0 혹은 99999999 값 입력
// 4. 올바르게 입력했다면
//    sortProducts 함수로
//    조회 시작
Search.prototype.searchPriceProducts = function () {
  //
  const productSearchPriceStartTag = document.querySelector("#product-search-price-start");
  const productSearchPriceEndTag = document.querySelector("#product-search-price-end");
  //
  let min = productSearchPriceStartTag.value;
  let max = productSearchPriceEndTag.value;
  //
  if (min === "" && max === "") {
    return inputPriceAlert();
  }
  if (isNaN(min) || isNaN(max)) {
    return inputPriceAlert();
  }
  if (min < 0 || max < 0) {
    return inputPriceAlert();
  }
  if (max !== "" && max < min) {
    return inputPriceAlert();
  }
  if (min === "") {
    productSearchPriceStartTag.value = 0;
    min = 0;
  }
  if (max === "") {
    productSearchPriceEndTag.value = 99999999;
    max = 99999999;
  }
  const method = "sortPrice";
  const priceScope = `${min}/${max}`;
  this.sortProducts(method, priceScope);

  ////////////////////////////////////////////////////
  /**
   * 가격의 범위를 제대로 입력하지 않았을 경우에 대한 함수
   */
  function inputPriceAlert() {
    //
    alert("다시 입력해주세요.");
    productSearchPriceEndTag.value = "";
    productSearchPriceStartTag.value = "";
  }
};

////////////////////////////////////////////////////////////////////////
/**
 * 현재 보고 있는 상점의 상품 목록을 정렬하기 위해 어느 상점인지 구별하는 함수
 * @param {string} method 상품 목록의 정렬 방법
 * @param {string} priceScope 가격 검색일 경우 입력 범위
 * @param {string} keyword 문자열의 상품 검색어
 */
// ㅜ 역할:
// top 값을 조정하는 단일 홈 페이지
// top 값을 통해 어느 상점인지 구분
// createProductTagsAjax 함수로
// 해당하는 상품 목록의 태그를 생성
Search.prototype.sortProducts = function (method, priceScope, keyword) {
  //
  const allSectionsTag = document.querySelector(".all-sections");
  const top = allSectionsTag.style.top.replace("vh", "");
  const limitCount = 20;
  const skipCount = 0;
  //
  switch (Number(top)) {
    case -100:
      createProductTagsAjax(method, "ajy", priceScope, keyword, skipCount, limitCount);
      break;
    case -200:
      createProductTagsAjax(method, "jbh", priceScope, keyword, skipCount, limitCount);
      break;
    case -300:
      createProductTagsAjax(method, "jjw", priceScope, keyword, skipCount, limitCount);
      break;
    default:
      break;
  }
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
//
// 09.07.00 수정