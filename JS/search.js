    let topCartSearchAlignment = document.createElement("label");
    topCartSearchAlignment.classList.add("cart-search-Alignment");
    topCartSearchAlignment.setAttribute("for", "priceSearch");
    topCartSearchAlignment.innerHTML = "가격검색"

    let topCartFirstPriceSearch = document.createElement("input");
    topCartFirstPriceSearch.setAttribute("type", "number");
    topCartFirstPriceSearch.id = "cartFirstPriceSearch";
    topCartFirstPriceSearch.classList.add("cart-search-item");
    topCartFirstPriceSearch.innerHTML = " ~ ";

    let topCartSecondPriceSearch = document.createElement("input");
    topCartSecondPriceSearch.id = "cartSecondPriceSearch"
    topCartSecondPriceSearch.classList.add("cart-search-item");
    topCartSecondPriceSearch.setAttribute("type", "number");

    let topCartSearchBtn = document.createElement("input");
    topCartSearchBtn.setAttribute("type", "button");
    topCartSearchBtn.classList.add("cart-search-item");
    topCartSearchBtn.id = "cartSearchBtn";
    topCartSearchBtn.setAttribute("value", "검색");

    let topCartNewProduct = document.createElement("input");
    topCartNewProduct.setAttribute("type", "button");
    topCartNewProduct.classList.add("cart-search-item");
    topCartNewProduct.id = "cartNewProduct";
    topCartNewProduct.setAttribute("value", "신상품순");

    let topCartRowSearchPrice = document.createElement("input");
    topCartRowSearchPrice.setAttribute("type", "button");
    topCartRowSearchPrice.classList.add("cart-search-item");
    topCartRowSearchPrice.id = "cartRowSearchPrice";
    topCartRowSearchPrice.setAttribute("value", "낮은가격순");

    let topCartHighSearchPrice = document.createElement("input");
    topCartHighSearchPrice.setAttribute("type", "button");
    topCartHighSearchPrice.classList.add("cart-search-item");
    topCartHighSearchPrice.id = "cartHighSearchPrice";
    topCartHighSearchPrice.setAttribute("value", "높은가격순");

    let topCartSearchText = document.createElement("input");
    topCartSearchText.setAttribute("type", "search");
    topCartSearchText.classList.add("cart-input-search-item");
    topCartSearchText.id = "cartSearchText";

    let topCartSearchTextBtn = document.createElement("input");
    topCartSearchTextBtn.setAttribute("type", "button");
    topCartSearchTextBtn.classList.add("cart-search-item");
    topCartSearchTextBtn.id = "cartSearchTextBtn";
    topCartSearchTextBtn.setAttribute("value", "검색");

    let topCartSearchTextBody = document.createElement("div");
    topCartSearchTextBody.classList.add("cart-search-text-body");
    topCartSearchTextBody.innerHTML = "최근검색어"

    document.querySelector(".search").appendChild(topCartSearchAlignment);
    topCartSearchAlignment.appendChild(topCartFirstPriceSearch);
    topCartFirstPriceSearch.after(topCartSecondPriceSearch);
    topCartSecondPriceSearch.after(topCartSearchBtn);
    topCartSearchBtn.after(topCartNewProduct);
    topCartNewProduct.after(topCartRowSearchPrice);
    topCartRowSearchPrice.after(topCartHighSearchPrice);
    topCartHighSearchPrice.after(topCartSearchText);
    topCartSearchText.after(topCartSearchTextBtn);
    topCartSearchTextBtn.after(topCartSearchTextBody);