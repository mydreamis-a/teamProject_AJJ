class AhnSlide {
  constructor() {
    this.slideWarp = document.querySelector(".silde-warp");
    this.prev = document.querySelector(".prev");
    this.next = document.querySelector(".next");
    this.number = document.querySelector(".number");
    this.title = document.querySelector(".title");
    this.text = document.querySelector(".text");
    this.progress = document.querySelector(".progress");
    // 버튼 안눌렀을 때 초기값
    this.slideCount = 1;
    // 게이지바채우기변수
    this._setInterval;
    // 슬라이드 넘어갈때 클릭시 확인용
    this.oneclick = false;
    this.init();
  }
  init() {
    let _this = this;
    // 버튼 안눌렀을 때 초기값
    _this.number.innerHTML = _this.slideCount + " | 3";

    // 처음 화면에 출력되는 이미지 안에 텍스트
    _this.title.innerHTML = "안녕하세요";
    _this.text.innerHTML = "나는 주영";

    _this.makeClone();
    _this.progressMove();

    // 이전버튼
    _this.prev.addEventListener("click", function () {
      _this.progressstop();
      _this.slideCount--;
      if (_this.slideCount == 0) {
        _this.slideWarp.style.left = -_this.slideCount * 100 + "vw";
        _this.number.innerHTML = "3 | 3";
        _this.slideWarp.style.transition = "0.3s";
        setTimeout(() => {
          _this.slideCount = 3;
          _this.slideWarp.style.left = -_this.slideCount * 100 + "vw";
          _this.slideWarp.style.transition = "0s";
        }, 300);
      } else if (_this.slideCount > 0) {
        _this.slideWarp.style.left = -_this.slideCount * 100 + "vw";
        _this.number.innerHTML = _this.slideCount + " | 3";
        _this.slideWarp.style.transition = "0.3s";
      }
      if (_this.slideCount == 1) {
        _this.title.innerHTML = "안녕하세요";
        _this.text.innerHTML = "나는 주영";
      } else if (_this.slideCount == 2) {
        _this.title.innerHTML = "안녕하세요";
        _this.text.innerHTML = "나는 병현";
      } else if (_this.slideCount == 3) {
        _this.title.innerHTML = "안녕하세요";
        _this.text.innerHTML = "나는 지원";
      } else if (_this.slideCount == 0) {
        _this.title.innerHTML = "안녕하세요";
        _this.text.innerHTML = "나는 지원";
      } else if (_this.slideCount == 4) {
        _this.title.innerHTML = "안녕하세요";
        _this.text.innerHTML = "나는 주영";
      }
    });

    // 다음버튼
    _this.next.addEventListener("click", function () {
      _this.progressstop();
      _this.slideCount++;
      if (_this.slideCount == 4) {
        _this.slideWarp.style.left = -_this.slideCount * 100 + "vw";
        _this.number.innerHTML = "1 | 3";
        _this.slideWarp.style.transition = "0.3s";
        setTimeout(() => {
          _this.slideCount = 1;
          _this.slideWarp.style.left = -_this.slideCount * 100 + "vw";
          _this.slideWarp.style.transition = "0s";
        }, 300);
      } else if (_this.slideCount > 1) {
        _this.slideWarp.style.left = -_this.slideCount * 100 + "vw";
        _this.number.innerHTML = _this.slideCount + " | 3";
        _this.slideWarp.style.transition = "0.3s";
      }

      if (_this.slideCount == 1) {
        _this.title.innerHTML = "안녕하세요";
        _this.text.innerHTML = "나는 주영";
      } else if (_this.slideCount == 2) {
        _this.title.innerHTML = "안녕하세요";
        _this.text.innerHTML = "나는 병현";
      } else if (_this.slideCount == 3) {
        _this.title.innerHTML = "안녕하세요";
        _this.text.innerHTML = "나는 지원";
      } else if (_this.slideCount == 0) {
        _this.title.innerHTML = "안녕하세요";
        _this.text.innerHTML = "나는 지원";
      } else if (_this.slideCount == 4) {
        _this.title.innerHTML = "안녕하세요";
        _this.text.innerHTML = "나는 주영";
      }
    });
  }
  // 이미지 복사해서 요소 붙여넣기
  makeClone() {
    let _this = this;
    let cloneSlidefirst = _this.slideWarp.firstElementChild.cloneNode(true);
    let cloneSlidelast = _this.slideWarp.lastElementChild.cloneNode(true);
    _this.slideWarp.appendChild(cloneSlidefirst);
    _this.slideWarp.insertBefore(cloneSlidelast, _this.slideWarp.firstElementChild);
  }
  // 게이지바 기능
  progressMove() {
    let _this = this;
    let width = 0;
    _this._setInterval = setInterval(gauge, 20);
    function gauge() {
      if (width >= 100) {
        width = 0;
        _this.progress.style.width = width + "%";
        _this.autoSlide();
        clearInterval(_this._setInterval);
        setTimeout(() => {
          if (_this.oneclick === false) _this._setInterval = setInterval(gauge, 20);
        }, 2500);
      } else {
        width++;
        _this.progress.style.width = width + "%";
      }
    }
  }
  // 슬라이드 기능
  autoSlide() {
    let _this = this;
    _this.slideCount++;
    if (_this.slideCount == 4) {
      _this.slideWarp.style.left = -_this.slideCount * 100 + "vw";
      _this.number.innerHTML = "1 | 3";
      _this.slideWarp.style.transition = "2.5s";
      setTimeout(() => {
        _this.slideCount = 1;
        _this.slideWarp.style.left = -_this.slideCount * 100 + "vw";
        _this.slideWarp.style.transition = "0s";
      }, 2500);
    } else if (_this.slideCount > 1) {
      _this.slideWarp.style.left = -_this.slideCount * 100 + "vw";
      _this.number.innerHTML = _this.slideCount + " | 3";
      _this.slideWarp.style.transition = "2.5s";
    }

    if (_this.slideCount == 1) {
      _this.title.innerHTML = "안녕하세요";
      _this.text.innerHTML = "나는 주영";
    } else if (_this.slideCount == 2) {
      _this.title.innerHTML = "안녕하세요";
      _this.text.innerHTML = "나는 병현";
    } else if (_this.slideCount == 3) {
      _this.title.innerHTML = "안녕하세요";
      _this.text.innerHTML = "나는 지원";
    } else if (_this.slideCount == 0) {
      _this.title.innerHTML = "안녕하세요";
      _this.text.innerHTML = "나는 지원";
    } else if (_this.slideCount == 4) {
      _this.title.innerHTML = "안녕하세요";
      _this.text.innerHTML = "나는 주영";
    }
  }
  // 게이지바,슬라이드 멈추기
  progressstop() {
    let _this = this;
    _this.progress.style.width = "0%";
    clearInterval(_this._setInterval);
    _this.oneclick = true;
  }
}

let _AhnSlide = new AhnSlide();

// // 페이지 리사이징
// window.onresize = function () {
//   // _this.slideWarp.style.transition = "0s";
//   window.resizedFinished = setTimeout(function () {
//     _this.slideWarp.style.transition = "0s";
//   }, 10);
// };

// 호버기능?
// function mouseid(){
//   _this.slideWarp.addEventListener("mouseenter", function(){
//     console.log("들어감");
//   })
// }
// function mouseidd(){
//   _this.slideWarp.addEventListener("mouseleave", function(){
//     console.log("나감");
//   })
// }

// function mouseid(){
//   slideS.onmouseenter = function(e){
//     e.stopPropagation();
//     clearInterval(_this._setInterval);
//     _this._setInterval = null;
//     console.log("들어감");
//     onmouse = true;
//   }
// }
// function mouseidd(gauge){
//   console.log(_this._setInterval);
//   slideS.onmouseleave = function(e){
//     e.stopPropagation();
//     if(_this._setInterval === null)
//     _this._setInterval = setInterval(gauge, 20);
//     console.log("나감");
//     onmouse = false;
//   }
// }

// 업그레이드 하기전
// setInterval(() => {
//   _this.slideCount++;
//   if (_this.slideCount == 4) {
//     _this.slideWarp.style.left = -_this.slideCount * 100 + "vw";
//     _this.number.innerHTML = "1 | 3";
//     _this.slideWarp.style.transition = "1s";
//     setTimeout(() => {
//       _this.slideCount = 1;
//       _this.slideWarp.style.left = -_this.slideCount * 100 + "vw";
//       _this.slideWarp.style.transition = "0s";
//     }, 1000);
//   } else if (_this.slideCount > 1) {
//     _this.slideWarp.style.left = -_this.slideCount * 100 + "vw";
//     _this.number.innerHTML = _this.slideCount + " | 3";
//     _this.slideWarp.style.transition = "1s";
//   }

//   console.log(_this.slideCount);
//   if (_this.slideCount == 1) {
//     _this.title.innerHTML = "안녕하세요";
//     _this.text.innerHTML = "나는 주영";
//   } else if (_this.slideCount == 2) {
//     _this.title.innerHTML = "안녕하세요";
//     _this.text.innerHTML = "나는 병현";
//   } else if (_this.slideCount == 3) {
//     _this.title.innerHTML = "안녕하세요";
//     _this.text.innerHTML = "나는 지원";
//   } else if (_this.slideCount == 0) {
//     _this.title.innerHTML = "안녕하세요";
//     _this.text.innerHTML = "나는 지원";
//   } else if (_this.slideCount == 4) {
//     _this.title.innerHTML = "안녕하세요";
//     _this.text.innerHTML = "나는 주영";
//   }
// }, 2000);

// 처음 버전 1~3이미지 이동
// prev.addEventListener("click",function(){
//     _this.slideCount--;
//     if(_this.slideCount < 0)
//     {
//         _this.slideCount = 2;
//     }
//     _this.slideWarp.style.left = -_this.slideCount * 100 + "vw";
//     _this.number.innerHTML = (_this.slideCount+1) + " | 3";
//     _this.slideWarp.style.transition = "1s";
//     if(_this.slideCount == 0)
//     {
//         _this.title.innerHTML = "안녕하세요";
//         _this.text.innerHTML = "나는 주영";

//     }
//     else if(_this.slideCount == 1)
//     {
//         _this.title.innerHTML = "안녕하세요";
//         _this.text.innerHTML = "나는 병현";
//         _this.slideWarp.style.transition = "2s";
//     }
//     else if(_this.slideCount == 2)
//     {
//         _this.title.innerHTML = "안녕하세요";
//         _this.text.innerHTML = "나는 지원";
//     }
// })
// next.addEventListener("click",function(){
//     _this.slideCount++;
//     if(_this.slideCount > 2)
//     {
//         _this.slideCount = 0;
//     }
//     _this.slideWarp.style.left = -_this.slideCount * 100 + "vw";
//     _this.number.innerHTML = (_this.slideCount+1) + " | 3";
//     _this.slideWarp.style.transition = "1s";
//     if(_this.slideCount == 0)
//     {
//         _this.title.innerHTML = "안녕하세요";
//         _this.text.innerHTML = "나는 주영";
//     }
//     else if(_this.slideCount == 1)
//     {
//         _this.title.innerHTML = "안녕하세요";
//         _this.text.innerHTML = "나는 병현";
//     }
//     else if(_this.slideCount == 2)
//     {
//         _this.title.innerHTML = "안녕하세요";
//         _this.text.innerHTML = "나는 지원";
//     }
// })

// setInterval(() =>{
//     _this.slideCount++;
//     if(_this.slideCount > 2)
//     {
//         _this.slideCount = 0;
//     }
//     _this.slideWarp.style.left = -_this.slideCount * 100 + "vw";
//     _this.number.innerHTML = (_this.slideCount+1) + " | 3";
//     if(_this.slideCount == 0)
//     {
//         _this.title.innerHTML = "안녕하세요";
//         _this.text.innerHTML = "나는 주영";
//     }
//     else if(_this.slideCount == 1)
//     {
//         _this.title.innerHTML = "안녕하세요";
//         _this.text.innerHTML = "나는 병현";
//     }
//     else if(_this.slideCount == 2)
//     {
//         _this.title.innerHTML = "안녕하세요";
//         _this.text.innerHTML = "나는 지원";
//     }
// },2000)
