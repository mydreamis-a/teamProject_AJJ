/**
 * 장바구니에 대한 클래스
 */
class Cart {
  constructor() { }
}

///////////////////////////////////////////////////////
/**
 * 장바구니 아이콘을 클릭하면 장바구니 화면을 보여주는 함수
 */
Cart.prototype.clickCartIcon = function () {
  //
  const cartModalContainerTag = document.querySelector(".cart-modal-container");
  const cartExitBtnTag = document.querySelector(".cart-exit-btn");
  const cartListRowTag = document.querySelector(".cart-list-row");
  const cartIconTag = document.querySelector(".cart-icon");
  //
  cartIconTag.addEventListener("click", () => {
    //
    cartModalContainerTag.style.display = "block";
    $.ajax({
      url: "/cart/list",
      type: "post",
      //
      /**
       * 장바구니에 담긴 상품 목록을 태그로 생성하기 위해 각 상점별로 분류하는 함수
       * @param {object} cartProducts { ajyproducts, jbhproducts, jjwproducts }
       */
      success: (cartProducts) => {
        let totalprice = 0;
        //
        cartListRowTag.innerHTML = "";
        //
        for (const key in cartProducts) {
          if (Object.hasOwnProperty.call(cartProducts, key)) {
            //
            switch (key) {
              //
              case "ajyproducts":
                const ajyProducts = cartProducts[key];
                this.createCartProducts(ajyProducts, "ajy");
                break;
              //
              case "jbhproducts":
                const jbhProducts = cartProducts[key];
                this.createCartProducts(jbhProducts, "jbh");
                break;
              //
              case "jjwproducts":
                const jjwProducts = cartProducts[key];
                this.createCartProducts(jjwProducts, "jjw");
                break;
              default:
                break;
            }
          }
        }
        const cartTotalAmountTag = document.querySelector(".cart-total-price");
        cartTotalAmountTag.innerHTML = `총 합계 금액: 0000000000 원`;
      },
    });
  });
  // ㅜ 장바구니 화면에서 나가기 버튼을 클릭했을 때
  cartExitBtnTag.addEventListener("click", () => {
    cartModalContainerTag.style.display = "none";
  });
};

////////////////////////////////////////
/**
 * 장바구니에 상품을 담는 ajax에 대한 함수
 * @param {*} shopName 상점 이름
 * @param {*} productNum 1부터 시작하는 상품 번호
 */
Cart.prototype.inCartAjax = function (shopName, productNum) {
  //
  // ㅜ 비회원으로 가정
  const id = null;
  $.ajax({
    //
    url: `/cart/${shopName}${productNum}`,
    type: "post",
    data: { id },
    //
    success: (result) => {
      const cartTotalCountNumberTag = document.querySelector(".cart-total-count-number");
      cartTotalCountNumberTag.innerHTML = result.count;
    },
  });
};

////////////////////////////////////////////////////////////////////////////////////////
/**
 * 각 상점의 상품 번호를 통해 상품 목록의 태그를 복사해서 장바구니 화면에 태그를 생성하는 함수
 * @param {Array} products 각 상점별로 분류한 장바구니 상품
 * @param {string} shopName 상점 이름
 */
Cart.prototype.createCartProducts = function (products, shopName) {
  //
  products.forEach((el) => {
    const productNum = el[`${shopName}product_num`];
    //
    for (let i = 0; i < el.product_count; i++) {
      //
      const inCartBtnTag = document.querySelector(`[class = "in-cart-btn${productNum}"][data-name = "${shopName}"]`);
      //
      const copyTag = inCartBtnTag.closest(".product-list-col").cloneNode(true);
      const cartDeleteBtnTag = copyTag.querySelector(`.in-cart-btn${productNum}`);
      //
      cartDeleteBtnTag.className = `cart-delete-btn${productNum}`;
      cartDeleteBtnTag.setAttribute("value", "삭제하기");
      cartDeleteBtnTag.removeAttribute("onclick");
      //
      const cartListRowTag = document.querySelector(".cart-list-row");
      cartListRowTag.appendChild(copyTag);
    }
  });
};
//
// 09.01.08 수정
