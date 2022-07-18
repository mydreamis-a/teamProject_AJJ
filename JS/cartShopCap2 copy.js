// ㅜ json 파일에서 상품 목록의 데이터를 가져오는 함수
function productData() {
  return fetch("/json/productData.json")
    .then((resolve) => resolve.json())
    .then((json) => json.productInfor)
    .catch((reject) => {
      console.log("가져오기 실패")
    })
}

(async () => {
  await productData().then((result) => {
    const productData = { ...result };

    for (const key in productData) {
      if (Object.hasOwnProperty.call(productData, key)) {

          let AhnProduct = productData[key].filter((el) => el.designName == "ajy");
          console.log(AhnProduct);
          productName.push(temp.productName);
          price.push(temp.price);
          imgUrl.push(temp.imgUrl);
      }
  }
})();


//     jbhcartUserShopInfor = cartUserShopInfor.filter((a) => {
//       return a.designName == "jbh"
//     })

//     // cartFirstPriceSearch = document.getElementById("cartFirstPriceSearch").value;
//     // cartSecondPriceSearch = document.getElementById("cartSecondPriceSearch").value;

//     cartUserSearchPriceInfor = jbhcartUserShopInfor.filter(function (data) {
//       return cartFirstPriceSearch.value <= data.price && cartSecondPriceSearch.value >= data.price
//     })
//     cartUserSearchPriceInfor.sort((a, b) => {
//       return a.price - b.price;
//     })
//     cartInput(cartUserSearchPriceInfor);
//     cartListAppendJbh(cartUserSearchPriceInfor);
//   })

//   cartUserSearchPriceInfor = 0;

//   shopCap().then((cartUserShopInfor) => {

//     jjwcartUserShopInfor = cartUserShopInfor.filter((a) => {
//       return a.designName == "jjw"
//     })
//     while (document.querySelector("#jjw-search-list-container").hasChildNodes()) {
//       document.querySelector("#jjw-search-list-container").removeChild(document.querySelector("#jjw-search-list-container").firstChild);
//     }

//     // cartFirstPriceSearch = document.getElementById("cartFirstPriceSearch").value;
//     // cartSecondPriceSearch = document.getElementById("cartSecondPriceSearch").value;

//     cartUserSearchPriceInfor = jjwcartUserShopInfor.filter(function (data) {
//       return cartFirstPriceSearch.value <= data.price && cartSecondPriceSearch.value >= data.price
//     })
//     cartUserSearchPriceInfor.sort((a, b) => {
//       return a.price - b.price;
//     })
//     cartInput(cartUserSearchPriceInfor);
//     cartListAppendJjw(cartUserSearchPriceInfor);
//   })
//   cartUserSearchPriceInfor = 0;


//   shopCap().then((cartUserShopInfor) => {

//     ajycartUserShopInfor = cartUserShopInfor.filter((a) => {
//       return a.designName == "ajy"
//     })
//     while (document.querySelector("#ajy-search-list-container").hasChildNodes()) {
//       document.querySelector("#ajy-search-list-container").removeChild(document.querySelector("#ajy-search-list-container").firstChild);
//     }

//     // cartFirstPriceSearch = document.getElementById("cartFirstPriceSearch").value;
//     // cartSecondPriceSearch = document.getElementById("cartSecondPriceSearch").value;

//     cartUserSearchPriceInfor = ajycartUserShopInfor.filter(function (data) {
//       return cartFirstPriceSearch.value <= data.price && cartSecondPriceSearch.value >= data.price
//     })
//     cartUserSearchPriceInfor.sort((a, b) => {
//       return a.price - b.price;
//     })
//     cartInput(cartUserSearchPriceInfor);
//     cartListAppendAjy(cartUserSearchPriceInfor);
//   })
// })


//주병현 숖 홈페이지
let jbhcartUserShopInfor;
//장지원 숖 홈페이지
let jjwcartUserShopInfor;
//안주영 숖 홈페이지
let ajycartUserShopInfor;


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
const productList = ["cartListCol", "cartContainer", "cartPicture", "cartFirstText", "cartPicHover", "cartBody", "cartName", "cartSecondText", "cartBtnContainer", "cartBtnGroup", "cartBtnGetList", "cartBtnShowList"];
productList.forEach((el) => {
  window[el] = new Array();
})

//장바구니에 담은 리스트 선언
let cartBuyListRow = document.getElementById("cart-Buy-list-row");
let cartCurrentBuyListCount = 0;
//유저가 선택한 장바구니 배열선언(왜? 총합을 구할거기 때문에. 게다가 빼야할때도 있기 때문)

// ㅜ 장바구니 목록의 태그 배열
let cartUserListPriceReal = 0;
const shoppingBasket = ["cartUserListPriceReal", "cartUserListPrice", "cartBuyListCol", "cartBuyContainer", "cartBuyPicture", "cartBuyFirstText", "cartBuyPicHover", "cartBuyBody", "cartBuyName", "cartBuySecondText", "cartBuyBtnContainer", "cartBuyBtnGroup", "cartBuyDeleteBtn", "cartBuyBtnShowList", "cartListPText"];
shoppingBasket.forEach((el) => {
  window[el] = new Array();
})

// 상품 목록의 배열 초기화에 대한 함수 정의
function resetProductList() {
  productList.forEach((el) => {
    window[el] = new Array();
  })
}

//검색을 위한 input값 넣어주기
// let cartSearchText = document.getElementById("cartSearchText").value;

//가격검색 제이슨 임시 변수
let cartUserSearchPriceInfor;
//상품검색 제이슨 임시 변수
let cartUserShopInforSearch;

//최근검색어의 부모태그를 만들어줌
let cartSearchLink = new Array();
let cartSearchChild = new Array();
let cartSearchTextArr = new Array();
let cartSearchTextLast = new Array();
let cartSearchFirst = 0;

//장바구니 카운트
let cartListResult = 0;

//모달 변수
let cartModal = document.querySelector('.cart-modal');
// let cartListOut = document.getElementById("cartListOut");
let btnCartList = document.querySelector('.cart-btn-cart-list');

//검색기능 버튼 눌렀을때 필요한 변수
// let cartFirstPriceSearch = document.getElementById("cartFirstPriceSearch").value;
// let cartSecondPriceSearch = document.getElementById("cartSecondPriceSearch").value;


// 버튼을 꼭 3개로 해야할까? 만약 상점을 반드시 3개로 분할해야 한다면 버튼도 당연히 그래야겠지..
// 하지만 어차피 데이터는 json에서 나눠져 있기 때문에 상품 목록의 배열을 하나만 사용한다면 얘기는 달라지겠지?

// ㅜ 더보기 버튼 모음
const btns = ["cartMoreShowBtnajy", "cartMoreShowBtnjbh", "cartMoreShowBtnjjw"];
btns.forEach((el) => {
  el = document.createElement("input");
  el.setAttribute("type", "button");
  el.setAttribute("value", "더보기");
})

//유저의 총 합계금액 구하기 위해 필요한 태그 생성
let cartListSum = document.createElement("div");
cartListSum.classList.add("cart-list-sum");
let cartSumPrice = document.createElement("p");
cartSumPrice.classList.add("cart-sum-price");
cartSumPrice.innerHTML = "총 합계금액" + cartUserListPriceReal;

let cartNumberCount = 0;
document.querySelector(".wrapper").style.visibility = "hidden"
document.querySelector(".cart-search-text-body").style.visibility = "hidden";

function cartInput(cartUserShopInfor) {

  resetProductList();

  for (const key in cartUserShopInfor) {
    cartListCol[key] = document.createElement("div");
    cartListCol[key].classList.add("cart-listCol");

    cartContainer[key] = document.createElement("div");
    cartContainer[key].classList.add("cart-container");

    cartPicture[key] = document.createElement("div");
    cartPicture[key].classList.add("cart-pic");
    cartPicture[key].style.backgroundImage = cartUserShopInfor[key].img;

    cartFirstText[key] = document.createElement("div");
    cartFirstText[key].classList.add("cart-div-text");

    cartPicHover[key] = document.createElement("p");
    cartPicHover[key].classList.add("cart-pic-bicHover");
    cartPicHover[key].innerHTML = "사진 크게보기";

    cartBody[key] = document.createElement("div");
    cartBody[key].classList.add("cart-body");

    cartName[key] = document.createElement("p");
    cartName[key].classList.add("cart-name");
    cartName[key].innerHTML = cartUserShopInfor[key].name;
    cartSecondText[key] = document.createElement("p");
    cartSecondText[key].classList.add("cart-text");
    cartSecondText[key].innerHTML = cartUserShopInfor[key].price + "원";

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

    //각각의 장바구니 버튼을 눌렀을때
    cartBtnGetList[key].addEventListener("click", function () {

      if (cartNumberCount == 0) {
        document.querySelector(".wrapper").style.visibility = "";
      }

      cartBuyListCol[cartListResult] = document.createElement("div");
      cartBuyListCol[cartListResult].classList.add("cart-listCol");

      cartBuyContainer[cartListResult] = document.createElement("div");
      cartBuyContainer[cartListResult].classList.add("cart-container");

      cartBuyPicture[cartListResult] = document.createElement("div");
      cartBuyPicture[cartListResult].classList.add("cart-pic");
      cartBuyPicture[cartListResult].style.backgroundImage = cartUserShopInfor[key].img;

      cartBuyFirstText[cartListResult] = document.createElement("div");
      cartBuyFirstText[cartListResult].classList.add("cart-div-text");

      cartBuyPicHover[cartListResult] = document.createElement("p");
      cartBuyPicHover[cartListResult].classList.add("cart-pic-bicHover");
      cartBuyPicHover[cartListResult].innerHTML = "사진 크게보기";

      cartBuyBody[cartListResult] = document.createElement("div");
      cartBuyBody[cartListResult].classList.add("cart-body");

      cartBuyName[cartListResult] = document.createElement("p");
      cartBuyName[cartListResult].classList.add("cart-name");
      cartBuyName[cartListResult].innerHTML = cartUserShopInfor[key].name;

      cartBuySecondText[cartListResult] = document.createElement("p");
      cartBuySecondText[cartListResult].classList.add("cart-text");
      cartBuySecondText[cartListResult].innerHTML = cartUserShopInfor[key].price + "원";

      cartBuyBtnContainer[cartListResult] = document.createElement("div");
      cartBuyBtnContainer[cartListResult].classList.add("cart-btn-container");

      cartBuyBtnGroup[cartListResult] = document.createElement("div");
      cartBuyBtnGroup[cartListResult].classList.add("cart-btn-group");

      cartBuyDeleteBtn[cartListResult] = document.createElement("input");
      cartBuyDeleteBtn[cartListResult].setAttribute("type", "button");
      cartBuyDeleteBtn[cartListResult].setAttribute("value", "삭제하기");
      cartBuyDeleteBtn[cartListResult].classList.add("cart-btn");
      cartBuyDeleteBtn[cartListResult].id = "cartBuyDeleteBtn" + [cartListResult];

      cartBuyBtnShowList[cartListResult] = document.createElement("input");
      cartBuyBtnShowList[cartListResult].setAttribute("type", "button");
      cartBuyBtnShowList[cartListResult].setAttribute("value", "자세한 상품 보기");
      cartBuyBtnShowList[cartListResult].classList.add("cart-btn");

      cartListPText[cartListResult] = document.createElement("p");
      cartListPText[cartListResult].classList.add("cart-list-p-text");
      cartListPText[cartListResult].innerHTML = cartUserShopInfor[key].name + ",";
      cartListPText[cartListResult].id = "cartListPText" + [cartListResult];

      cartUserListPrice[cartListResult] = cartUserShopInfor[key].price;
      document.querySelector(".cart-list-text").appendChild(cartListPText[cartListResult]);
      cartListPText[cartListResult].style.visibility = "hidden";
      cartNumberCount++;
      cartListResult++;
      document.querySelector(".circleNumber").innerHTML = cartNumberCount;
    })
  }
}

//속성과 값을 가진 태그들을 쏴주는거
function cartListAppendJbh(jbhcartUserShopInfor) {
  while (cartCurrentListCountjbh < jbhcartUserShopInfor.length) {
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
    cartCurrentListCountjbh++
    if (cartCurrentListCountjbh == cartShowListCountjbh) {
      cartSearchListContainer.after(cartMoreShowBtnjbh);
      if (cartCurrentListCountjbh == jbhcartUserShopInfor.length) {
        cartMoreShowBtnjbh.remove();
      }
      break;
    }
  }
}

//초기 상품목록 더보기 버튼을 눌렀을때
cartMoreShowBtnjbh.addEventListener("click", function () {
  cartShowListCountjbh += showCount;
  cartInput(jbhcartUserShopInfor)
  cartListAppendJbh(jbhcartUserShopInfor);
})

//속성과 값을 가진 태그들을 쏴주는거
function cartListAppendAjy(ajycartUserShopInfor) {
  while (cartCurrentListCountajy < ajycartUserShopInfor.length) {
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
    cartCurrentListCountajy++
    if (cartCurrentListCountajy == cartShowListCountajy) {
      document.querySelector("#ajy-search-list-container").after(cartMoreShowBtnajy);
      break;
    }
    if (cartCurrentListCountajy == ajycartUserShopInfor.length) {
      cartMoreShowBtnajy.remove();
    }
  }
}

//초기 상품목록 더보기 버튼을 눌렀을때
cartMoreShowBtnajy.addEventListener("click", function () {
  cartShowListCountajy += showCount;
  cartInput(ajycartUserShopInfor)
  cartListAppendAjy(ajycartUserShopInfor);
  //80개가 다 됐을때 더보기 버튼 삭제
})


//속성과 값을 가진 태그들을 쏴주는거
function cartListAppendJjw(jjwcartUserShopInfor) {
  while (cartCurrentListCountjjw < jjwcartUserShopInfor.length) {
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
    cartCurrentListCountjjw++
    if (cartCurrentListCountjjw == cartShowListCountjjw) {
      let jjwFirstInforText = document.createElement("span");
      jjwFirstInforText.innerHTML = "1차 커뮤니티 상품은<br>'유일하게 개발된 타임머신'<br><br>기부 상품은 댓글과 좋아요로 자유롭게 소통할 수 있는 커뮤니티 공간이며 해당 상품의 판매 수익은 전액 기부됩니다.";
      jjwFirstInforText.classList.add("jjw-first-infor-text")
      cartPicture[0].style.position = "relative";
      cartPicture[0].style.backgroundColor = "skyblue";
      cartPicture[0].style.backgroundImage = "";
      cartFirstText[0].after(jjwFirstInforText);
      document.querySelector("#jjw-search-list-container").after(cartMoreShowBtnjjw);
      break;
    }
    if (cartCurrentListCountjjw == jjwcartUserShopInfor.length) {
      cartMoreShowBtnjjw.remove();
    }
  }
}
//초기 상품목록 더보기 버튼을 눌렀을때
cartMoreShowBtnjjw.addEventListener("click", function () {
  cartShowListCountjjw += showCount;
  cartInput(jjwcartUserShopInfor);
  cartListAppendJjw(jjwcartUserShopInfor);
})


//장바구니 버튼을 눌렀을때

document.querySelector(".shopping-icon").addEventListener("click", function () {

  cartModal.style.display = 'block';

  cartUserListPriceReal = cartUserListPrice.filter(a => a > 0).reduce((a, b) => a + b, 0)
  //장바구니 총 합계금액
  cartSumPrice.innerHTML = "총 합계금액" + cartUserListPriceReal;
  //배열에 담긴 태그와 태그 속성값들을 쏴준다
  while (cartCurrentBuyListCount < cartBuyListCol.length) {
    let btnCartListIndex = cartCurrentBuyListCount;
    cartBuyListRow.appendChild(cartBuyListCol[btnCartListIndex]);
    cartBuyListCol[btnCartListIndex].appendChild(cartBuyContainer[btnCartListIndex]);
    cartBuyContainer[btnCartListIndex].appendChild(cartBuyPicture[btnCartListIndex]);
    cartBuyPicture[btnCartListIndex].appendChild(cartBuyFirstText[btnCartListIndex]);
    cartBuyFirstText[btnCartListIndex].appendChild(cartBuyPicHover[btnCartListIndex]);
    cartBuyPicture[btnCartListIndex].after(cartBuyBody[btnCartListIndex]);
    cartBuyBody[btnCartListIndex].appendChild(cartBuyName[btnCartListIndex]);
    cartBuyName[btnCartListIndex].after(cartBuySecondText[btnCartListIndex]);
    cartBuySecondText[btnCartListIndex].after(cartBuyBtnContainer[btnCartListIndex]);
    cartBuyBtnContainer[btnCartListIndex].appendChild(cartBuyBtnGroup[btnCartListIndex]);
    cartBuyBtnGroup[btnCartListIndex].appendChild(cartBuyDeleteBtn[btnCartListIndex]);
    cartBuyDeleteBtn[btnCartListIndex].after(cartBuyBtnShowList[btnCartListIndex]);
    cartCurrentBuyListCount++;

    //삭제하기 버튼을 눌렀을때
    cartBuyDeleteBtn[btnCartListIndex].addEventListener("click", function () {

      cartUserListPriceReal = cartUserListPriceReal - cartUserListPrice[btnCartListIndex];
      cartUserListPrice.splice(btnCartListIndex, 1);

      //장바구니 총 합계금액
      cartSumPrice.innerHTML = "총 합계금액" + cartUserListPriceReal;
      cartBuyListRow.after(cartListSum);
      cartListSum.appendChild(cartSumPrice);
      document.querySelector("#cart-Buy-list-row").removeChild(cartBuyListCol[btnCartListIndex]);
      cartListPText.splice(cartListPText[btnCartListIndex], 1);
      document.querySelector(".cart-list-text").removeChild(document.getElementById("cartListPText" + [btnCartListIndex]));
      cartNumberCount = cartNumberCount - 1;
      document.querySelector(".circleNumber").innerHTML = cartNumberCount;
    })
  }
  cartBuyListRow.after(cartListSum)
  cartListSum.appendChild(cartSumPrice);
})
//모달 안에 장바구니 주문을 취소했을때
cartListOut.addEventListener("click", function () {
  cartModal.style.display = 'none';
})


//가격검색버튼을 눌렀을때
cartSearchBtn.addEventListener("click", function () {
  cartCurrentListCountjbh = 0;
  cartShowListCountjbh = showCount;
  cartCurrentListCountjjw = 0;
  cartShowListCountjjw = showCount;
  cartCurrentListCountajy = 0;
  cartShowListCountajy = showCount;

  while (cartSearchListContainer.hasChildNodes()) {
    cartSearchListContainer.removeChild(cartSearchListContainer.firstChild);
  }

  shopCap().then((cartUserShopInfor) => {

    jbhcartUserShopInfor = cartUserShopInfor.filter((a) => {
      return a.designName == "jbh"
    })

    // cartFirstPriceSearch = document.getElementById("cartFirstPriceSearch").value;
    // cartSecondPriceSearch = document.getElementById("cartSecondPriceSearch").value;

    cartUserSearchPriceInfor = jbhcartUserShopInfor.filter(function (data) {
      return cartFirstPriceSearch.value <= data.price && cartSecondPriceSearch.value >= data.price
    })
    cartUserSearchPriceInfor.sort((a, b) => {
      return a.price - b.price;
    })
    cartInput(cartUserSearchPriceInfor);
    cartListAppendJbh(cartUserSearchPriceInfor);
  })

  cartUserSearchPriceInfor = 0;

  shopCap().then((cartUserShopInfor) => {

    jjwcartUserShopInfor = cartUserShopInfor.filter((a) => {
      return a.designName == "jjw"
    })
    while (document.querySelector("#jjw-search-list-container").hasChildNodes()) {
      document.querySelector("#jjw-search-list-container").removeChild(document.querySelector("#jjw-search-list-container").firstChild);
    }

    // cartFirstPriceSearch = document.getElementById("cartFirstPriceSearch").value;
    // cartSecondPriceSearch = document.getElementById("cartSecondPriceSearch").value;

    cartUserSearchPriceInfor = jjwcartUserShopInfor.filter(function (data) {
      return cartFirstPriceSearch.value <= data.price && cartSecondPriceSearch.value >= data.price
    })
    cartUserSearchPriceInfor.sort((a, b) => {
      return a.price - b.price;
    })
    cartInput(cartUserSearchPriceInfor);
    cartListAppendJjw(cartUserSearchPriceInfor);
  })
  cartUserSearchPriceInfor = 0;


  shopCap().then((cartUserShopInfor) => {

    ajycartUserShopInfor = cartUserShopInfor.filter((a) => {
      return a.designName == "ajy"
    })
    while (document.querySelector("#ajy-search-list-container").hasChildNodes()) {
      document.querySelector("#ajy-search-list-container").removeChild(document.querySelector("#ajy-search-list-container").firstChild);
    }

    // cartFirstPriceSearch = document.getElementById("cartFirstPriceSearch").value;
    // cartSecondPriceSearch = document.getElementById("cartSecondPriceSearch").value;

    cartUserSearchPriceInfor = ajycartUserShopInfor.filter(function (data) {
      return cartFirstPriceSearch.value <= data.price && cartSecondPriceSearch.value >= data.price
    })
    cartUserSearchPriceInfor.sort((a, b) => {
      return a.price - b.price;
    })
    cartInput(cartUserSearchPriceInfor);
    cartListAppendAjy(cartUserSearchPriceInfor);
  })
})

//낮은 가격순 눌렀을때
cartRowSearchPrice.addEventListener("click", function () {
  cartCurrentListCountjbh = 0;
  cartShowListCountjbh = showCount;
  cartCurrentListCountjjw = 0;
  cartShowListCountjjw = showCount;
  cartCurrentListCountajy = 0;
  cartShowListCountajy = showCount;
  while (cartSearchListContainer.hasChildNodes()) {
    cartSearchListContainer.removeChild(cartSearchListContainer.firstChild);
  }

  shopCap().then((cartUserShopInfor) => {

    jbhcartUserShopInfor = cartUserShopInfor.filter((a) => {
      return a.designName == "jbh"
    })

    jbhcartUserShopInfor.sort(function (a, b) {
      return a.price - b.price;
    });
    cartInput(jbhcartUserShopInfor)
    cartListAppendJbh(jbhcartUserShopInfor)
  })


  while (cartSearchListContainer.hasChildNodes()) {
    cartSearchListContainer.removeChild(cartSearchListContainer.firstChild);
  }
  shopCap().then((cartUserShopInfor) => {

    jjwcartUserShopInfor = cartUserShopInfor.filter((a) => {
      return a.designName == "jjw"
    })

    jjwcartUserShopInfor.sort(function (a, b) {
      return a.price - b.price;
    });
    cartInput(jjwcartUserShopInfor)
    cartListAppendJjw(jjwcartUserShopInfor)
  })

  while (cartSearchListContainer.hasChildNodes()) {
    cartSearchListContainer.removeChild(cartSearchListContainer.firstChild);
  }
  shopCap().then((cartUserShopInfor) => {

    ajycartUserShopInfor = cartUserShopInfor.filter((a) => {
      return a.designName == "ajy"
    })

    ajycartUserShopInfor.sort(function (a, b) {
      return a.price - b.price;
    });
    cartInput(ajycartUserShopInfor)
    cartListAppendAjy(ajycartUserShopInfor)
  })
})

//높은 가격순 눌렀을때
cartHighSearchPrice.addEventListener("click", function () {

  cartCurrentListCountjbh = 0;
  cartShowListCountjbh = showCount;
  cartCurrentListCountjjw = 0;
  cartShowListCountjjw = showCount;
  cartCurrentListCountajy = 0;
  cartShowListCountajy = showCount;
  while (document.querySelector("#jjw-search-list-container").hasChildNodes()) {
    document.querySelector("#jjw-search-list-container").removeChild(document.querySelector("#jjw-search-list-container").firstChild);
  }
  shopCap().then((cartUserShopInfor) => {

    jbhcartUserShopInfor = cartUserShopInfor.filter((a) => {
      return a.designName == "jbh"
    })

    jbhcartUserShopInfor.sort(function (a, b) {
      return b.price - a.price;
    });
    cartInput(jbhcartUserShopInfor)
    cartListAppendJbh(jbhcartUserShopInfor)
  })

  while (cartSearchListContainer.hasChildNodes()) {
    cartSearchListContainer.removeChild(cartSearchListContainer.firstChild);
  }
  shopCap().then((cartUserShopInfor) => {

    jjwcartUserShopInfor = cartUserShopInfor.filter((a) => {
      return a.designName == "jjw"
    })
    jjwcartUserShopInfor.sort(function (a, b) {
      return b.price - a.price;
    });
    cartInput(jjwcartUserShopInfor)
    cartListAppendJjw(jjwcartUserShopInfor)
  })
  while (document.querySelector("#ajy-search-list-container").hasChildNodes()) {
    document.querySelector("#ajy-search-list-container").removeChild(document.querySelector("#ajy-search-list-container").firstChild);
  }
  shopCap().then((cartUserShopInfor) => {

    ajycartUserShopInfor = cartUserShopInfor.filter((a) => {
      return a.designName == "ajy"
    })

    ajycartUserShopInfor.sort(function (a, b) {
      return b.price - a.price;
    });
    cartInput(ajycartUserShopInfor)
    cartListAppendAjy(ajycartUserShopInfor)
  })
})

//상품검색을 위한 태그 쏴주기
cartSearchTextBtn.addEventListener("click", function () {
  cartCurrentListCountjbh = 0;
  cartShowListCountjbh = showCount;
  cartCurrentListCountjjw = 0;
  cartShowListCountjjw = showCount;
  cartCurrentListCountajy = 0;
  cartShowListCountajy = showCount;
  // cartSearchText = document.getElementById("cartSearchText").value;
  cartSearchTextArr.push(cartSearchText.value);
  cartSearchTextLast.unshift(cartSearchTextArr[cartSearchTextArr.length - 1]);

  while (cartSearchListContainer.hasChildNodes()) {
    cartSearchListContainer.removeChild(cartSearchListContainer.firstChild);
  }
  shopCap().then((cartUserShopInfor) => {

    jbhcartUserShopInfor = cartUserShopInfor.filter((a) => {
      return a.designName == "jbh"
    })
    if (cartSearchText.value == "") {
      cartInput(jbhcartUserShopInfor);
      cartListAppendJbh(jbhcartUserShopInfor);
      cartSearchText.value = alert("검색어를 입력해주세요!");
    }
    else if (cartSearchText.value == "바지" || cartSearchText.value == "팬츠" || cartSearchText.value == "바지" || cartSearchText.value == "pants") {
      cartSearchText.value = "pants";
    }
    else if (cartSearchText.value == "레깅스" || cartSearchText.value == "leggings") {
      cartSearchText.value = "leggings";
    }
    else if (cartSearchText.value == "신발" || cartSearchText.value == "슈즈" || cartSearchText.value == "shoes") {
      cartSearchText.value = "shoes";
    }
    else if (cartSearchText.value == "세트" || cartSearchText.value == "set") {
      cartSearchText.value = "set";
    }
    else if (cartSearchText.value == "가방" || cartSearchText.value == "샤넬" || cartSearchText.value == "샤넬백" || cartSearchText.value == "백" || cartSearchText.value == "bag") {
      cartSearchText.value = "bag";
    }
    cartUserShopInforSearch = jbhcartUserShopInfor.filter(function (data) {
      return data.classification === cartSearchText.value;
    });
    cartInput(cartUserShopInforSearch);
    cartListAppendJbh(cartUserShopInforSearch);
  })

  cartUserShopInforSearch = 0;

  while (document.querySelector("#jjw-search-list-container").hasChildNodes()) {
    document.querySelector("#jjw-search-list-container").removeChild(document.querySelector("#jjw-search-list-container").firstChild);
  }

  shopCap().then((cartUserShopInfor) => {

    jjwcartUserShopInfor = cartUserShopInfor.filter((a) => {
      return a.designName == "jjw"
    })
    if (cartSearchText.vaule == "") {
      cartInput(jjwcartUserShopInfor);
      cartListAppendJjw(jjwcartUserShopInfor);
      cartSearchText.vaule = alert("검색어를 입력해주세요!");
    }
    else if (cartSearchText.vaule == "뮤지컬" || cartSearchText.vaule == "musical" || cartSearchText.vaule == "연극" || cartSearchText.vaule == "연극뮤지컬") {
      cartSearchText.vaule = "musical";
    }
    else if (cartSearchText.vaule == "뮤직" || cartSearchText.vaule == "music" || cartSearchText.vaule == "음악" || cartSearchText.vaule == "꽃이여") {
      cartSearchText.vaule = "music";
    }
    else if (cartSearchText.vaule == "클래식뮤직" || cartSearchText.vaule == "classical music" || cartSearchText.vaule == "클래식 뮤직") {
      cartSearchText.vaule = "classical music";
    }
    cartUserShopInforSearch = jjwcartUserShopInfor.filter(function (data) {
      return data.classification === cartSearchText.vaule;
    });
    cartInput(cartUserShopInforSearch);
    cartListAppendJjw(cartUserShopInforSearch);
  })
  cartUserShopInforSearch = 0;

  while (document.querySelector("#ajy-search-list-container").hasChildNodes()) {
    document.querySelector("#ajy-search-list-container").removeChild(document.querySelector("#ajy-search-list-container").firstChild);
  }

  shopCap().then((cartUserShopInfor) => {

    ajycartUserShopInfor = cartUserShopInfor.filter((a) => {
      return a.designName == "ajy"
    })
    if (cartSearchText.value == "") {
      cartInput(ajycartUserShopInfor);
      cartListAppendAjy(ajycartUserShopInfor);
      cartSearchText.value = alert("검색어를 입력해주세요!");
    }
    else if (cartSearchText.value == "poketmonbread" || cartSearchText.value == "poketmon bread" || cartSearchText.value == "빵" || cartSearchText.value == "포켓몬빵" || cartSearchText.value == "푸키먼빵" || cartSearchText.value == "bread") {
      cartSearchText.value = "bread";
    }
    else if (cartSearchText.value == "피규어" || cartSearchText.value == "포켓몬피규어" || cartSearchText.value == "포켓몬 피규어" || cartSearchText.value == "포켓몬" || cartSearchText.value == "헬창" || cartSearchText.value == "포켓몬헬창" || cartSearchText.value == "포켓몬헬창피규어" || cartSearchText.value == "figure") {
      cartSearchText.value = "figure";
    }
    cartUserShopInforSearch = ajycartUserShopInfor.filter(function (data) {
      return data.classification === cartSearchText.value;
    });
    cartInput(cartUserShopInforSearch);
    cartListAppendAjy(cartUserShopInforSearch);
  })
  cartUserShopInforSearch = 0;
  while (document.querySelector(".cart-search-text-body").hasChildNodes()) {
    document.querySelector(".cart-search-text-body").removeChild(document.querySelector(".cart-search-text-body").firstChild);
  }
})

//상품검색 입력란을 클릭했을때
cartSearchText.addEventListener("click", function () {
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
    cartSearchFirst++
  }
})

cartSearchText.addEventListener("focusout", function () {
  while (document.querySelector(".cart-search-text-body").hasChildNodes()) {
    document.querySelector(".cart-search-text-body").removeChild(document.querySelector(".cart-search-text-body").firstChild);
  }
})
cartSearchText.addEventListener("click", function () {
  document.querySelector(".cart-search-text-body").style.visibility = "visible";

})

//신상품순?
cartNewProduct.addEventListener("click", function () {
  cartCurrentListCountjbh = 0;
  cartShowListCountjbh = showCount;
  cartCurrentListCountjjw = 0;
  cartShowListCountjjw = showCount;
  cartCurrentListCountajy = 0;
  cartShowListCountajy = showCount;
  while (cartSearchListContainer.hasChildNodes()) {
    cartSearchListContainer.removeChild(cartSearchListContainer.firstChild);
  }
  shopCap().then((cartUserShopInfor) => {
    jbhcartUserShopInfor = cartUserShopInfor.filter((a) => {
      return a.designName == "jbh";
    })
    cartNewProductInfor = jbhcartUserShopInfor.sort((a, b) => {
      return b.index - a.index;
    })
    cartInput(cartNewProductInfor);
    cartListAppendJbh(cartNewProductInfor);
  })
  cartNewProductInfor = 0;
  while (document.getElementById("ajy-search-list-container").hasChildNodes()) {
    document.getElementById("ajy-search-list-container").removeChild(document.getElementById("ajy-search-list-container").firstChild);
  }
  shopCap().then((cartUserShopInfor) => {
    ajycartUserShopInfor = cartUserShopInfor.filter((a) => {
      return a.designName == "ajy";
    })
    cartNewProductInfor = ajycartUserShopInfor.sort((a, b) => {
      return b.index - a.index;
    })
    cartInput(cartNewProductInfor);
    cartListAppendAjy(cartNewProductInfor);
  })
  cartNewProductInfor = 0;
  while (document.getElementById("jjw-search-list-container").hasChildNodes()) {
    document.getElementById("jjw-search-list-container").removeChild(document.getElementById("jjw-search-list-container").firstChild);
  }
  shopCap().then((cartUserShopInfor) => {
    jjwcartUserShopInfor = cartUserShopInfor.filter((a) => {
      return a.designName == "jjw";
    })
    cartNewProductInfor = jjwcartUserShopInfor.sort((a, b) => {
      return b.index - a.index;
    })
    cartInput(cartNewProductInfor);
    cartListAppendJjw(cartNewProductInfor);
  })
})

shopCap().then((cartUserShopInfor) => {

  ajycartUserShopInfor = cartUserShopInfor.filter((a) => {
    return a.designName == "ajy"
  })
  cartInput(ajycartUserShopInfor);
  cartListAppendAjy(ajycartUserShopInfor);

  cartUserShopInfor = 0;

})

shopCap().then((cartUserShopInfor) => {

  jbhcartUserShopInfor = cartUserShopInfor.filter((a) => {
    return a.designName == "jbh"
  })
  cartInput(jbhcartUserShopInfor);
  cartListAppendJbh(jbhcartUserShopInfor);

  cartUserShopInfor = 0;
})

shopCap().then((cartUserShopInfor) => {

  jjwcartUserShopInfor = cartUserShopInfor.filter((a) => {
    return a.designName == "jjw"
  })
  cartInput(jjwcartUserShopInfor);
  cartListAppendJjw(jjwcartUserShopInfor); ``

  cartUserShopInfor = 0;
})

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
document.querySelector(".Ann-shop").addEventListener("click", function () {
  document.querySelector(".search").style.backgroundColor = "rgba(255, 255, 255, 0.5)";
  document.querySelector(".search").style.visibility = "";
  document.querySelector(".logo").style.backgroundColor = "white";
  document.querySelector(".Ann-shop").style.backgroundColor = "white";
  document.querySelector(".Joo-shop").style.backgroundColor = "white";
  document.querySelector(".Jang-shop").style.backgroundColor = "white";
  document.querySelector(".search-rank").style.backgroundColor = "white";
})
document.querySelector(".Joo-shop").addEventListener("click", function () {
  document.querySelector(".search").style.backgroundColor = "rgba(255, 255, 255, 0.5)";
  document.querySelector(".search").style.visibility = "";
  document.querySelector(".logo").style.backgroundColor = "white";
  document.querySelector(".Ann-shop").style.backgroundColor = "white";
  document.querySelector(".Joo-shop").style.backgroundColor = "white";
  document.querySelector(".Jang-shop").style.backgroundColor = "white";
  document.querySelector(".search-rank").style.backgroundColor = "white";
})
document.querySelector(".Jang-shop").addEventListener("click", function () {
  document.querySelector(".search").style.backgroundColor = "rgba(255, 255, 255, 0.5)";
  document.querySelector(".search").style.visibility = "";
  document.querySelector(".logo").style.backgroundColor = "white";
  document.querySelector(".Ann-shop").style.backgroundColor = "white";
  document.querySelector(".Joo-shop").style.backgroundColor = "white";
  document.querySelector(".Jang-shop").style.backgroundColor = "white";
  document.querySelector(".search-rank").style.backgroundColor = "white";
})
document.querySelector(".top-icon").addEventListener("click", function () {
  document.querySelector(".search").style.backgroundColor = "";
  document.querySelector(".search").style.visibility = "hidden";
  document.querySelector(".logo").style.backgroundColor = "";
  document.querySelector(".Ann-shop").style.backgroundColor = "";
  document.querySelector(".Joo-shop").style.backgroundColor = "";
  document.querySelector(".Jang-shop").style.backgroundColor = "";
  document.querySelector(".search-rank").style.backgroundColor = "";
  document.querySelector(".cart-search-text-body").style.visibility = "hidden";
})
document.querySelector(".logo").addEventListener("click", function () {
  document.querySelector(".search").style.backgroundColor = "";
  document.querySelector(".search").style.visibility = "hidden";
  document.querySelector(".logo").style.backgroundColor = "";
  document.querySelector(".Ann-shop").style.backgroundColor = "";
  document.querySelector(".Joo-shop").style.backgroundColor = "";
  document.querySelector(".Jang-shop").style.backgroundColor = "";
  document.querySelector(".search-rank").style.backgroundColor = "";
  document.querySelector(".cart-search-text-body").style.visibility = "hidden";
})