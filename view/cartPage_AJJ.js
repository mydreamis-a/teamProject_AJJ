<<<<<<< HEAD
const cartModalContainerTag = document.querySelector(".cart-modal-container");
const cartExitBtnTag = document.querySelector(".cart-exit-btn");
const cartListRowTag = document.querySelector(".cart-list-row");
const cartIconTag = document.querySelector(".cart-icon");
=======
/**
 * 장바구니에 대한 클래스
 */
class Cart {
  constructor() { }
}
>>>>>>> 3bca3fb (정렬 기능 최적화 구현 완료)

// ㅜ 장바구니 아이콘을 클릭했을 때
cartIconTag.addEventListener("click", () => {
  //
  cartModalContainerTag.style.display = "block";
  $.ajax({
    url: "/cartList",
    type: "post",
    //
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
              createCartProducts(ajyProducts, "ajy");
              break;
            //
            case "jbhproducts":
              const jbhProducts = cartProducts[key];
              createCartProducts(jbhProducts, "jbh");
              break;
            //
            case "jjwproducts":
              const jjwProducts = cartProducts[key];
              createCartProducts(jjwProducts, "jjw");
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

/**
 * 각 상점의 상품 번호를 통해 상품 목록의 태그를 복사해서 장바구니 화면에 추가하는 함수
 * @param {Array} products
 * @param {string} shopName
 */
function createCartProducts(products, shopName) {
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
<<<<<<< HEAD
}

// 08.29.02 수정
=======
};
//
// 09.01.08 수정
>>>>>>> 3bca3fb (정렬 기능 최적화 구현 완료)
