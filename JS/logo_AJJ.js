class logo {
  constructor() {
    this.members = ["안주영", "주병현", "장지원"];
    this.typingTextTag = document.querySelector('.typing-text');
    this.accentTextTag = document.querySelector('.accent-text');
    this.arrIdx = 0;
    this.textIdx = 0;
    // clearInterval 하기 위해서 변수로 설정해줘야 함 (반복 호출의 함수 실행)
    this._setInterval = setInterval(() => this.typingEvent(), 1000);
  }

  typingEvent() {

    // 한 사람의 글자를 모두 처리해줬는지
    if (this.members[this.arrIdx].length > this.textIdx) {
      this.typingTextTag.innerHTML += this.members[this.arrIdx][this.textIdx];
      this.textIdx++;
    } else {
      
      // 한 사람분을 모두 끝냈다면
      this.arrIdx++;
      this.textIdx = 0;
      this.removeEvent();
      clearInterval(this._setInterval);
      setTimeout(() => {
        this.removeEvent(); // 1초 뒤에 실행
        setTimeout(() => {
          this.accentText(); // 1+1초 뒤에 실행
          this._setInterval = setInterval(() => {
            this.typingEvent();
          }, 1000);
          if (this.arrIdx > this.members.length - 1) {
            clearInterval(this._setInterval);
            setTimeout(() => {
              // 1+1+5초 뒤에 실행
              this.accentTextTag.innerHTML = "";
              this.typingTextTag.innerHTML = "";
              this.arrIdx = 0;
              this._setInterval = setInterval(() => {
                this.typingEvent();
              }, 1000);
            }, 5000);
          }
        }, 1000);
      }, 1000);
    }
  }

  // 기존 텍스트를 가져와서 한 글자를 지운 다음 다시 넣어주는 함수
  removeEvent() {
    let currentText = this.typingTextTag.innerHTML.split("");
    currentText.pop();
    currentText = currentText.join("");
    this.typingTextTag.innerHTML = currentText;
  }

  // 기존 텍스트를 강조하는 클래스 태그로 넣어주는 함수
  accentText() {
    this.accentTextTag.innerHTML += this.typingTextTag.innerHTML;
    this.typingTextTag.innerHTML = "";
  }
}
