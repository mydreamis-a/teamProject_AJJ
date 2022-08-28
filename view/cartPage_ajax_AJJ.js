const { log } = console;

const cartModalContainerTag = document.querySelector(".cart-modal-container");
const cartExitBtnTag = document.querySelector(".cart-exit-btn");
const cartIconTag = document.querySelector(".cart-icon");

// ㅜ 장바구니 아이콘을 클릭했을 때
cartIconTag.addEventListener("click", () => {
    //
    cartModalContainerTag.style.display = "block";
    $.ajax({
        url: "/cartList",
        type: "post",
        //
        success: (cartProducts) => {
            // log(cartProducts);
            for (const key in cartProducts) {
                if (Object.hasOwnProperty.call(cartProducts, key)) {
                    //
                    switch (key) {
                        //
                        case "ajyproducts":
                            // log(cartProducts[key]);
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
            const cartTotalAmountTag = document.querySelector(".cart-total-amount");
            cartTotalAmountTag.innerHTML = `총 합계 금액: 0000000000 원`;
        }
    })
})

// ㅜ 장바구니 화면에서 나가기 버튼을 클릭했을 때
cartExitBtnTag.addEventListener("click", () => {
    cartModalContainerTag.style.display = "none";
})

/**
 * 각 상점의 상품 번호를 통해 상품 목록의 태그를 복사해서 장바구니 화면에 추가하는 함수
 * @param {Array} products 
 * @param {string} shopName 
 */
function createCartProducts(products, shopName) {
    //
    const cartListRowTag = document.querySelector(".cart-list-row");
    //
    products.forEach(el => {
        //
        const productNum = el[`${shopName}product_num`];
        const productTag = document.querySelector(`[class = "in-cart-btn${productNum}"][data-name = "${shopName}"]`).closest(".product-list-col");
        //
        cartListRowTag.appendChild(productTag.cloneNode(true));
    });
};

// 08.29.01 수정