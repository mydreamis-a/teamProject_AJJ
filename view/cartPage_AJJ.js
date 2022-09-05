/**
 * 장바구니에 대한 클래스
 */
class Cart {
  constructor() { }
}

////////////////////////////////////////
/**
 * 장바구니에 상품을 담는 ajax에 대한 함수
 */
Cart.prototype.inCartAjax = function () {
  //
  const shopName = event.target.dataset.name;
  const productNum = event.target.className.replace("in-cart-btn", "");
  $.ajax({
    //
    url: `/cart/${shopName}/${productNum}`,
    type: "post",

    //////////////////////////////
    /**
     * 장바구니 수량을 수정하는 함수
     * @param {object} { 장바구니에 담긴 모든 상품의 수량 }
     */
    success: ({ cartTotalCount }) => {
      const cartTotalCountNumberTag = document.querySelector(".cart-total-count-number");
      cartTotalCountNumberTag.innerHTML = cartTotalCount;
    },
  });
};

////////////////////////////////////////////////////////
/**
 * 장바구니 아이콘을 클릭하면 장바구니 화면을 보여주는 함수
 */
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
      /**
       * 장바구니에 담긴 상품의 태그를 생성하는 함수
       * @param {object} { [ {ajyproduct_num: null, jbhproduct_num: null, jjwproduct_num: number, prodcut_count: number, JJWproduct: { price: number } } ] } 
       */
      success: ({ cartProducts }) => {
        //
        let totalprice = 0;
        const cartTotalAmountTag = document.querySelector("#cart-total-price");
        //
        cartProducts.forEach(el => {
          //
          let shopName = null;
          let productNum = 0;
          //
          if (el.ajyproduct_num !== null) {
            shopName = shopNameArr[0];
            productNum = el.ajyproduct_num;
          }
          else if (el.jbhproduct_num !== null) {
            shopName = shopNameArr[1];
            productNum = el.jbhproduct_num;
          }
          else if (el.jjwproduct_num !== null) {
            shopName = shopNameArr[2];
            productNum = el.jjwproduct_num;
          }
          const productCount = el.product_count;
          const _shopName = shopName.toUpperCase();
          totalprice += el[`${_shopName}product`].price;
          this.createCartProducts(shopName, productNum, productCount);
        })
        cartTotalAmountTag.innerHTML = `총 합계 금액: ${totalprice} 원`;
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
  //
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
  })
}
//
// 09.04.21 수정
