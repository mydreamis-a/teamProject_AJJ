const boardAjax = () => {
    //
    const boardMessage = "술잔 옆에 안주로 따뜻한 음악 하나, 꼭 챙겨드세요.";
    const productName = event.target.parentElement.parentElement.parentElement.firstElementChild.innerHTML;
    //
    if (boardMessage !== productName) return;
    $.ajax({
        //
        url: "/board",
        type: "post"
    })
}
//
// 09.15.02 수정