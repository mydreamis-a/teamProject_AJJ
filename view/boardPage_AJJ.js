 function boardAjax (_this)  {
    //
    const boardMessage = "술잔 옆에 안주로 따뜻한 음악 하나, 꼭 챙겨드세요.";
    const productName = _this.parentElement.parentElement.parentElement.firstElementChild.innerHTML;
    //
    if (boardMessage !== productName) return;
    $.ajax({
        //
        url: "/board",
        type: "post",
        success: () => {
            window.location.href = "/board";
        }
    })
}
//
// 09.15.10 수정