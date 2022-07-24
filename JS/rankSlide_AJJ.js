class JangRankSlide {
  constructor(classNameValue) {
    this.index = 1;
    this.prevIndex;
    this.margin = 0;
    this.slideWidth = 19.7;
    this.slideHeight = 6;
    this._setTimeout = null;
    this.autoPlayFn = "first";
    this.resizeControl = null;
    this.slideSecond = 0.5 * 2;
    this.imgHeight = -this.slideHeight;
    this.slideWrapTag = document.querySelector(`.${classNameValue}-slide-wrap`);
    this.imgTags = document.querySelectorAll(`[class ^= "${classNameValue}-img"]`);
    this.slideContainerTag = document.querySelector(`.${classNameValue}-slide-container`);
    this.init(classNameValue);
  }
  init(classNameValue) {

    // ㅜ 드래그, 우클릭, 블럭 방지하기
    window.document.ondragstart = new Function("return false");
    window.document.oncontextmenu = new Function("return false");
    window.document.onselectstart = new Function("return false");

    // ㅜ 태그의 번호 넣기
    this.imgTags.forEach((el, idx) => {
      const str = el.children[0].innerHTML;
      el.children[0].innerHTML = `${idx + 1}. ${str}`;
    });

    // ㅜ 마지막 슬라이드를 맨 앞에 복사해놓기
    window["copyTag"] = this.imgTags[this.imgTags.length - 1].cloneNode(true);
    this.slideWrapTag.insertBefore(window["copyTag"], this.imgTags[0]);
    this.imgTags = document.querySelectorAll(`[class ^= "${classNameValue}-img"]`);

    // ㅜ 슬라이드의 width, height, margin 설정하기
    this.slideContainerTag.style.width = `${this.slideWidth}vw`;
    this.slideContainerTag.style.height = `${this.slideHeight}vh`;
    this.imgTags.forEach((el) => {
      el.style.margin = `${this.margin}vw`;
      el.style.transition = `${this.slideSecond}s`;
      el.style.width = `${this.slideWidth - this.margin * 2}vw`;
      el.style.height = `${this.slideHeight - this.margin * 2}vh`;
    });

    // ㅜ 자동 슬라이드 시작하기
    this.autoPlay("next");

    // ㅜ 마우스를 올렸을 때
    this.slideContainerTag.addEventListener("mouseenter", () => {
      clearInterval(this._setTimeout);
      clearInterval(this.autoPlayFn);

      this.imgTags[0].style.display = "none";
      this.slideWrapTag.style.transition = "";
      this.imgTags[this.index].style.color = "";
      this.slideContainerTag.style.overflow = "visible";
      this.slideWrapTag.style.transform = `translateY(0vh)`;

      // ㅜ 첫 번째 태그의 색상 변화시키기
      this._setTimeout = setTimeout(() => {
        this.index = 1;
        this.imgTags[this.index].style.color = "royalblue";

        // ㅜ 자동 슬라이드 시작하기
        this.autoPlayFn = null;
        this.autoPlay("not");
      }, this.slideSecond * 500);
    });

    // ㅜ 마우스가 벗어났을 때
    this.slideContainerTag.addEventListener("mouseleave", () => {
      clearInterval(this._setTimeout);
      clearInterval(this.autoPlayFn);

      this.imgTags[0].style.display = "flex";
      this.imgTags[this.index].style.color = "";
      this.slideContainerTag.style.overflow = "hidden";
      this.slideWrapTag.style.transform = `translateY(-${this.slideHeight}vh)`;

      this.index = 1;
      this.autoPlayFn = "first";
      this.autoPlay("next");
    });

    // ㅜ 창의 크기가 변경될 때
    window.addEventListener("resize", () => {
      
      // ㅜ 트랜지션을 비롯해서 모두 초기화시키기
      clearInterval(this.resizeControl);
      clearInterval(this._setTimeout);
      clearInterval(this.autoPlayFn);
      this.slideWrapTag.style.transition = "";
      this.imgTags.forEach((el, idx) => {
        el.style.transition = "";
      });

      // ㅜ 자동 슬라이드 시작하기
      this.resizeControl = setTimeout(() => {
        this.autoPlayFn = null;
        this.autoPlay("next");
      }, 10);
    });
  }

  autoPlay(str) {
    if (this.autoPlayFn === "first") {
      // ㅜ 첫 화면에 첫 번째의 태그가 보이게끔 Y 위치 조정하기
      this.slideWrapTag.style.transform = `translateY(-${this.slideHeight}vh)`;

      // ㅜ 첫 번째 태그의 색상 변화시키기
      this._setTimeout = setTimeout(() => {
        this.imgTags[this.index].style.color = "royalblue";
        this.slideWrapTag.style.transition = `${this.slideSecond}s`;

        // ㅜ 다음 태그로 Y 위치 조정하기
        this._setTimeout = setTimeout(() => {
          this.prevIndex = this.index;
          this.index++;
          this.slideWrapTag.style.transform = `translateY(${this.index * this.imgHeight}vh)`;

          // ㅜ 다음 태그와 이전 태그의 색상 변화시키기
          this._setTimeout = setTimeout(() => {
            this.imgTags[this.index].style.color = "royalblue";
            this.imgTags[this.prevIndex].style.color = "";

            // ㅜ 자동 슬라이드 시작하기
            this.autoPlayFn = null;
            this.autoPlay(str);
          }, this.slideSecond * 500);
        }, this.slideSecond * 1500);
      }, this.slideSecond * 500);
    } else if (this.autoPlayFn === null) {
      this.autoPlayFn = setInterval(() => {
        this.move(str);
      }, this.slideSecond * 2000);
    }
  }
  move(str) {
    this.slideWrapTag.style.transition = `${this.slideSecond}s`;
    if (str === "next") {

      // ㅜ 다음 태그로 Y 위치 조정하기
      this.prevIndex = this.index;
      this.index++;
      this.slideWrapTag.style.transform = `translateY(${this.index * this.imgHeight}vh)`;

      // ㅜ 다음 태그와 이전 태그의 색상 변화시키기
      this._setTimeout = setTimeout(() => {
        this.imgTags[this.index].style.color = "royalblue";
        this.imgTags[this.prevIndex].style.color = "";

        // ㅜ 마지막 태그일 경우 복사해둔 Y 위치로 이동하기
        this._setTimeout = setTimeout(() => {
          if (this.index >= this.imgTags.length - 1) {
            this.index = 0;
            this.slideWrapTag.style.transition = "";
            this.imgTags[this.index].style.color = "royalblue";
            this.slideWrapTag.style.transform = `translateY(0vh)`;
          }
        }, this.slideSecond * 500);
      }, this.slideSecond * 500);
    }

    // ㅜ 위치는 이동하기 않고 글자 색상만 변화시키기
    else if (str === "not") {
      this._setTimeout = setTimeout(() => {

        // ㅜ 이전 태그의 색상 돌려놓기
        this.prevIndex = this.index;
        this.imgTags[this.prevIndex].style.color = "";

        // ㅜ 다음 태그의 색상 변화시키기
        if (this.index >= this.imgTags.length - 1) this.index = 1;
        else this.index++;
        this.imgTags[this.index].style.color = "royalblue";
      }, this.slideSecond * 500);
    }
  }
  pxToVw(value) {
    const bodyWidth = document.body.offsetWidth;
    return (value / bodyWidth) * 100;
  }
}