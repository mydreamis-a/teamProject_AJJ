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
// 1. 장바구니에 담기 버튼을 통해
//    상점의 이름과 상품 번호를 가져와서
//    해당 경로로 전송
// 2. 장바구니에 담긴 모든 상품의 수량을 받아서
//    장바구니 수량 태그에 값 삽입
Cart.prototype.inCartAjax = function () {
  //
  const shopName = event.target.dataset.name;
  const productNum = event.target.className.replace("in-cart-btn", "");
  $.ajax({
    //
    url: `/cart/${shopName}/${productNum}`,
    type: "post",
    //
    success: ({ cartTotalCount }) => {
      const cartTotalCountNumberTag = document.querySelector(".cart-total-count-number");
      cartTotalCountNumberTag.innerHTML = cartTotalCount;
    },
  });
};

////////////////////////////////////////////////////////
/**
 * 장바구니 아이콘을 클릭하면 장바구니 화면을 보여주는 함수
 * @returns {object} cartProducts 장바구니에 담긴 상품 목록 정보
 * { [{ product_count: number, JJWproduct: { id: number, name: string, price: number, img: string } }] }
 */
// 1. 장바구니 아이콘 클릭
// 2. 장바구니 화면 표시
// 3. 해당 경로로 전송
// 4. 전송 받은 장바구니의 상품 정보로
//  
Cart.prototype.clickCartIcon = function () {
  //
  const cartModalContainerTag = document.querySelector(".cart-modal-container");
  const cartExitBtnTag = document.querySelector(".cart-exit-btn");
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
        let totalPrice = 0;
        const cartTotalPriceTag = document.querySelector("#cart-total-price");
        //
        cartProducts.forEach((el) => {
          //
          let productNum = 0;
          let shopName = null;
          //
          
          for (const key in el) {
            if (Object.hasOwnProperty.call(el, key)) {
              // log(el.JJWproduct); // undefined
              //

              log(el[key]?.price)
              if (el[key]?.price !== undefined) {
                price = el[key].price;
              }
            }
          }
          totalPrice += price;
        });
        createCartProductTags(cartProducts);
        cartTotalPriceTag.innerHTML = `총 합계 금액: ${totalPrice} 원`;
      },
    });
  });
  // ㅜ 장바구니 화면에서 나가기 버튼을 클릭했을 때
  cartExitBtnTag.addEventListener("click", () => {
    cartModalContainerTag.style.display = "none";
  });
};

//////////////////////////////////////////////////////////////////////////////////////
/**
 * 상점 이름과 상품 번호를 통해 상품 목록에서 태그를 복사하고 장바구니 화면에 생성하는 함수
 * @param {string} shopName 상점 이름
 * @param {number} productNum 상품 번호
 * @param {number} productCount 장바구니에 담은 수량
 */
Cart.prototype.createCartProducts = function (shopName, productNum, productCount) {
  //;
  const cartDeleteBtnTags = document.querySelectorAll(`[class = "cart-delete-btn${productNum}"][data-name = "${shopName}"]`);
  const createTagCount = productCount - cartDeleteBtnTags.length;
  //
  for (let i = 0; i < createTagCount; i++) {
    //
    const inCartBtnTag = document.querySelector(`[class = "in-cart-btn${productNum}"][data-name = "${shopName}"]`);
    const copyTag = inCartBtnTag.closest(".product-list-col").cloneNode(true);
    const cartDeleteBtnTag = copyTag.querySelector(`.in-cart-btn${productNum}`);
    const cartListRowTag = document.querySelector(".cart-list-row");
    //
    cartDeleteBtnTag.className = `cart-delete-btn${productNum}`;
    cartDeleteBtnTag.setAttribute("value", "삭제하기");
    cartDeleteBtnTag.removeAttribute("onclick");
    //
    cartListRowTag.insertBefore(copyTag, cartListRowTag.firstElementChild);

    // ㅜ 장바구니 화면에서 삭제하기 버튼을 클릭했을 때
    // cartDeleteBtnTag.addEventListener("click", async (e) => {
    //   //
    //   await this.deleteCartProducts(e);
    //   copyTag.remove();
    // });
  }
};

Cart.prototype.deleteCartProducts = function (e) {
  //
  const shopName = e.target.dataset.name;
  const productNum = e.target.className.replace("cart-delete-btn", "");
  $.ajax({
    url: `/cart/delete/${shopName}/${productNum}`,
    type: "post",
  });
};
//
// 09.05.18 수정
