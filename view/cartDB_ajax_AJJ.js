function incart(shopName, productNum) {
  $.ajax({
    //
    url: `/cart/${shopName}${productNum}`,
    type: "post",
    //
    success: (result) => {
      const cartTotalCountNumberTag = document.querySelector(".cart-total-count-number");
      cartTotalCountNumberTag.innerHTML = result.count;
    }
  });
}

// 08.28.04 수정