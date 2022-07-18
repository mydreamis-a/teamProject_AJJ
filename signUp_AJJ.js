class signUp {
    constructor() {
        this.regName = /^[가-힣a-zA-Z]{2,}$/;
        this.regTel = /^[0](\d{2,3})(\d{3,4})(\d{3,4})$/;
        this.regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        this.regPassword = /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?=[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{6,}$/;
        this.inputTags = document.querySelectorAll("[id ^= 'input-']");
        this.formTag = document.querySelector("form");
        this.regs = [this.regName, this.regTel, this.regEmail, this.regPassword, ,];
        this.disallowMessages = [];
        this.signupIcon = document.querySelector(".signup-icon");
        this.signupModal = document.querySelector('.signup-modal');
        // this.signUpDelete = document.querySelector('.sign-up-delete');
        this.init();
    }
    init() {
        let _this = this;
        _this.signupModal.style.display = "none";
        _this.signupIcon.addEventListener("click", function () {
            if(userSignInInfor.email!="" && userSignInInfor.pw!=""){
             alert(userSignInInfor.name+" 님은 이미 로그인 정보가 있습니다!");
             _this.signupModal.style.display = "none";
            }
            else{
                _this.signupModal.style.display = "block";
            }
        });

        Object.prototype.insertAfter = function (newNode) {
            this.parentNode.insertBefore(newNode, this.nextSibling);
        };

        _this.disallowMessages.push("한글 또는 영어로 2글자 이상 입력해야 합니다.");
        _this.disallowMessages.push("0으로 시작하는 숫자 9~12자리를 입력해야 합니다.");
        _this.disallowMessages.push("이메일 형식을 지켜서 입력해야 합니다.");
        _this.disallowMessages.push("영문, 숫자, 특수 문자 중에서 2가지 이상을 조합하여 6글자 이상 입력해야 합니다.");
        _this.disallowMessages.push("동일하게 입력되어야 합니다.");

        // input에 값을 입력했을 때
        _this.inputTags.forEach((el, idx) => {
            el.oninput = () => {
                _this.regs[_this.regs.length - 1] = new RegExp("^" + _this.inputTags[3].value + "$");
                const rslt = _this.regs[idx].test(el.value);
                const welcomeTag = document.querySelector(".welcome-msg");
                if (idx === 0) welcomeTag.innerHTML = `${el.value}님 환영합니다!`
                _this.regStyle(rslt, el);

                // 유효성 검증에 허용되는 값을 입력했는지
                if (!rslt) _this.disallowEvent(el, idx);
                else {
                    if (el.nextElementSibling.classList.contains("disallow-massage")) {
                        el.nextElementSibling.remove();
                    }
                }
            }
        });

        // submit 기능을 하는 버튼을 클릭했을 때
        _this.formTag.addEventListener("submit", (event) => {
            const rsltArr = _this.regRslt();
            event.preventDefault();
            event.stopPropagation();
            if (rsltArr.every((value) => value === true)) {
                const userName = document.querySelector('#input-name').value;
                alert(userName + "님, 환영합니다.\n회원가입이 완료되었습니다.");
                _this.formTag.submit();
            }
        })
    }
    // 유효성 검증의 통과 여부에 따라 class를 적용하는 함수
    regStyle(rslt, el) {
        // 통과
        if (rslt) {
            el.classList.remove("is-invalid");
            el.classList.add("is-valid");
        }
        // 불허
        else {
            el.classList.remove("is-valid");
            el.classList.add("is-invalid");
        }
    }
    // 유효성이 허용되지 않았을 때 메세지를 보여주는 함수
    disallowEvent(el, idx) {
        let _this = this;
        // nextElementSibling 다음 형제 태그
        if (!el.nextElementSibling.classList.contains("disallow-massage")) {
            const smallTag = document.createElement("small");
            smallTag.classList.add("disallow-massage");
            smallTag.innerHTML = _this.disallowMessages[idx];
            el.insertAfter(smallTag);
        }
    }
    // 모든 input의 유효성 검증의 통과 여부를 배열에 담는 함수
    regRslt() {
        let _this = this;
        let rsltArr = [];
        _this.inputTags.forEach((el, idx) => {
            rsltArr.push(_this.regs[idx].test(el.value));
        })
        return rsltArr;
    }
}

// 07 11 12 최종 수정