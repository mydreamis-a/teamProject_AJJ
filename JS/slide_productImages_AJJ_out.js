class JangSubSlide {
  constructor(classNameValue) {
    this.imgCount = 10;
    this.slideSecond = 3;
    this.slideWidth = 60;
    this.slideHeight = this.slideWidth / this.imgCount;
    this.slideContainerTag = document.querySelector(`.${classNameValue}-slide-container`);
    this.slideWrapTag = document.querySelector(`.${classNameValue}-slide-wrap`);
    this.imgTags = document.querySelectorAll(`[class ^= "${classNameValue}-img"]`);
    this.prevBtn = document.querySelector(`.${classNameValue}-prev-btn`);
    this.nextBtn = document.querySelector(`.${classNameValue}-next-btn`);
    this.timerTag = document.querySelector(`.${classNameValue}-timer`);
    this.index = 1;
    this.startX = null;
    this.endX = null;
    this.isMoving = false;
    this.autoPlayFn = null;
    this.imgWidth = -this.slideWidth;
    this.init(classNameValue);
  }
  init(classNameValue) {
    let _this = this;
    // ㅜ 우클릭, 블럭, 드래그 방지하기
    // window.document.oncontextmenu = new Function("return false");
    // window.document.onselectstart = new Function("return false");
    // window.document.ondragstart = new Function("return false");
    // ㅜ 이미지 태그 번호 넣기
    // _this.imgTags.forEach((el, idx, arr) => {
    //     el.children[0].innerHTML += `${idx + 1} / ${arr.length}`;
    // })

    // ㅜ 첫 번째와 마지막 슬라이드 페이지에 한 번에 보여줄 이미지 개수만큼 복사해놓기
    for (let i = 1; i <= _this.imgCount; i++) {
      window[`copyTag${i}`] = _this.imgTags[i - 1].cloneNode(true);
      window[`copyTag${i + _this.imgCount}`] = _this.imgTags[_this.imgTags.length - _this.imgCount - 1 + i].cloneNode(true);
      _this.slideWrapTag.insertBefore(window[`copyTag${i + _this.imgCount}`], _this.imgTags[0]);
      _this.slideWrapTag.appendChild(window[`copyTag${i}`]);
    }
    _this.imgTags = document.querySelectorAll(`[class ^= "${classNameValue}-img"]`);

    // ㅜ 슬라이드의 width, height, margin 설정하기
    _this.slideContainerTag.style.width = `${_this.slideWidth}vw`;
    _this.slideContainerTag.style.height = `${_this.slideHeight}vw`;
    _this.imgTags.forEach((el) => {
      const margin = 0.5;
      el.style.margin = `${margin}vw`;
      el.style.width = `${_this.slideWidth / _this.imgCount - margin * 2}vw`;
      el.style.height = `${_this.slideWidth / _this.imgCount - margin * 2}vw`;
    });

    // ㅜ 첫 화면에 첫 번째의 이미지 태그가 보이게끔 left 조정하기
    _this.slideWrapTag.style.left = `-${_this.slideWidth}vw`;
    _this.autoPlay();

    // ㅜ 다음 버튼을 클릭했을 때
    _this.nextBtn.onclick = () => {
      clearInterval(_this.autoPlayFn);
      _this.autoPlayFn = null;
      _this.move("next");
    };

    // ㅜ 이전 버튼을 클릭했을 때
    _this.prevBtn.onclick = () => {
      clearInterval(_this.autoPlayFn);
      _this.autoPlayFn = null;
      _this.move("prev");
    };
    _this.slideContainerTag.onmousedown = (e) => {
      _this.startX = _this.pxToVw(e.pageX);
    };

    _this.slideContainerTag.onmouseup = (e) => {
      _this.endX = _this.pxToVw(e.pageX);
      _this.mouseEvent();
    };

    _this.slideContainerTag.onmousemove = (e) => {
      if (_this.isMoving) return;
      if (_this.startX === null) return;
      const posX = _this.startX - _this.pxToVw(e.pageX);
      _this.gage(posX, 0);
      _this.slideWrapTag.style.transition = `${0}s`;
      _this.slideWrapTag.style.transform = `translateX(${(_this.index - 1) * _this.imgWidth - posX}vw)`;
    };

    _this.slideContainerTag.addEventListener("mouseleave", (e) => {
      if (_this.isMoving) return;
      if (_this.startX === null) return;
      _this.endX = _this.pxToVw(e.pageX);
      _this.mouseEvent();
    });

    _this.slideContainerTag.addEventListener("mouseleave", () => {
      _this.autoPlay();
    });

    _this.slideContainerTag.onmouseenter = (e) => {
      e.stopPropagation();
      clearInterval(_this.autoPlayFn);
      _this.autoPlayFn = null;
    };
    window.addEventListener("resize", () => {
      _this.gage(0, 0);
      clearInterval(_this.autoPlayFn);
      _this.slideWrapTag.style.transition = "";
      setTimeout(() => {
        _this.autoPlayFn = null;
        _this.autoPlay();
      }, 100);
    });
  }
  move(str) {
    let _this = this;
    if (!_this.isMoving) {
      _this.isMoving = true;
      _this.gage(100, _this.slideSecond);
      _this.slideWrapTag.style.transition = `${_this.slideSecond}s`;
      if (str === "next") {
        _this.index++;
        _this.slideWrapTag.style.transform = `translateX(${(_this.index - 1) * _this.imgWidth}vw)`;
        _this.slideWrapTag.ontransitionend = () => {
          _this.gage(0, 0);
          _this.isMoving = false;
          if (_this.imgTags.length / _this.imgCount - 1 === _this.index) {
            _this.index = 1;
            _this.slideWrapTag.style.transition = `${0}s`;
            _this.slideWrapTag.style.transform = `translateX(${(_this.index - 1) * _this.imgWidth}vw)`;
          }
        };
      } else if (str === "prev") {
        _this.index--;
        _this.slideWrapTag.style.transform = `translateX(${(_this.index - 1) * _this.imgWidth}vw)`;
        _this.slideWrapTag.ontransitionend = () => {
          _this.gage(0, 0);
          _this.isMoving = false;
          if (0 === _this.index) {
            _this.index = _this.imgTags.length / _this.imgCount - 2;
            _this.slideWrapTag.style.transition = `${0}s`;
            _this.slideWrapTag.style.transform = `translateX(${(_this.index - 1) * _this.imgWidth}vw)`;
          }
        };
      }
    }
  }
  autoPlay() {
    let _this = this;
    if (_this.autoPlayFn === null) {
      _this.autoPlayFn = setInterval(() => {
        _this.move("next");
      }, 0);
    }
  }
  mouseEvent() {
    let _this = this;
    const interval = _this.startX - _this.endX;
    if (interval > 10) {
      _this.move("next");
    } else if (interval < -10) {
      _this.move("prev");
    } else {
      _this.slideWrapTag.style.transform = `translateX(${(_this.index - 1) * _this.imgWidth}vw)`;
    }
    _this.startX = null;
    _this.endX = null;
  }
  gage(value, second) {
    let _this = this;
    _this.timerTag.style.width = `${value}%`;
    _this.timerTag.style.transition = `${second}s`;
  }
  pxToVw(value) {
    let _this = this;
    const bodyWidth = document.body.offsetWidth;
    return (value / bodyWidth) * 100;
  }
}

// 07 08 14 최종 수정
