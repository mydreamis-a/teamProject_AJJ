// ㅜ 검색 관련 HTML 태그 생성하기
const productSearchPriceLabelTag = document.createElement("label");
productSearchPriceLabelTag.classList.add("product-search-price-start");
productSearchPriceLabelTag.setAttribute("for", "product-search-price-start");
productSearchPriceLabelTag.innerHTML = "가격 검색";
document.querySelector(".search").appendChild(productSearchPriceLabelTag);

const productSearchPriceStartTag = document.createElement("input");
productSearchPriceStartTag.id = "product-search-price-start";
productSearchPriceStartTag.classList.add("product-search");
productSearchPriceStartTag.setAttribute("type", "number");
productSearchPriceLabelTag.appendChild(productSearchPriceStartTag);

const productSearchPriceEndTag = document.createElement("input");
productSearchPriceEndTag.id = "product-search-price-end";
productSearchPriceEndTag.classList.add("product-search");
productSearchPriceEndTag.setAttribute("type", "number");
productSearchPriceStartTag.after(productSearchPriceEndTag);

const productSearchPriceBtnTag = document.createElement("input");
productSearchPriceBtnTag.id = "product-search-price-btn";
productSearchPriceBtnTag.classList.add("product-search");
productSearchPriceBtnTag.setAttribute("type", "button");
productSearchPriceBtnTag.setAttribute("value", "검색");
productSearchPriceEndTag.after(productSearchPriceBtnTag);

const productSortNewBtnTag = document.createElement("input");
productSortNewBtnTag.id = "product-sort-new";
productSortNewBtnTag.classList.add("product-search");
productSortNewBtnTag.setAttribute("type", "button");
productSortNewBtnTag.setAttribute("value", "신상품순");
productSearchPriceBtnTag.after(productSortNewBtnTag);

const productSortLowPriceBtnTag = document.createElement("input");
productSortLowPriceBtnTag.id = "product-sort-low-price";
productSortLowPriceBtnTag.classList.add("product-search");
productSortLowPriceBtnTag.setAttribute("type", "button");
productSortLowPriceBtnTag.setAttribute("value", "낮은가격순");
productSortNewBtnTag.after(productSortLowPriceBtnTag);

const productSortHighPriceBtnTag = document.createElement("input");
productSortHighPriceBtnTag.id = "product-sort-high-price";
productSortHighPriceBtnTag.classList.add("product-search");
productSortHighPriceBtnTag.setAttribute("type", "button");
productSortHighPriceBtnTag.setAttribute("value", "높은가격순");
productSortLowPriceBtnTag.after(productSortHighPriceBtnTag);

const productSearchNameTag = document.createElement("input");
productSearchNameTag.id = "product-search-name";
productSearchNameTag.classList.add("cart-input-search-item");
productSearchNameTag.setAttribute("type", "search");
productSortHighPriceBtnTag.after(productSearchNameTag);

const productSearchNameBtnTag = document.createElement("input");
productSearchNameBtnTag.id = "product-search-name-btn";
productSearchNameBtnTag.classList.add("product-search");
productSearchNameBtnTag.setAttribute("type", "button");
productSearchNameBtnTag.setAttribute("value", "검색");
productSearchNameTag.after(productSearchNameBtnTag);

const productSearchLastTag = document.createElement("div");
productSearchLastTag.classList.add("product-search-last");
productSearchLastTag.innerHTML = "최근검색어";
productSearchNameBtnTag.after(productSearchLastTag);

// 07 20 02 수정
