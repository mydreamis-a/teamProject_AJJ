// ㅜ json 파일에서 상품 목록의 데이터를 가져오는 함수
function productData() {
  return fetch("/json/productData.json")
    .then((resolve) => resolve.json())
    .then((json) => json.productInfor)
    .catch((reject) => {
      console.log("가져오기 실패");
    });
}

(async () => {
  await productData().then((result) => {
    const productData = [...result];

    for (const key in productData) {
      if (Object.hasOwnProperty.call(productData, key)) {
        const AhnProduct = productData.filter((el) => el.designName === "ajy");
        const JuProduct = productData.filter((el) => el.designName === "jbh");
        const JangProduct = productData.filter((el) => el.designName === "jjw");
      }
    }
  });
})();

//     jbhwhosProduct = whosProduct.filter((a) => {
//       return a.designName == "jbh"
//     })

//     // cartFirstPriceSearch = document.getElementById("cartFirstPriceSearch").value;
//     // cartSecondPriceSearch = document.getElementById("cartSecondPriceSearch").value;

//     cartUserSearchPriceInfor = jbhwhosProduct.filter(function (data) {
//       return cartFirstPriceSearch.value <= data.price && cartSecondPriceSearch.value >= data.price
//     })
//     cartUserSearchPriceInfor.sort((a, b) => {
//       return a.price - b.price;
//     })
//     _productListTags(cartUserSearchPriceInfor);
//     cartListAppendJbh(cartUserSearchPriceInfor);
//   })

//   cartUserSearchPriceInfor = 0;

//   productData().then((whosProduct) => {

//     jjwwhosProduct = whosProduct.filter((a) => {
//       return a.designName == "jjw"
//     })
//     while (document.querySelector("#jjw-search-list-container").hasChildNodes()) {
//       document.querySelector("#jjw-search-list-container").removeChild(document.querySelector("#jjw-search-list-container").firstChild);
//     }

//     // cartFirstPriceSearch = document.getElementById("cartFirstPriceSearch").value;
//     // cartSecondPriceSearch = document.getElementById("cartSecondPriceSearch").value;

//     cartUserSearchPriceInfor = jjwwhosProduct.filter(function (data) {
//       return cartFirstPriceSearch.value <= data.price && cartSecondPriceSearch.value >= data.price
//     })
//     cartUserSearchPriceInfor.sort((a, b) => {
//       return a.price - b.price;
//     })
//     _productListTags(cartUserSearchPriceInfor);
//     cartListAppendJjw(cartUserSearchPriceInfor);
//   })
//   cartUserSearchPriceInfor = 0;

//   productData().then((whosProduct) => {

//     ajywhosProduct = whosProduct.filter((a) => {
//       return a.designName == "ajy"
//     })
//     while (document.querySelector("#ajy-search-list-container").hasChildNodes()) {
//       document.querySelector("#ajy-search-list-container").removeChild(document.querySelector("#ajy-search-list-container").firstChild);
//     }

//     // cartFirstPriceSearch = document.getElementById("cartFirstPriceSearch").value;
//     // cartSecondPriceSearch = document.getElementById("cartSecondPriceSearch").value;

//     cartUserSearchPriceInfor = ajywhosProduct.filter(function (data) {
//       return cartFirstPriceSearch.value <= data.price && cartSecondPriceSearch.value >= data.price
//     })
//     cartUserSearchPriceInfor.sort((a, b) => {
//       return a.price - b.price;
//     })
//     _productListTags(cartUserSearchPriceInfor);
//     cartListAppendAjy(cartUserSearchPriceInfor);
//   })
// })

//주병현 숖 홈페이지
let jbhwhosProduct;
//장지원 숖 홈페이지
let jjwwhosProduct;
//안주영 숖 홈페이지
let ajywhosProduct;

const showCount = 20;

//주병현 더보기 숫자 카운트
let cartCurrentListCountjbh = 0;
let cartShowListCountjbh = showCount;
//장지원 더보기 숫자 카운트
let cartCurrentListCountjjw = 0;
let cartShowListCountjjw = showCount;
//안주영 더보기 숫자 카운트
let cartCurrentListCountajy = 0;
let cartShowListCountajy = showCount;

//새상품순을 눌렀을때
let cartNewProductInfor;

// ㅜ 상품 목록의 전체 태그 배열
const productListTags = ["cartListCol", "cartContainer", "cartPicture", "cartFirstText", "cartPicHover", "cartBody", "cartName", "cartSecondText", "cartBtnContainer", "cartBtnGroup", "cartBtnGetList", "cartBtnShowList"];
productListTags.forEach((el) => {
  window[el] = new Array();
});

//장바구니에 담은 리스트 선언
const basketRowTag = document.getElementById("cart-Buy-list-row");
let cartCurrentBuyListCount = 0;
//유저가 선택한 장바구니 배열선언(왜? 총합을 구할거기 때문에. 게다가 빼야할때도 있기 때문)

// ㅜ 장바구니 목록의 태그 배열
let shoppingBasketPriceResult = 0;
const shoppingBasketTags = ["shoppingBasketPrice", "cartBuyListCol", "cartBuyContainer", "cartBuyPicture", "cartBuyFirstText", "cartBuyPicHover", "cartBuyBody", "cartBuyName", "cartBuySecondText", "cartBuyBtnContainer", "cartBuyBtnGroup", "basketDeleteBtn", "cartBuyBtnShowList", "cartListPText"];
shoppingBasketTags.forEach((el) => {
  window[el] = new Array();
});

// ㅜ 상품 목록의 배열 초기화에 대한 함수 정의
function resetProductList() {
  productListTags.forEach((el) => {
    window[el] = new Array();
  });
}

const searchInputTag = document.querySelector("#search-input");

//검색을 위한 input값 넣어주기
// let cartSearchText = document.getElementById("cartSearchText").value;

//가격검색 제이슨 임시 변수
let cartUserSearchPriceInfor;
//상품검색 제이슨 임시 변수
let whosProductSearch;

//최근검색어의 부모태그를 만들어줌
let cartSearchLink = new Array();
let cartSearchChild = new Array();
let cartSearchTextArr = new Array();
let cartSearchTextLast = new Array();
let cartSearchFirst = 0;

//모달 변수
let cartModal = document.querySelector(".cart-modal");
// let cartListOut = document.getElementById("cartListOut");
let btnCartList = document.querySelector(".cart-btn-cart-list");

//검색기능 버튼 눌렀을때 필요한 변수
// let cartFirstPriceSearch = document.getElementById("cartFirstPriceSearch").value;
// let cartSecondPriceSearch = document.getElementById("cartSecondPriceSearch").value;

// 버튼을 꼭 3개로 해야할까? 만약 상점을 반드시 3개로 분할해야 한다면 버튼도 당연히 그래야겠지..
// 하지만 어차피 데이터는 json에서 나눠져 있기 때문에 상품 목록의 배열을 하나만 사용한다면 얘기는 달라지겠지?

// ㅜ 더보기 버튼 모음
const btns = ["cartMoreShowBtnajy", "cartMoreShowBtnjbh", "cartMoreShowBtnjjw"];
btns.forEach((el) => {
  window[el] = document.createElement("input");
  window[el].setAttribute("type", "button");
  window[el].setAttribute("value", "더보기");
});

//유저의 총 합계금액 구하기 위해 필요한 태그 생성
let cartListSum = document.createElement("div");
cartListSum.classList.add("cart-list-sum");
let cartSumPrice = document.createElement("p");
cartSumPrice.classList.add("cart-sum-price");
cartSumPrice.innerHTML = "총 합계금액" + shoppingBasketPriceResult;

let shoppingBasketCount = 0;
document.querySelector(".wrapper").style.visibility = "hidden";
document.querySelector(".cart-search-text-body").style.visibility = "hidden";

// ㅜ 상품 목록의 데이터를 불러와서 html상의 태그로 보여주는 함수
function _productListTags(whosProduct) {
  resetProductList();

  for (const key in whosProduct) {
    if (Object.hasOwnProperty.call(whosProduct, key)) {
      cartListCol[key] = document.createElement("div");
      cartListCol[key].classList.add("cart-listCol");

      cartContainer[key] = document.createElement("div");
      cartContainer[key].classList.add("cart-container");

      cartPicture[key] = document.createElement("div");
      cartPicture[key].classList.add("cart-pic");
      cartPicture[key].style.backgroundImage = whosProduct[key].img;

      cartFirstText[key] = document.createElement("div");
      cartFirstText[key].classList.add("cart-div-text");

      cartPicHover[key] = document.createElement("p");
      cartPicHover[key].classList.add("cart-pic-bicHover");
      cartPicHover[key].innerHTML = "사진 크게보기";

      cartBody[key] = document.createElement("div");
      cartBody[key].classList.add("cart-body");

      cartName[key] = document.createElement("p");
      cartName[key].classList.add("cart-name");
      cartName[key].innerHTML = whosProduct[key].name;
      cartSecondText[key] = document.createElement("p");
      cartSecondText[key].classList.add("cart-text");
      cartSecondText[key].innerHTML = whosProduct[key].price + "원";

      cartBtnContainer[key] = document.createElement("div");
      cartBtnContainer[key].classList.add("cart-btn-container");

      cartBtnGroup[key] = document.createElement("div");
      cartBtnGroup[key].classList.add("cart-btn-group");

      cartBtnGetList[key] = document.createElement("input");
      cartBtnGetList[key].setAttribute("type", "button");
      cartBtnGetList[key].setAttribute("value", "장바구니에 담기");
      cartBtnGetList[key].classList.add("cart-btn");
      cartBtnGetList[key].id = "cartBtnGetList" + [key];
      cartBtnShowList[key] = document.createElement("input");
      cartBtnShowList[key].setAttribute("type", "button");
      cartBtnShowList[key].setAttribute("value", "상품 보기");
      cartBtnShowList[key].classList.add("cart-btn");
      cartBtnShowList[key].id = "cartBtnShowList" + [key];

      // ㅜ 장바구니에 담기 버튼을 클릭했을 때 장바구니 모달 창에 대한 태그 생성하기
      cartBtnGetList[key].addEventListener("click", () => {
        if (shoppingBasketCount <= 0) {
          document.querySelector(".wrapper").style.visibility = "";
        }

        // cartBuyListCol[key] = document.createElement("div");
        // cartBuyListCol[key].classList.add("cart-listCol");
        // cartBuyListRow.appendChild(cartBuyListCol[key]);

        // cartBuyContainer[key] = document.createElement("div");
        // cartBuyContainer[key].classList.add("cart-container");
        // cartBuyListCol[key].appendChild(cartBuyContainer[key]);

        // cartBuyPicture[key] = document.createElement("div");
        // cartBuyPicture[key].classList.add("cart-pic");
        // cartBuyPicture[key].style.backgroundImage = whosProduct[key].img;
        // cartBuyContainer[key].appendChild(cartBuyPicture[key]);

        // cartBuyFirstText[key] = document.createElement("div");
        // cartBuyFirstText[key].classList.add("cart-div-text");
        // cartBuyPicture[key].appendChild(cartBuyFirstText[key]);

        // cartBuyPicHover[key] = document.createElement("p");
        // cartBuyPicHover[key].classList.add("cart-pic-bicHover");
        // cartBuyPicHover[key].innerHTML = "사진 크게보기";
        // cartBuyFirstText[key].appendChild(cartBuyPicHover[key]);

        // cartBuyBody[key] = document.createElement("div");
        // cartBuyBody[key].classList.add("cart-body");
        // cartBuyPicture[key].after(cartBuyBody[key]);

        // cartBuyName[key] = document.createElement("p");
        // cartBuyName[key].classList.add("cart-name");
        // cartBuyName[key].innerHTML = whosProduct[key].name;
        // cartBuyBody[key].appendChild(cartBuyName[key]);

        // cartBuySecondText[key] = document.createElement("p");
        // cartBuySecondText[key].classList.add("cart-text");
        // cartBuySecondText[key].innerHTML = whosProduct[key].price + "원";
        // cartBuyName[key].after(cartBuySecondText[key]);

        // cartBuyBtnContainer[key] = document.createElement("div");
        // cartBuyBtnContainer[key].classList.add("cart-btn-container");
        // cartBuySecondText[key].after(cartBuyBtnContainer[key]);

        // cartBuyBtnGroup[key] = document.createElement("div");
        // cartBuyBtnGroup[key].classList.add("cart-btn-group");
        // cartBuyBtnContainer[key].appendChild(cartBuyBtnGroup[key]);

        // ㅜ 태그 복사 및 장바구니에 담기 버튼을 삭제하기 버튼으로 바꾸기
        const copyTag = cartBtnGetList[key].closest(".cart-listCol").cloneNode(true);
        const basketDeleteBtnTag = copyTag.querySelector(`#cartBtnGetList${key}`);
        basketDeleteBtnTag.id = `basket-delete-btn${key}`;
        basketDeleteBtnTag.setAttribute("value", "삭제하기");
        basketDeleteBtnTag.classList.add("cart-btn");
        basketRowTag.appendChild(copyTag);

        // document
        //   .querySelector(".cart-list-text")
        //   .appendChild(cartListPText[key]);

        // shoppingBasketPrice[key] = whosProduct[key].price;
        // cartListPText[key].style.visibility = "hidden";
        shoppingBasketCount++;
        document.querySelector(".circleNumber").innerHTML = shoppingBasketCount;

        //장바구니 총 합계금액
        cartSumPrice.innerHTML = "총 합계금액" + shoppingBasketPriceResult;
        cartBuyListRow.after(cartListSum);
        cartListSum.appendChild(cartSumPrice);
        // document.querySelector("#cart-Buy-list-row").removeChild(cartBuyListCol[key]);
        // cartListPText.splice(cartListPText[key], 1);
        // document.querySelector(".cart-list-text").removeChild(document.querySelector(".cartListPText" + [key]));
        // shoppingBasketCount = shoppingBasketCount - 1;
        // document.querySelector(".circleNumber").innerHTML = shoppingBasketCount;

        //삭제하기 버튼을 눌렀을때
        basketDeleteBtnTag.addEventListener("click", () => {
          basketDeleteBtnTag.closest(".cart-listCol").remove();
          shoppingBasketPriceResult = shoppingBasketPriceResult - shoppingBasketPrice[btnCartListIndex];
          shoppingBasketPrice.splice(btnCartListIndex, 1);

          //장바구니 총 합계금액
          cartSumPrice.innerHTML = "총 합계금액" + shoppingBasketPriceResult;
          cartBuyListRow.after(cartListSum);
          cartListSum.appendChild(cartSumPrice);
          document.querySelector("#cart-Buy-list-row").removeChild(cartBuyListCol[btnCartListIndex]);
          cartListPText.splice(cartListPText[btnCartListIndex], 1);
          document.querySelector(".cart-list-text").removeChild(document.querySelector(".cartListPText" + [btnCartListIndex]));
          shoppingBasketCount = shoppingBasketCount - 1;
          document.querySelector(".circleNumber").innerHTML = shoppingBasketCount;
        });
        //모달 안에 장바구니 주문을 취소했을때
        cartListOut.addEventListener("click", () => {
          cartModal.style.display = "none";
        });
      });
    }
  }
}

//속성과 값을 가진 태그들을 쏴주는거
function cartListAppendJbh(jbhwhosProduct) {
  while (cartCurrentListCountjbh < jbhwhosProduct.length) {
    let cartListIndex = cartCurrentListCountjbh;
    cartSearchListContainer.appendChild(cartListCol[cartListIndex]);
    cartListCol[cartListIndex].appendChild(cartContainer[cartListIndex]);
    cartContainer[cartListIndex].appendChild(cartPicture[cartListIndex]);
    cartPicture[cartListIndex].appendChild(cartFirstText[cartListIndex]);
    cartFirstText[cartListIndex].appendChild(cartPicHover[cartListIndex]);
    cartPicture[cartListIndex].after(cartBody[cartListIndex]);
    cartBody[cartListIndex].appendChild(cartName[cartListIndex]);
    cartName[cartListIndex].after(cartSecondText[cartListIndex]);
    cartSecondText[cartListIndex].after(cartBtnContainer[cartListIndex]);
    cartBtnContainer[cartListIndex].appendChild(cartBtnGroup[cartListIndex]);
    cartBtnGroup[cartListIndex].appendChild(cartBtnGetList[cartListIndex]);
    cartBtnGetList[cartListIndex].after(cartBtnShowList[cartListIndex]);
    cartCurrentListCountjbh++;
    if (cartCurrentListCountjbh == cartShowListCountjbh) {
      cartSearchListContainer.after(cartMoreShowBtnjbh);
      if (cartCurrentListCountjbh == jbhwhosProduct.length) {
        cartMoreShowBtnjbh.remove();
      }
      break;
    }
  }
}

//초기 상품목록 더보기 버튼을 눌렀을때
cartMoreShowBtnjbh.addEventListener("click", () => {
  cartShowListCountjbh += showCount;
  _productListTags(jbhwhosProduct);
  cartListAppendJbh(jbhwhosProduct);
});

//속성과 값을 가진 태그들을 쏴주는거
function cartListAppendAjy(ajywhosProduct) {
  while (cartCurrentListCountajy < ajywhosProduct.length) {
    let cartListIndex = cartCurrentListCountajy;
    document.querySelector("#ajy-search-list-container").appendChild(cartListCol[cartListIndex]);
    cartListCol[cartListIndex].appendChild(cartContainer[cartListIndex]);
    cartContainer[cartListIndex].appendChild(cartPicture[cartListIndex]);
    cartPicture[cartListIndex].appendChild(cartFirstText[cartListIndex]);
    cartFirstText[cartListIndex].appendChild(cartPicHover[cartListIndex]);
    cartPicture[cartListIndex].after(cartBody[cartListIndex]);
    cartBody[cartListIndex].appendChild(cartName[cartListIndex]);
    cartName[cartListIndex].after(cartSecondText[cartListIndex]);
    cartSecondText[cartListIndex].after(cartBtnContainer[cartListIndex]);
    cartBtnContainer[cartListIndex].appendChild(cartBtnGroup[cartListIndex]);
    cartBtnGroup[cartListIndex].appendChild(cartBtnGetList[cartListIndex]);
    cartBtnGetList[cartListIndex].after(cartBtnShowList[cartListIndex]);
    cartCurrentListCountajy++;
    if (cartCurrentListCountajy == cartShowListCountajy) {
      document.querySelector("#ajy-search-list-container").after(cartMoreShowBtnajy);
      break;
    }
    if (cartCurrentListCountajy == ajywhosProduct.length) {
      cartMoreShowBtnajy.remove();
    }
  }
}

//초기 상품목록 더보기 버튼을 눌렀을때
cartMoreShowBtnajy.addEventListener("click", () => {
  cartShowListCountajy += showCount;
  _productListTags(ajywhosProduct);
  cartListAppendAjy(ajywhosProduct);
  //80개가 다 됐을때 더보기 버튼 삭제
});

//속성과 값을 가진 태그들을 쏴주는거
function cartListAppendJjw(jjwwhosProduct) {
  while (cartCurrentListCountjjw < jjwwhosProduct.length) {
    let cartListIndex = cartCurrentListCountjjw;
    document.querySelector("#jjw-search-list-container").appendChild(cartListCol[cartListIndex]);
    cartListCol[cartListIndex].appendChild(cartContainer[cartListIndex]);
    cartContainer[cartListIndex].appendChild(cartPicture[cartListIndex]);
    cartPicture[cartListIndex].appendChild(cartFirstText[cartListIndex]);
    cartFirstText[cartListIndex].appendChild(cartPicHover[cartListIndex]);
    cartPicture[cartListIndex].after(cartBody[cartListIndex]);
    cartBody[cartListIndex].appendChild(cartName[cartListIndex]);
    cartName[cartListIndex].after(cartSecondText[cartListIndex]);
    cartName[cartListIndex].classList.add("NewBtn");
    cartSecondText[cartListIndex].after(cartBtnContainer[cartListIndex]);
    cartBtnContainer[cartListIndex].appendChild(cartBtnGroup[cartListIndex]);
    cartBtnGroup[cartListIndex].appendChild(cartBtnGetList[cartListIndex]);
    cartBtnGetList[cartListIndex].after(cartBtnShowList[cartListIndex]);
    cartCurrentListCountjjw++;
    if (cartCurrentListCountjjw == cartShowListCountjjw) {
      let jjwFirstInforText = document.createElement("span");
      jjwFirstInforText.innerHTML = "1차 커뮤니티 상품은<br>'유일하게 개발된 타임머신'<br><br>기부 상품은 댓글과 좋아요로 자유롭게 소통할 수 있는 커뮤니티 공간이며 해당 상품의 판매 수익은 전액 기부됩니다.";
      jjwFirstInforText.classList.add("jjw-first-infor-text");
      cartPicture[0].style.position = "relative";
      cartPicture[0].style.backgroundColor = "skyblue";
      cartPicture[0].style.backgroundImage = "";
      cartFirstText[0].after(jjwFirstInforText);
      document.querySelector("#jjw-search-list-container").after(cartMoreShowBtnjjw);
      break;
    }
    if (cartCurrentListCountjjw == jjwwhosProduct.length) {
      cartMoreShowBtnjjw.remove();
    }
  }
}
//초기 상품목록 더보기 버튼을 눌렀을때
cartMoreShowBtnjjw.addEventListener("click", () => {
  cartShowListCountjjw += showCount;
  _productListTags(jjwwhosProduct);
  cartListAppendJjw(jjwwhosProduct);
});

// ㅜ 장바구니 아이콘을 클릭했을 때
document.querySelector(".shopping-icon").addEventListener("click", () => {
  cartModal.style.display = "block";
});

//가격검색버튼을 눌렀을때
cartSearchBtn.addEventListener("click", () => {
  cartCurrentListCountjbh = 0;
  cartShowListCountjbh = showCount;
  cartCurrentListCountjjw = 0;
  cartShowListCountjjw = showCount;
  cartCurrentListCountajy = 0;
  cartShowListCountajy = showCount;

  while (cartSearchListContainer.hasChildNodes()) {
    cartSearchListContainer.removeChild(cartSearchListContainer.firstChild);
  }

  productData().then((whosProduct) => {
    jbhwhosProduct = whosProduct.filter((a) => {
      return a.designName == "jbh";
    });

    // cartFirstPriceSearch = document.getElementById("cartFirstPriceSearch").value;
    // cartSecondPriceSearch = document.getElementById("cartSecondPriceSearch").value;

    cartUserSearchPriceInfor = jbhwhosProduct.filter(function (data) {
      return cartFirstPriceSearch.value <= data.price && cartSecondPriceSearch.value >= data.price;
    });
    cartUserSearchPriceInfor.sort((a, b) => {
      return a.price - b.price;
    });
    _productListTags(cartUserSearchPriceInfor);
    cartListAppendJbh(cartUserSearchPriceInfor);
  });

  cartUserSearchPriceInfor = 0;

  productData().then((whosProduct) => {
    jjwwhosProduct = whosProduct.filter((a) => {
      return a.designName == "jjw";
    });
    while (document.querySelector("#jjw-search-list-container").hasChildNodes()) {
      document.querySelector("#jjw-search-list-container").removeChild(document.querySelector("#jjw-search-list-container").firstChild);
    }

    // cartFirstPriceSearch = document.getElementById("cartFirstPriceSearch").value;
    // cartSecondPriceSearch = document.getElementById("cartSecondPriceSearch").value;

    cartUserSearchPriceInfor = jjwwhosProduct.filter(function (data) {
      return cartFirstPriceSearch.value <= data.price && cartSecondPriceSearch.value >= data.price;
    });
    cartUserSearchPriceInfor.sort((a, b) => {
      return a.price - b.price;
    });
    _productListTags(cartUserSearchPriceInfor);
    cartListAppendJjw(cartUserSearchPriceInfor);
  });
  cartUserSearchPriceInfor = 0;

  productData().then((whosProduct) => {
    ajywhosProduct = whosProduct.filter((a) => {
      return a.designName == "ajy";
    });
    while (document.querySelector("#ajy-search-list-container").hasChildNodes()) {
      document.querySelector("#ajy-search-list-container").removeChild(document.querySelector("#ajy-search-list-container").firstChild);
    }

    // cartFirstPriceSearch = document.getElementById("cartFirstPriceSearch").value;
    // cartSecondPriceSearch = document.getElementById("cartSecondPriceSearch").value;

    cartUserSearchPriceInfor = ajywhosProduct.filter(function (data) {
      return cartFirstPriceSearch.value <= data.price && cartSecondPriceSearch.value >= data.price;
    });
    cartUserSearchPriceInfor.sort((a, b) => {
      return a.price - b.price;
    });
    _productListTags(cartUserSearchPriceInfor);
    cartListAppendAjy(cartUserSearchPriceInfor);
  });
});

//낮은 가격순 눌렀을때
cartRowSearchPrice.addEventListener("click", () => {
  cartCurrentListCountjbh = 0;
  cartShowListCountjbh = showCount;
  cartCurrentListCountjjw = 0;
  cartShowListCountjjw = showCount;
  cartCurrentListCountajy = 0;
  cartShowListCountajy = showCount;
  while (cartSearchListContainer.hasChildNodes()) {
    cartSearchListContainer.removeChild(cartSearchListContainer.firstChild);
  }

  productData().then((whosProduct) => {
    jbhwhosProduct = whosProduct.filter((a) => {
      return a.designName == "jbh";
    });

    jbhwhosProduct.sort(function (a, b) {
      return a.price - b.price;
    });
    _productListTags(jbhwhosProduct);
    cartListAppendJbh(jbhwhosProduct);
  });

  while (cartSearchListContainer.hasChildNodes()) {
    cartSearchListContainer.removeChild(cartSearchListContainer.firstChild);
  }
  productData().then((whosProduct) => {
    jjwwhosProduct = whosProduct.filter((a) => {
      return a.designName == "jjw";
    });

    jjwwhosProduct.sort(function (a, b) {
      return a.price - b.price;
    });
    _productListTags(jjwwhosProduct);
    cartListAppendJjw(jjwwhosProduct);
  });

  while (cartSearchListContainer.hasChildNodes()) {
    cartSearchListContainer.removeChild(cartSearchListContainer.firstChild);
  }
  productData().then((whosProduct) => {
    ajywhosProduct = whosProduct.filter((a) => {
      return a.designName == "ajy";
    });

    ajywhosProduct.sort(function (a, b) {
      return a.price - b.price;
    });
    _productListTags(ajywhosProduct);
    cartListAppendAjy(ajywhosProduct);
  });
});

//높은 가격순 눌렀을때
cartHighSearchPrice.addEventListener("click", () => {
  cartCurrentListCountjbh = 0;
  cartShowListCountjbh = showCount;
  cartCurrentListCountjjw = 0;
  cartShowListCountjjw = showCount;
  cartCurrentListCountajy = 0;
  cartShowListCountajy = showCount;
  while (document.querySelector("#jjw-search-list-container").hasChildNodes()) {
    document.querySelector("#jjw-search-list-container").removeChild(document.querySelector("#jjw-search-list-container").firstChild);
  }
  productData().then((whosProduct) => {
    jbhwhosProduct = whosProduct.filter((a) => {
      return a.designName == "jbh";
    });

    jbhwhosProduct.sort(function (a, b) {
      return b.price - a.price;
    });
    _productListTags(jbhwhosProduct);
    cartListAppendJbh(jbhwhosProduct);
  });

  while (cartSearchListContainer.hasChildNodes()) {
    cartSearchListContainer.removeChild(cartSearchListContainer.firstChild);
  }
  productData().then((whosProduct) => {
    jjwwhosProduct = whosProduct.filter((a) => {
      return a.designName == "jjw";
    });
    jjwwhosProduct.sort(function (a, b) {
      return b.price - a.price;
    });
    _productListTags(jjwwhosProduct);
    cartListAppendJjw(jjwwhosProduct);
  });
  while (document.querySelector("#ajy-search-list-container").hasChildNodes()) {
    document.querySelector("#ajy-search-list-container").removeChild(document.querySelector("#ajy-search-list-container").firstChild);
  }
  productData().then((whosProduct) => {
    ajywhosProduct = whosProduct.filter((a) => {
      return a.designName == "ajy";
    });

    ajywhosProduct.sort(function (a, b) {
      return b.price - a.price;
    });
    _productListTags(ajywhosProduct);
    cartListAppendAjy(ajywhosProduct);
  });
});

//상품검색을 위한 태그 쏴주기
cartSearchTextBtn.addEventListener("click", () => {
  cartCurrentListCountjbh = 0;
  cartShowListCountjbh = showCount;
  cartCurrentListCountjjw = 0;
  cartShowListCountjjw = showCount;
  cartCurrentListCountajy = 0;
  cartShowListCountajy = showCount;
  // cartSearchText = document.getElementById("cartSearchText").value;
  cartSearchTextArr.push(searchInputTag.value);
  cartSearchTextLast.unshift(cartSearchTextArr[cartSearchTextArr.length - 1]);

  while (cartSearchListContainer.hasChildNodes()) {
    cartSearchListContainer.removeChild(cartSearchListContainer.firstChild);
  }

  const pantsKeywords = ["pants", "바지", "팬츠"];
  const leggingsKeywords = ["leggings", "레깅스"];
  const shoesKeywords = ["shoes", "신발", "슈즈"];
  const setKeywords = ["set", "세트"];
  const bagKeywords = ["bag", "가방", "백", "샤넬", "샤넬백"];
  const musicalKeywords = ["musical", "뮤지컬", "연극", "music", "뮤직", "음악"];
  const musicKeywords = ["music", "뮤직", "음악", "뮤지컬"];
  const classicalMusicKeywords = ["classical music", "classical", "클래식", "music", "뮤직", "음악"];
  const breadKeywords = ["bread", "빵", "포켓몬", "poketmon", "포켓몬빵"];
  const figureKeywords = ["figure", "피규어", "포켓몬", "poketmon", "헬창"];

  // ㅜ 사용자의 검색어와 키워드 배열의 요소와의 일치 여부를 확인하는 함수
  function checkKeywords(searchInput, keywords) {
    return keywords.some((el) => el === searchInput);
  }

  productData().then((whosProduct) => {
    jbhwhosProduct = whosProduct.filter((a) => {
      return a.designName == "jbh";
    });
    if (searchInputTag.value == "") {
      _productListTags(jbhwhosProduct);
      cartListAppendJbh(jbhwhosProduct);
      searchInputTag.value = alert("검색어를 입력해주세요");
    } else if (checkKeywords(searchInputTag.value, pantsKeywords)) {
      searchInputTag.value = "pants";
    } else if (checkKeywords(searchInputTag.value, leggingsKeywords)) {
      searchInputTag.value = "leggings";
    } else if (checkKeywords(searchInputTag.value, shoesKeywords)) {
      searchInputTag.value = "shoes";
    } else if (checkKeywords(searchInputTag.value, setKeywords)) {
      searchInputTag.value = "set";
    } else if (checkKeywords(searchInputTag.value, bagKeywords)) {
      searchInputTag.value = "bag";
    }
    whosProductSearch = jbhwhosProduct.filter(function (data) {
      return data.classification === searchInputTag.value;
    });
    _productListTags(whosProductSearch);
    cartListAppendJbh(whosProductSearch);
  });

  whosProductSearch = 0;

  while (document.querySelector("#jjw-search-list-container").hasChildNodes()) {
    document.querySelector("#jjw-search-list-container").removeChild(document.querySelector("#jjw-search-list-container").firstChild);
  }

  productData().then((whosProduct) => {
    jjwwhosProduct = whosProduct.filter((a) => {
      return a.designName == "jjw";
    });
    if (searchInputTag.vaule == "") {
      _productListTags(jjwwhosProduct);
      cartListAppendJjw(jjwwhosProduct);
      searchInputTag.vaule = alert("검색어를 입력해주세요!");
    } else if (checkKeywords(searchInputTag.value, musicalKeywords)) {
      searchInputTag.vaule = "musical";
    } else if (checkKeywords(searchInputTag.value, musicKeywords)) {
      searchInputTag.vaule = "music";
    } else if (checkKeywords(searchInputTag.value, classicalMusicKeywords)) {
      searchInputTag.vaule = "classical music";
    }
    whosProductSearch = jjwwhosProduct.filter(function (data) {
      return data.classification === searchInputTag.vaule;
    });
    _productListTags(whosProductSearch);
    cartListAppendJjw(whosProductSearch);
  });
  whosProductSearch = 0;

  while (document.querySelector("#ajy-search-list-container").hasChildNodes()) {
    document.querySelector("#ajy-search-list-container").removeChild(document.querySelector("#ajy-search-list-container").firstChild);
  }

  productData().then((whosProduct) => {
    ajywhosProduct = whosProduct.filter((a) => {
      return a.designName == "ajy";
    });
    if (searchInputTag.value == "") {
      _productListTags(ajywhosProduct);
      cartListAppendAjy(ajywhosProduct);
      searchInputTag.value = alert("검색어를 입력해주세요!");
    } else if (checkKeywords(searchInputTag.value, breadKeywords)) {
      searchInputTag.value = "bread";
    } else if (checkKeywords(searchInputTag.value, figureKeywords)) {
      searchInputTag.value = "figure";
    }
    whosProductSearch = ajywhosProduct.filter(function (data) {
      return data.classification === searchInputTag.value;
    });
    _productListTags(whosProductSearch);
    cartListAppendAjy(whosProductSearch);
  });
  whosProductSearch = 0;
  while (document.querySelector(".cart-search-text-body").hasChildNodes()) {
    document.querySelector(".cart-search-text-body").removeChild(document.querySelector(".cart-search-text-body").firstChild);
  }
});

//상품검색 입력란을 클릭했을때
searchInputTag.addEventListener("click", () => {
  cartCurrentListCountjbh = 0;
  cartShowListCountjbh = showCount;
  cartCurrentListCountjjw = 0;
  cartShowListCountjjw = showCount;
  cartCurrentListCountajy = 0;
  cartShowListCountajy = showCount;
  document.querySelector(".cart-search-text-body").innerHTML = "최근검색어";
  while (cartSearchFirst < cartSearchTextLast.length) {
    cartSearchLink[cartSearchFirst] = document.createElement("a");
    cartSearchLink[cartSearchFirst].classList.add("cart-search-link");
    cartSearchLink[cartSearchFirst].setAttribute("href", "");
    cartSearchLink[cartSearchFirst].id = "cartSearchLink" + [cartSearchFirst];

    cartSearchChild[cartSearchFirst] = document.createElement("div");
    cartSearchChild[cartSearchFirst].classList.add("cart-search-child");
    cartSearchChild[cartSearchFirst].id = "cartSearchChild" + [cartSearchFirst];
    cartSearchChild[cartSearchFirst].innerHTML = cartSearchTextLast[cartSearchFirst];

    document.querySelector(".cart-search-text-body").appendChild(cartSearchLink[cartSearchFirst]);
    cartSearchLink[cartSearchFirst].appendChild(cartSearchChild[cartSearchFirst]);
    cartSearchFirst++;
  }
});

searchInputTag.addEventListener("focusout", () => {
  while (document.querySelector(".cart-search-text-body").hasChildNodes()) {
    document.querySelector(".cart-search-text-body").removeChild(document.querySelector(".cart-search-text-body").firstChild);
  }
});
searchInputTag.addEventListener("click", () => {
  document.querySelector(".cart-search-text-body").style.visibility = "visible";
});

//신상품순?
cartNewProduct.addEventListener("click", () => {
  cartCurrentListCountjbh = 0;
  cartShowListCountjbh = showCount;
  cartCurrentListCountjjw = 0;
  cartShowListCountjjw = showCount;
  cartCurrentListCountajy = 0;
  cartShowListCountajy = showCount;
  while (cartSearchListContainer.hasChildNodes()) {
    cartSearchListContainer.removeChild(cartSearchListContainer.firstChild);
  }
  productData().then((whosProduct) => {
    jbhwhosProduct = whosProduct.filter((a) => {
      return a.designName == "jbh";
    });
    cartNewProductInfor = jbhwhosProduct.sort((a, b) => {
      return b.index - a.index;
    });
    _productListTags(cartNewProductInfor);
    cartListAppendJbh(cartNewProductInfor);
  });
  cartNewProductInfor = 0;
  while (document.getElementById("ajy-search-list-container").hasChildNodes()) {
    document.getElementById("ajy-search-list-container").removeChild(document.getElementById("ajy-search-list-container").firstChild);
  }
  productData().then((whosProduct) => {
    ajywhosProduct = whosProduct.filter((a) => {
      return a.designName == "ajy";
    });
    cartNewProductInfor = ajywhosProduct.sort((a, b) => {
      return b.index - a.index;
    });
    _productListTags(cartNewProductInfor);
    cartListAppendAjy(cartNewProductInfor);
  });
  cartNewProductInfor = 0;
  while (document.getElementById("jjw-search-list-container").hasChildNodes()) {
    document.getElementById("jjw-search-list-container").removeChild(document.getElementById("jjw-search-list-container").firstChild);
  }
  productData().then((whosProduct) => {
    jjwwhosProduct = whosProduct.filter((a) => {
      return a.designName == "jjw";
    });
    cartNewProductInfor = jjwwhosProduct.sort((a, b) => {
      return b.index - a.index;
    });
    _productListTags(cartNewProductInfor);
    cartListAppendJjw(cartNewProductInfor);
  });
});

productData().then((whosProduct) => {
  ajywhosProduct = whosProduct.filter((a) => {
    return a.designName == "ajy";
  });
  _productListTags(ajywhosProduct);
  cartListAppendAjy(ajywhosProduct);

  whosProduct = 0;
});

productData().then((whosProduct) => {
  jbhwhosProduct = whosProduct.filter((a) => {
    return a.designName == "jbh";
  });
  _productListTags(jbhwhosProduct);
  cartListAppendJbh(jbhwhosProduct);

  whosProduct = 0;
});

productData().then((whosProduct) => {
  jjwwhosProduct = whosProduct.filter((a) => {
    return a.designName == "jjw";
  });
  _productListTags(jjwwhosProduct);
  cartListAppendJjw(jjwwhosProduct);

  whosProduct = 0;
});

/* 220711 추가된 부분  */
if (document.documentElement.scrollTop == 0) {
  document.querySelector(".search").style.backgroundColor = "";
  document.querySelector(".search").style.visibility = "hidden";
  document.querySelector(".logo").style.backgroundColor = "";
  document.querySelector(".Ann-shop").style.backgroundColor = "";
  document.querySelector(".Joo-shop").style.backgroundColor = "";
  document.querySelector(".Jang-shop").style.backgroundColor = "";
  document.querySelector(".search-rank").style.backgroundColor = "";
}
document.querySelector(".Ann-shop").addEventListener("click", () => {
  document.querySelector(".search").style.backgroundColor = "rgba(255, 255, 255, 0.5)";
  document.querySelector(".search").style.visibility = "";
  document.querySelector(".logo").style.backgroundColor = "white";
  document.querySelector(".Ann-shop").style.backgroundColor = "white";
  document.querySelector(".Joo-shop").style.backgroundColor = "white";
  document.querySelector(".Jang-shop").style.backgroundColor = "white";
  document.querySelector(".search-rank").style.backgroundColor = "white";
});
document.querySelector(".Joo-shop").addEventListener("click", () => {
  document.querySelector(".search").style.backgroundColor = "rgba(255, 255, 255, 0.5)";
  document.querySelector(".search").style.visibility = "";
  document.querySelector(".logo").style.backgroundColor = "white";
  document.querySelector(".Ann-shop").style.backgroundColor = "white";
  document.querySelector(".Joo-shop").style.backgroundColor = "white";
  document.querySelector(".Jang-shop").style.backgroundColor = "white";
  document.querySelector(".search-rank").style.backgroundColor = "white";
});
document.querySelector(".Jang-shop").addEventListener("click", () => {
  document.querySelector(".search").style.backgroundColor = "rgba(255, 255, 255, 0.5)";
  document.querySelector(".search").style.visibility = "";
  document.querySelector(".logo").style.backgroundColor = "white";
  document.querySelector(".Ann-shop").style.backgroundColor = "white";
  document.querySelector(".Joo-shop").style.backgroundColor = "white";
  document.querySelector(".Jang-shop").style.backgroundColor = "white";
  document.querySelector(".search-rank").style.backgroundColor = "white";
});
document.querySelector(".top-icon").addEventListener("click", () => {
  document.querySelector(".search").style.backgroundColor = "";
  document.querySelector(".search").style.visibility = "hidden";
  document.querySelector(".logo").style.backgroundColor = "";
  document.querySelector(".Ann-shop").style.backgroundColor = "";
  document.querySelector(".Joo-shop").style.backgroundColor = "";
  document.querySelector(".Jang-shop").style.backgroundColor = "";
  document.querySelector(".search-rank").style.backgroundColor = "";
  document.querySelector(".cart-search-text-body").style.visibility = "hidden";
});
document.querySelector(".logo").addEventListener("click", () => {
  document.querySelector(".search").style.backgroundColor = "";
  document.querySelector(".search").style.visibility = "hidden";
  document.querySelector(".logo").style.backgroundColor = "";
  document.querySelector(".Ann-shop").style.backgroundColor = "";
  document.querySelector(".Joo-shop").style.backgroundColor = "";
  document.querySelector(".Jang-shop").style.backgroundColor = "";
  document.querySelector(".search-rank").style.backgroundColor = "";
  document.querySelector(".cart-search-text-body").style.visibility = "hidden";
});
