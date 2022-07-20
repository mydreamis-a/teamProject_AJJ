class JangRankSlide {
  constructor(classNameValue) {
    this.index = 1;
    this.prevIndex;
    this.margin = 0;
    this.slideWidth = 19.7;
    this.slideHeight = 6;
    this._setTimeOut = null;
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
    let _this = this;

    // ㅜ 드래그, 우클릭, 블럭 방지하기
    window.document.ondragstart = new Function("return false");
    window.document.oncontextmenu = new Function("return false");
    window.document.onselectstart = new Function("return false");

    // ㅜ 태그의 번호 넣기
    _this.imgTags.forEach((el, idx, arr) => {
      const str = el.children[0].innerHTML;
      el.children[0].innerHTML = `${idx + 1}. ${str}`;
    });

    // ㅜ 마지막 슬라이드를 맨 앞에 복사해놓기
    window["copyTag"] = _this.imgTags[_this.imgTags.length - 1].cloneNode(true);
    _this.slideWrapTag.insertBefore(window["copyTag"], _this.imgTags[0]);
    _this.imgTags = document.querySelectorAll(`[class ^= "${classNameValue}-img"]`);

    // ㅜ 슬라이드의 width, height, margin 설정하기
    _this.slideContainerTag.style.width = `${_this.slideWidth}vw`;
    _this.slideContainerTag.style.height = `${_this.slideHeight}vh`;
    _this.imgTags.forEach((el) => {
      el.style.margin = `${_this.margin}vw`;
      el.style.transition = `${_this.slideSecond}s`;
      el.style.width = `${_this.slideWidth - _this.margin * 2}vw`;
      el.style.height = `${_this.slideHeight - _this.margin * 2}vh`;
    });

    // ㅜ 자동 슬라이드 시작하기
    _this.autoPlay("next");

    // ㅜ 마우스를 올렸을 때
    _this.slideContainerTag.onmouseenter = () => {
      clearInterval(_this._setTimeOut);
      clearInterval(_this.autoPlayFn);

      _this.imgTags[0].style.display = "none";
      _this.slideWrapTag.style.transition = "";
      _this.imgTags[_this.index].style.color = "";
      _this.slideContainerTag.style.overflow = "visible";
      _this.slideWrapTag.style.transform = `translateY(0vh)`;

      // ㅜ 첫 번째 태그의 색상 변화시키기
      _this._setTimeOut = setTimeout(() => {
        _this.index = 1;
        _this.imgTags[_this.index].style.color = "royalblue";

        // ㅜ 자동 슬라이드 시작하기
        _this.autoPlayFn = null;
        _this.autoPlay("not");
      }, _this.slideSecond * 500);
    };

    // ㅜ 마우스가 벗어났을 때
    _this.slideContainerTag.onmouseleave = () => {
      clearInterval(_this._setTimeOut);
      clearInterval(_this.autoPlayFn);

      _this.imgTags[0].style.display = "flex";
      _this.imgTags[_this.index].style.color = "";
      _this.slideContainerTag.style.overflow = "hidden";
      _this.slideWrapTag.style.transform = `translateY(-${_this.slideHeight}vh)`;

      _this.index = 1;
      _this.autoPlayFn = "first";
      _this.autoPlay("next");
    };

    // ㅜ 창의 크기가 변경될 때
    window.addEventListener("resize", () => {
      // ㅜ 트랜지션을 비롯해서 모두 초기화시키기
      clearInterval(_this.resizeControl);
      clearInterval(_this._setTimeOut);
      clearInterval(_this.autoPlayFn);
      _this.slideWrapTag.style.transition = "";
      _this.imgTags.forEach((el, idx) => {
        el.style.transition = "";
      });

      // ㅜ 자동 슬라이드 시작하기
      _this.resizeControl = setTimeout(() => {
        _this.autoPlayFn = null;
        _this.autoPlay("next");
      }, 10);
    });
  }

  autoPlay(str) {
    let _this = this;
    if (_this.autoPlayFn === "first") {
      // ㅜ 첫 화면에 첫 번째의 태그가 보이게끔 Y 위치 조정하기
      _this.slideWrapTag.style.transform = `translateY(-${_this.slideHeight}vh)`;

      // ㅜ 첫 번째 태그의 색상 변화시키기
      _this._setTimeOut = setTimeout(() => {
        _this.imgTags[_this.index].style.color = "royalblue";
        _this.slideWrapTag.style.transition = `${_this.slideSecond}s`;

        // ㅜ 다음 태그로 Y 위치 조정하기
        _this._setTimeOut = setTimeout(() => {
          _this.prevIndex = _this.index;
          _this.index++;
          _this.slideWrapTag.style.transform = `translateY(${_this.index * _this.imgHeight}vh)`;

          // ㅜ 다음 태그와 이전 태그의 색상 변화시키기
          _this._setTimeOut = setTimeout(() => {
            _this.imgTags[_this.index].style.color = "royalblue";
            _this.imgTags[_this.prevIndex].style.color = "";

            // ㅜ 자동 슬라이드 시작하기
            _this.autoPlayFn = null;
            _this.autoPlay(str);
          }, _this.slideSecond * 500);
        }, _this.slideSecond * 1500);
      }, _this.slideSecond * 500);
    } else if (_this.autoPlayFn === null) {
      _this.autoPlayFn = setInterval(() => {
        _this.move(str);
      }, _this.slideSecond * 2000);
    }
  }
  move(str) {
    let _this = this;
    _this.slideWrapTag.style.transition = `${_this.slideSecond}s`;
    if (str === "next") {
      // ㅜ 다음 태그로 Y 위치 조정하기
      _this.prevIndex = _this.index;
      _this.index++;
      _this.slideWrapTag.style.transform = `translateY(${_this.index * _this.imgHeight}vh)`;

      // ㅜ 다음 태그와 이전 태그의 색상 변화시키기
      _this._setTimeOut = setTimeout(() => {
        _this.imgTags[_this.index].style.color = "royalblue";
        _this.imgTags[_this.prevIndex].style.color = "";

        // ㅜ 마지막 태그일 경우 복사해둔 Y 위치로 이동하기
        _this._setTimeOut = setTimeout(() => {
          if (_this.index >= _this.imgTags.length - 1) {
            _this.index = 0;
            _this.slideWrapTag.style.transition = "";
            _this.imgTags[_this.index].style.color = "royalblue";
            _this.slideWrapTag.style.transform = `translateY(0vh)`;
          }
        }, _this.slideSecond * 500);
      }, _this.slideSecond * 500);
    }

    // ㅜ 위치는 이동하기 않고 글자 색상만 변화시키기
    else if (str === "not") {
      _this._setTimeOut = setTimeout(() => {
        // ㅜ 이전 태그의 색상 돌려놓기
        _this.prevIndex = _this.index;
        _this.imgTags[_this.prevIndex].style.color = "";

        // ㅜ 다음 태그의 색상 변화시키기
        if (_this.index >= _this.imgTags.length - 1) _this.index = 1;
        else _this.index++;
        _this.imgTags[_this.index].style.color = "royalblue";
      }, _this.slideSecond * 500);
    }
  }
  pxToVw(value) {
    const bodyWidth = document.body.offsetWidth;
    return (value / bodyWidth) * 100;
  }
}

// 07 13 20 최종 수정
