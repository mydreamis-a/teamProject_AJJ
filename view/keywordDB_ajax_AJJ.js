const { log } = console;
const productKeywordTag = document.createElement("input");
const productKeywordBtnTag = document.createElement("input");

// ㅜ 검색 창에 검색어를 입력하고 검색 버튼을 클릭했을 때
productKeywordBtnTag.addEventListener("click", () => {
    //
});

// ㅜ 검색 창에 검색어를 입력하고 엔터를 입력했을 때
productKeywordTag.addEventListener("keypress", (e) => {
    if (e.code === "Enter") {
    }
});

function saveKeyword() {
    //
    const keyword = productKeywordTag.value;
    $.ajax({
        url: "/keyword",
        type: "post",
        data: { keyword },
    })
}