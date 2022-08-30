function incart(shopName, productNum) {
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
}

// 08.30.16 수정
