//추가부분
function shopCap(){
    return fetch("/json/cartShopCap.json")
    .then((res)=> res.json())
    .then((json)=> json.cartUserShopInfor)
    .catch((rej)=>{
      console.log("실패")
    })
  }
  //쇼핑몰 목록 전체 태그 배열
  let cartCurrentListCount = 0;
  let cartShowListCount = 20;
  let cartListCol = new Array();
  let cartContainer = new Array();
  let cartPicture = new Array();
  let cartFirstText = new Array();
  let cartPicHover = new Array();
  let cartBody = new Array();
  let cartName = new Array();
  let cartSecondText = new Array();
  let cartBtnContainer = new Array();
  let cartBtnGroup = new Array();
  let cartBtnGetList = new Array();
  let cartBtnShowList = new Array();
  
  //장바구니에 담은 리스트 선언
  let cartBuyListRow = document.getElementById("cart-Buy-list-row");
  let cartCurrentBuyListCount = 0;
  //유저가 선택한 장바구니 배열선언(왜? 총합을 구할거기 때문에. 게다가 빼야할때도 있기 때문)
  
  //유저의 돈 총합
  let cartUserListPriceReal = 0;
  let cartUserListPrice = new Array();
  //장바구니 리스트 태그 배열
  let cartBuyListCol = new Array();
  let cartBuyContainer = new Array();
  let cartBuyPicture = new Array();
  let cartBuyFirstText = new Array();
  let cartBuyPicHover = new Array();
  let cartBuyBody = new Array();
  let cartBuyName = new Array();
  let cartBuySecondText = new Array();
  let cartBuyBtnContainer = new Array();
  let cartBuyBtnGroup = new Array();
  let cartBuyDeleteBtn = new Array();
  let cartBuyBtnShowList = new Array();
  let cartListPText = new Array();
  
  //검색을 위한 input값 넣어주기
  let cartSearchText = document.getElementById("cartSearchText").value;
  
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
  let cartAllList = document.getElementById("cartAllList");
  
    //모달 변수
    let cartModal = document.querySelector('.cart-modal');
    let cartListOut = document.getElementById("cartListOut");
    let btnCartList = document.querySelector('.cart-btn-cart-list');
  
    //검색기능 버튼 눌렀을때 필요한 변수
    let cartFirstPriceSearch = document.getElementById("cartFirstPriceSearch").value;
    let cartSecondPriceSearch = document.getElementById("cartSecondPriceSearch").value;
  
    let cartMoreShowBtn = document.createElement("input");
    cartMoreShowBtn.id = "cartMoreShowBtn";
    cartMoreShowBtn.setAttribute("type","button");
    cartMoreShowBtn.setAttribute("value","더보기");
  
    //유저의 총 합계금액 구하기 위해 필요한 태그 생성
    let cartListSum = document.createElement("div");
    cartListSum.classList.add("cart-list-sum");
    let cartSumPrice = document.createElement("p");
    cartSumPrice.classList.add("cart-sum-price");
    cartSumPrice.innerHTML = "총 합계금액"+cartUserListPriceReal;
  
    function cartInput(cartUserInfor){
  
      //배열 초기화
      cartListCol = new Array();
      cartContainer = new Array();
      cartPicture = new Array();
      cartFirstText = new Array();
      cartPicHover = new Array();
      cartBody = new Array();
      cartName = new Array();
      cartSecondText = new Array();
      cartBtnContainer = new Array();
      cartBtnGroup = new Array();
      cartBtnGetList = new Array();
      cartBtnShowList = new Array();
  
      for (const key in cartUserShopInfor) {
      cartListCol[key] = document.createElement("div");
      cartListCol[key].classList.add("cart-listCol");
      cartListCol[key].id = "cartListCol"+[key]
      
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
      cartSecondText[key].innerHTML = cartUserShopInfor[key].price+"원";
      
      cartBtnContainer[key] = document.createElement("div");
      cartBtnContainer[key].classList.add("cart-btn-container");
  
      cartBtnGroup[key] = document.createElement("div");
      cartBtnGroup[key].classList.add("cart-btn-group");
  
      cartBtnGetList[key] = document.createElement("input");
      cartBtnGetList[key].setAttribute("type","button");
      cartBtnGetList[key].setAttribute("value","장바구니에 담기");
      cartBtnGetList[key].classList.add("cart-btn");
      cartBtnGetList[key].id = "cartBtnGetList"+[key];
      cartBtnShowList[key] = document.createElement("input");
      cartBtnShowList[key].setAttribute("type","button");
      cartBtnShowList[key].setAttribute("value","상품 보기");
      cartBtnShowList[key].classList.add("cart-btn");
      cartBtnShowList[key].id = "cartBtnShowList"+[key];
  
          //각각의 장바구니 버튼을 눌렀을때
        cartBtnGetList[key].addEventListener("click",function(){ 
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
          cartBuySecondText[cartListResult].innerHTML = cartUserShopInfor[key].price+"원";
          
          cartBuyBtnContainer[cartListResult] = document.createElement("div");
          cartBuyBtnContainer[cartListResult].classList.add("cart-btn-container");
  
          cartBuyBtnGroup[cartListResult] = document.createElement("div");
          cartBuyBtnGroup[cartListResult].classList.add("cart-btn-group");
  
          cartBuyDeleteBtn[cartListResult] = document.createElement("input");
          cartBuyDeleteBtn[cartListResult].setAttribute("type","button");
          cartBuyDeleteBtn[cartListResult].setAttribute("value","삭제하기");
          cartBuyDeleteBtn[cartListResult].classList.add("cart-btn");
          cartBuyDeleteBtn[cartListResult].id = "cartBuyDeleteBtn"+[cartListResult];
           
          cartBuyBtnShowList[cartListResult] = document.createElement("input");
          cartBuyBtnShowList[cartListResult].setAttribute("type","button");
          cartBuyBtnShowList[cartListResult].setAttribute("value","자세한 상품 보기");
          cartBuyBtnShowList[cartListResult].classList.add("cart-btn");
  
          cartListPText[cartListResult] = document.createElement("p");
          cartListPText[cartListResult].classList.add("cart-list-p-text");
          cartListPText[cartListResult].innerHTML = cartUserShopInfor[key].name+",";
          cartListPText[cartListResult].id = "cartListPText"+[cartListResult];
  
          cartUserListPrice[cartListResult] = cartUserShopInfor[key].price;
          document.querySelector(".cart-list-text").appendChild(cartListPText[cartListResult]); 
          cartListResult++;
      })
    }
  }
  
  //속성과 값을 가진 태그들을 쏴주는거
  function cartListAppend(cartUserShopInfor) {
      while (cartCurrentListCount < cartListCol.length) {
      let cartListIndex = cartCurrentListCount;
       document.getElementById("cartSearchListContainer").appendChild(cartListCol[cartListIndex]);
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
       cartCurrentListCount++
       if(cartCurrentListCount==cartShowListCount){
          document.getElementById("cartSearchListContainer").after(cartMoreShowBtn);
          break;
        }
     }
  }
  
  //초기 상품목록 더보기 버튼을 눌렀을때
  cartMoreShowBtn.addEventListener("click",function(){
    cartShowListCount += 20;
    cartListAppend();
    //80개가 다 됐을때 더보기 버튼 삭제
  if(cartCurrentListCount==cartListCol.length){
    cartMoreShowBtn.remove();
    }
  })
  
    //장바구니 버튼을 눌렀을때
    btnCartList.addEventListener("click",function() {
    cartAllList.style.display = "none";
    btnCartList.style.display = "none";
    cartModal.style.display = 'block';
    cartUserListPriceReal = cartUserListPrice.filter(a => a > 0).reduce((a, b) => a + b, 0)
    //장바구니 총 합계금액
    cartSumPrice.innerHTML = "총 합계금액"+cartUserListPriceReal;
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
      cartBuyDeleteBtn[btnCartListIndex].addEventListener("click",function(){
  
      cartUserListPriceReal = cartUserListPriceReal - cartUserListPrice[btnCartListIndex];
      cartUserListPrice.splice(btnCartListIndex,1);
  
      //장바구니 총 합계금액
      cartSumPrice.innerHTML = "총 합계금액"+cartUserListPriceReal;
      cartBuyListRow.after(cartListSum)
      cartListSum.appendChild(cartSumPrice);
      document.getElementById("cart-Buy-list-row").removeChild(cartBuyListCol[btnCartListIndex]);
      cartListPText.splice(cartListPText[btnCartListIndex],1);
      document.querySelector(".cart-list-text").removeChild(document.getElementById("cartListPText"+[btnCartListIndex]));
     })
  }
  cartBuyListRow.after(cartListSum)
  cartListSum.appendChild(cartSumPrice);
  })
  
  //모달 안에 장바구니 주문을 취소했을때
  cartListOut.addEventListener("click", function () {
    cartAllList.style.display = "block";
    cartModal.style.display = 'none';
    btnCartList.style.display = "block" 
    })
  
  //가격검색버튼을 눌렀을때
  document.getElementById("cartSearchBtn").addEventListener("click",function(){
    cartCurrentListCount = 0;
    cartShowListCount = 20;
    while (document.getElementById("cartSearchListContainer").hasChildNodes()) {
      document.getElementById("cartSearchListContainer").removeChild(document.getElementById("cartSearchListContainer").firstChild);
    }
    shopCap().then((cartUserShopInfor)=>{
      cartFirstPriceSearch = document.getElementById("cartFirstPriceSearch").value;
      cartSecondPriceSearch = document.getElementById("cartSecondPriceSearch").value;
  
      cartUserSearchPriceInfor = cartUserShopInfor.filter(function(data){
        return cartFirstPriceSearch <= data.price && cartSecondPriceSearch >= data.price
      })
      cartUserSearchPriceInfor.sort((a,b)=>{
        return a.price - b.price;
      })
        cartInput(cartUserSearchPriceInfor);
        cartListAppend(cartUserSearchPriceInfor);
    })
  })
  
  //낮은 가격순 눌렀을때
  document.getElementById("cartRowSearchPrice").addEventListener("click",function(){
    cartCurrentListCount = 0;
    cartShowListCount = 20;
    while (document.getElementById("cartSearchListContainer").hasChildNodes()) {
      document.getElementById("cartSearchListContainer").removeChild(document.getElementById("cartSearchListContainer").firstChild);
    }
      shopCap().then((cartUserShopInfor)=>{
        cartUserShopInfor.sort(function(a, b){
          return a.price - b.price;
        });
        cartInput(cartUserShopInfor)
        cartListAppend(cartUserShopInfor)
    })
  })
  
  //높은 가격순 눌렀을때
  document.getElementById("cartHighSearchPrice").addEventListener("click",function(){
    cartCurrentListCount = 0;
    cartShowListCount = 20;
    while (document.getElementById("cartSearchListContainer").hasChildNodes()) {
      document.getElementById("cartSearchListContainer").removeChild(document.getElementById("cartSearchListContainer").firstChild);
    }
    shopCap().then((cartUserShopInfor)=>{
      cartUserShopInfor.sort(function(a, b){
        return b.price - a.price;
      });
      cartInput(cartUserShopInfor)
      cartListAppend(cartUserShopInfor);
    })
  })
  
  //상품검색을 위한 태그 쏴주기
  document.getElementById("cartSearchTextBtn").addEventListener("click",function(){
  
      cartCurrentListCount = 0;
      cartShowListCount = 20;
      cartSearchText = document.getElementById("cartSearchText").value;
      cartSearchTextArr.push(document.getElementById("cartSearchText").value);
      cartSearchTextLast.unshift(cartSearchTextArr[cartSearchTextArr.length - 1]);
    while (document.getElementById("cartSearchListContainer").hasChildNodes()) {
      document.getElementById("cartSearchListContainer").removeChild(document.getElementById("cartSearchListContainer").firstChild);
    }
    shopCap().then((cartUserShopInfor)=>{
      cartUserShopInforSearch = cartUserShopInfor;
        if(cartSearchText=="바지" || cartSearchText=="팬츠" || cartSearchText=="바지" || cartSearchText=="pants"){
          cartSearchText = "pants";
        }
        else if(cartSearchText=="레깅스" || cartSearchText=="leggings"){
          cartSearchText = "leggings";
        }
        else if(cartSearchText=="신발" || cartSearchText=="슈즈" || cartSearchText=="shoes"){
          cartSearchText = "shoes";
        }
        else if(cartSearchText=="세트" || cartSearchText=="set"){
          cartSearchText = "set";
        }
        else if(cartSearchText=="가방" || cartSearchText=="샤넬" || cartSearchText=="샤넬백" ||cartSearchText=="백" || cartSearchText=="bag"){
          cartSearchText = "bag";
        }
        else if(cartSearchText==""){
          cartInput(cartUserShopInfor);
          cartListAppend(cartUserShopInfor);
          cartSearchText = alert("검색어를 입력해주세요!");
        }
        cartUserShopInforSearch = cartUserShopInfor.filter(function(data) {
          return data.classification===cartSearchText;
        });
        cartInput(cartUserShopInforSearch);
        cartListAppend(cartUserShopInforSearch);
    })
    while (document.querySelector(".cart-search-text-body").hasChildNodes()) {
    document.querySelector(".cart-search-text-body").removeChild(document.querySelector(".cart-search-text-body").firstChild);
    }
  })
  
  //상품검색 입력란을 클릭했을때
  document.getElementById("cartSearchText").addEventListener("click",function(){
  
    document.querySelector(".cart-search-text-body").innerHTML = "최근검색어";
    while (cartSearchFirst < cartSearchTextLast.length) {
      cartSearchLink[cartSearchFirst] = document.createElement("a");
      cartSearchLink[cartSearchFirst].classList.add("cart-search-link");
      cartSearchLink[cartSearchFirst].setAttribute("href","");
      cartSearchLink[cartSearchFirst].id = "cartSearchLink"+[cartSearchFirst];
  
      cartSearchChild[cartSearchFirst] = document.createElement("div");
      cartSearchChild[cartSearchFirst].classList.add("cart-search-child");
      cartSearchChild[cartSearchFirst].id = "cartSearchChild"+[cartSearchFirst];
      cartSearchChild[cartSearchFirst].innerHTML = cartSearchTextLast[cartSearchFirst];
  
      document.querySelector(".cart-search-text-body").appendChild(cartSearchLink[cartSearchFirst]);
      cartSearchLink[cartSearchFirst].appendChild(cartSearchChild[cartSearchFirst]);
      cartSearchFirst++
    }
    cartSearchFirst = 0;
  })
  //다른 공간을 눌렀을때 최근 검색어가 사라지게
  document.getElementById("cartAllList").addEventListener("click",function(){
    while (document.querySelector(".cart-search-text-body").hasChildNodes()) {
      document.querySelector(".cart-search-text-body").removeChild(document.querySelector(".cart-search-text-body").firstChild);
    }
  })
  //새상품순에 담을 json배열
  //새상품순을 눌렀을때
  let cartNewProductInfor;
  document.getElementById("cartNewProduct").addEventListener("click",function(){
    cartCurrentListCount = 0;
    cartShowListCount = 20;
    while (document.getElementById("cartSearchListContainer").hasChildNodes()) {
      document.getElementById("cartSearchListContainer").removeChild(document.getElementById("cartSearchListContainer").firstChild);
    }
    shopCap().then((cartUserShopInfor)=>{
  
      cartNewProductInfor = cartUserShopInfor.sort((a,b)=>{
        return b.index - a.index;
      })
      cartInput(cartNewProductInfor);
      cartListAppend(cartNewProductInfor);
    })  
  })
  
  //인기상품순에 담을 json배열
  let cartHitProductList;
  //인기상품순을 넣었을때
  document.getElementById("cartHitList").addEventListener(("click"),function(){
    cartCurrentListCount = 0;
    cartShowListCount = 20;
    while (document.getElementById("cartSearchListContainer").hasChildNodes()) {
      document.getElementById("cartSearchListContainer").removeChild(document.getElementById("cartSearchListContainer").firstChild);
    }
    shopCap().then((cartUserShopInfor)=>{
      cartHitProductList = cartUserShopInfor.filter((data)=>{
        return data.popular == "hit";
      })
    cartInput(cartHitProductList);
    cartListAppend(cartHitProductList);
    })  
  })
  
  shopCap().then((cartUserShopInfor)=>{
      cartInput(cartUserShopInfor);
      cartListAppend(cartUserShopInfor);
  })  