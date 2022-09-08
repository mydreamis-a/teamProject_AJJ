/**
 * 장바구니에 대한 클래스
 */
class Cart {
  constructor() { }
}

////////////////////////////////////////
/**
 * 장바구니에 상품을 담는 ajax에 대한 함수
 * @returns {object}
 * cartTotalCount 장바구니에 담긴 모든 상품의 수량
 */
// ㅜ 역할:
//
// 1. 장바구니에 담기 버튼을 통해
//    상점의 이름과 상품 번호를 가져와서
//    해당 경로로 전송
// 2. 장바구니에 담긴 모든 상품의 수량을 받아서
//    장바구니 수량 태그에 값 삽입
Cart.prototype.inCartAjax = function () {
  //
  if (inCartControl === true) return;
  inCartControl = true;
  //
  const shopName = event.target.dataset.name;
  const productNum = event.target.className.replace("in-cart-btn", "");
  $.ajax({
    url: `/cart/${shopName}/${productNum}`,
    type: "post",
    //
    success: ({ cartTotalCount }) => {
      const cartTotalCountNumberTag = document.querySelector(".cart-total-count-number");
      cartTotalCountNumberTag.innerHTML = cartTotalCount;
      //
      inCartControl = false;
    },
  });
};

///////////////////////////////////////////////////////
/**
 * 장바구니 아이콘을 클릭 하면 장바구니 화면을 보여주는 함수
 * @returns {object} cartProducts 장바구니에 담긴 상품 목록 정보의 배열
 * [{ product_count: number, JJWproduct: { id: number, name: string, price: number, img: string } }]
 */
// 1. 장바구니 아이콘을 클릭 했을 때
// 2. 장바구니 화면 표시
// 3. 해당 경로로 전송
// 4. 전송 받은 장바구니의 상품 정보로
//    합계 금액 계산
// 5. createCartProductTags 함수로
//    장바구니 화면에 해당 상품 목록의 태그 생성
// 6. 주문하기 버튼에 대한 클릭 이벤트 등록
// 7. 나가기 버튼에 대한 클릭 이벤트 등록
Cart.prototype.clickCartIcon = function () {
  //
  const cartModalContainerTag = document.querySelector(".cart-modal-container");
  const cartTotalPriceTag = document.querySelector("#cart-total-price");
  const cartOrderBtnTag = document.querySelector("#cart-order-btn");
  const cartExitBtnTag = document.querySelector("#cart-exit-btn");
  const cartIconTag = document.querySelector(".cart-icon");
  //
  cartIconTag.addEventListener("click", () => {
    //
    cartModalContainerTag.style.display = "block";
    $.ajax({
      url: "/cart/list",
      type: "post",
      //
      success: ({ cartProducts }) => {
        //
        this.showCartProducts(cartProducts);
      },
    });
  });
  // ㅜ 장바구니 화면에서 주문하기 버튼을 클릭 했을 때
  cartOrderBtnTag.addEventListener("click", () => {
    // 로그인 판단 여부 변수는 로그인 페이지에 선언해둠.
    if(userLogin == ""){
      alert("로그인 먼저 해주세요");
    } else{
      const orderPrice = cartTotalPriceTag.innerHTML.replace("총 합계 금액: ", "");
      const orderMessage = `주문하시겠습니까?\n주문 금액: ${orderPrice}`;
      //
      if (orderPrice === 0) return;
      if (confirm(orderMessage)) {
        alert(`${orderPrice} 주문 완료!`);
      };
    }
  });
  // ㅜ 장바구니 화면에서 나가기 버튼을 클릭 했을 때
  cartExitBtnTag.addEventListener("click", () => {
    cartModalContainerTag.style.display = "none";
  });

  /**
   * 
   * @returns 
   */
  // ㅜ 
  // 1. 삭제하기 연속 클릭 막고
  Cart.prototype.deleteCartProducts = function () {
    //
    if (deleteCartControl === true) return;
    deleteCartControl = true;
    //
    const shopName = event.target.dataset.name;
    const productNum = event.target.className.replace("cart-delete-btn", "");
    $.ajax({
      url: `/cart/delete/${shopName}/${productNum}`,
      type: "post",
      success: ({ cartProducts, cartTotalCount }) => {
        //
        this.showCartProducts(cartProducts);
        //
        const cartTotalCountNumberTag = document.querySelector(".cart-total-count-number");
        cartTotalCountNumberTag.innerHTML = cartTotalCount;
        //
        deleteCartControl = false;
      },
    });
  };
};

/**
 * 
 * @param {*} cartProducts 
 */
Cart.prototype.showCartProducts = function (cartProducts) {
  //
  let totalPrice = 0;
  let productCount = 0;
  const cartListRowTag = document.querySelector(".cart-list-row");
  const cartTotalPriceTag = document.querySelector("#cart-total-price");
  //
  cartProducts.forEach((el) => {
    //
    for (const key in el) {
      if (Object.hasOwnProperty.call(el, key)) {
        // log(el.JJWproduct === undefined);
        //
        if (el[key]?.price !== undefined) {
          price = el[key].price;
          productCount = el.product_count;
        }
      }
    }
    totalPrice += price * productCount;
  });
  cartListRowTag.innerHTML = createCartProductTags(cartProducts).join("");
  cartTotalPriceTag.innerHTML = `총 합계 금액: ${totalPrice} 원`;
}
//
// 09.06.21 수정
