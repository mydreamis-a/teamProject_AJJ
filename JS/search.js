const productSearchPriceLabelTag = document.createElement("label");
productSearchPriceLabelTag.classList.add("product-search-price-start");
productSearchPriceLabelTag.setAttribute("for", "product-search-price-start");
productSearchPriceLabelTag.innerHTML = "가격 검색";
document.querySelector(".search").appendChild(productSearchPriceLabelTag);

const productSearchPriceStartTag = document.createElement("input");
productSearchPriceStartTag.id = "product-search-price-start";
productSearchPriceStartTag.classList.add("product-search");
productSearchPriceStartTag.setAttribute("type", "number");

const productSearchPriceEndTag = document.createElement("input");
productSearchPriceEndTag.id = "product-search-price-end";
productSearchPriceEndTag.classList.add("product-search");
productSearchPriceEndTag.setAttribute("type", "number");

const topCartSearchBtn = document.createElement("input");
topCartSearchBtn.id = "product-search-btn";
topCartSearchBtn.classList.add("product-search");
topCartSearchBtn.setAttribute("type", "button");
topCartSearchBtn.setAttribute("value", "검색");

const topCartNewProduct = document.createElement("input");
topCartNewProduct.setAttribute("type", "button");
topCartNewProduct.classList.add("product-search");
topCartNewProduct.id = "cartNewProduct";
topCartNewProduct.setAttribute("value", "신상품순");

const topCartRowSearchPrice = document.createElement("input");
topCartRowSearchPrice.setAttribute("type", "button");
topCartRowSearchPrice.classList.add("product-search");
topCartRowSearchPrice.id = "cartRowSearchPrice";
topCartRowSearchPrice.setAttribute("value", "낮은가격순");

const topCartHighSearchPrice = document.createElement("input");
topCartHighSearchPrice.setAttribute("type", "button");
topCartHighSearchPrice.classList.add("product-search");
topCartHighSearchPrice.id = "cartHighSearchPrice";
topCartHighSearchPrice.setAttribute("value", "높은가격순");

const topCartSearchText = document.createElement("input");
topCartSearchText.setAttribute("type", "search");
topCartSearchText.classList.add("cart-input-search-item");
topCartSearchText.id = "search-input";

const topCartSearchTextBtn = document.createElement("input");
topCartSearchTextBtn.setAttribute("type", "button");
topCartSearchTextBtn.classList.add("product-search");
topCartSearchTextBtn.id = "cartSearchTextBtn";
topCartSearchTextBtn.setAttribute("value", "검색");

const topCartSearchTextBody = document.createElement("div");
topCartSearchTextBody.classList.add("cart-search-text-body");
topCartSearchTextBody.innerHTML = "최근검색어";

topCartSearchAlignment.appendChild(topCartFirstPriceSearch);
topCartFirstPriceSearch.after(topCartSecondPriceSearch);
topCartSecondPriceSearch.after(topCartSearchBtn);
topCartSearchBtn.after(topCartNewProduct);
topCartNewProduct.after(topCartRowSearchPrice);
topCartRowSearchPrice.after(topCartHighSearchPrice);
topCartHighSearchPrice.after(topCartSearchText);
topCartSearchText.after(topCartSearchTextBtn);
topCartSearchTextBtn.after(topCartSearchTextBody);
