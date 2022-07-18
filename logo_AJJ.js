class logo {
    constructor() {
        this.members = ["안주영", "주병현", "장지원"];
        this.typingTextTag = document.querySelector(".typing-text");
        this.accentTextTag = document.querySelector('.accent-text');
        this.arrIdx = 0;
        this.textIdx = 0;
        // clearInterval 하기 위해서 변수로 설정해줘야 함 (반복 호출의 함수 실행)
        this._setInterval = setInterval(() => { this.typingEvent(); }, 1000);
    }
    typingEvent() {
        let _this = this;
        // 한 사람의 글자를 모두 처리해줬는지
        if (_this.members[_this.arrIdx].length > _this.textIdx) {
            _this.typingTextTag.innerHTML += _this.members[_this.arrIdx][_this.textIdx];
            _this.textIdx++;
        }
        else { // 한 사람분을 모두 끝냈다면
            _this.arrIdx++;
            _this.textIdx = 0;
            _this.removeEvent();
            clearInterval(_this._setInterval);
            setTimeout(() => {
                _this.removeEvent(); // 1초 뒤에 실행
                setTimeout(() => {
                    _this.accentText(); // 1+1초 뒤에 실행
                    _this._setInterval = setInterval(() => { _this.typingEvent(); }, 1000);
                    if (_this.arrIdx > _this.members.length - 1) {
                        clearInterval(_this._setInterval);
                        setTimeout(() => { // 1+1+5초 뒤에 실행
                            _this.accentTextTag.innerHTML = "";
                            _this.typingTextTag.innerHTML = "";
                            _this.arrIdx = 0;
                            _this._setInterval = setInterval(() => { _this.typingEvent(); }, 1000);
                        }, 5000);
                    }
                }, 1000);
            }, 1000);
        }
    }
    // 기존 텍스트를 가져와서 한 글자를 지운 다음 다시 넣어주는 함수
    removeEvent() {
        let _this = this;
        let currentText = _this.typingTextTag.innerHTML.split("");
        currentText.pop();
        currentText = currentText.join("");
        _this.typingTextTag.innerHTML = currentText;
    }
    // 기존 텍스트를 강조하는 클래스 태그로 넣어주는 함수
    accentText() {
        let _this = this;
        _this.accentTextTag.innerHTML += _this.typingTextTag.innerHTML;
        _this.typingTextTag.innerHTML = "";
    }
}

// 07 07 16 최종 수정