const cartIconTag = document.querySelector(".cart-icon");
cartIconTag.addEventListener("click", () => {
    //
    $.ajax({
        url: "/cartList",
        type: "post",
    })
})