const { log } = console;

function incart(shopName, productNum) {
  $.ajax({
    //
    url: `/cart/${shopName}${productNum}`,
    type: "post",
  });
}
