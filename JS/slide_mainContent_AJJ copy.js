class JangMainSlide {
  constructor(classNameValue, parentElement) {
    this.index = 1;
    this.endX = null;
    this.imgTags = [];
    this.startX = null;
    this.rowImgCount = 1;
    this.slideSecond = 10;
    this.isMoving = false;
    this.isDragDone = true;
    this.totalImgCount = 3;
    this.slideHeight = 97.6;
    this.pageNumberTag = [];
    this.autoPlayFn = "first";
    this.resizeControl = null;
    this.dragSetTimeOut = null;
    this.slideWidth = 100 - 0.6;
    this.stoppingSetTimeOut = null;
    this.imgWidth = -this.slideWidth;
    this.prevBtn = document.createElement("div");
    this.nextBtn = document.createElement("div");
    this.timerTag = document.createElement("div");
    this.slideWrapTag = document.createElement("ul");
    this.timerWrapTag = document.createElement("div");
    this.slideContainerTag = document.createElement("div");
    this.section1Tag = document.querySelector(`.${parentElement}`);
    this.init(classNameValue);
  }
  init(classNameValue) {

    // ㅜ 우클릭, 블럭, 드래그 방지하기
    window.document.oncontextmenu = new Function("return false");
    window.document.onselectstart = new Function("return false");
    window.document.ondragstart = new Function("return false");

    // ㅜ HTML 태그 설정하기
    this.section1Tag.appendChild(this.slideContainerTag);
    this.section1Tag.appendChild(this.timerWrapTag);
    this.timerWrapTag.appendChild(this.timerTag);
    this.slideContainerTag.appendChild(this.slideWrapTag);
    this.slideContainerTag.appendChild(this.prevBtn);
    this.slideContainerTag.appendChild(this.nextBtn);
    this.slideContainerTag.classList.add(`${classNameValue}-slide-container`);
    this.slideWrapTag.classList.add(`${classNameValue}-slide-wrap`);
    this.timerWrapTag.classList.add(`${classNameValue}-timer-wrap`);
    this.timerTag.classList.add(`${classNameValue}-timer`);
    this.prevBtn.classList.add(`${classNameValue}-prev-btn`);
    this.nextBtn.classList.add(`${classNameValue}-next-btn`);
    this.prevBtn.innerHTML = "이전";
    this.nextBtn.innerHTML = "다음";

    for (let i = 0; i < this.totalImgCount; i++) {
      this.imgTags.push(document.createElement("li"));
      this.pageNumberTag.push(document.createElement("span"));
      this.slideWrapTag.appendChild(this.imgTags[i]);
      this.imgTags[i].appendChild(this.pageNumberTag[i]);
      this.imgTags[i].classList.add(`${classNameValue}-img${i}`);
      this.pageNumberTag[i].classList.add(`${classNameValue}-page-number`);
    }

    this.pageNumberTag[0].appendChild(_numberAnimation.increaseTag);
    this.pageNumberTag[1].innerHTML = "'안'녕하세요!<br>저희는 '주'말에도 비가 오나 눈이 오나 지치지 않고<br>열심히 '장'인 정신으로 공부하는 안주장 팀입니다.";
    this.pageNumberTag[2].innerHTML = "저희 홈페이지에서는<br>여러분들에게 맛나고 즐거운 안주처럼, 따뜻한 에너지를 선사해줄 수 있는 요소들을 찾아<br>소개해드리고 있습니다. 부디 여러분 모두가 이 인생에서 편안히 안주할 수 있기를<br>바라는 마음으로 정성 들여서 만들었습니다.<br>항상 행복하세요!<br>";

    // ㅜ 이미지 태그 번호 넣기
    // this.imgTags.forEach((el, idx, arr) => {
    //     el.children[0].innerHTML += `${idx + 1} / ${arr.length}`;
    // })

    // ㅜ 첫 번째와 마지막 슬라이드 페이지에 한 번에 보여줄 이미지 개수만큼 복사해놓기
    for (let i = 1; i <= this.rowImgCount; i++) {
      window[`copyTag${i}`] = this.imgTags[i - 1].cloneNode(true);
      window[`copyTag${i + this.rowImgCount}`] = this.imgTags[this.imgTags.length - this.rowImgCount - 1 + i].cloneNode(true);
      this.slideWrapTag.insertBefore(window[`copyTag${i + this.rowImgCount}`], this.imgTags[0]);
      this.slideWrapTag.appendChild(window[`copyTag${i}`]);
    }
    this.imgTags = document.querySelectorAll(`[class ^= "${classNameValue}-img"]`);

    // ㅜ 슬라이드의 width, height, margin 설정하기
    this.slideContainerTag.style.width = `${this.slideWidth}vw`;
    this.slideContainerTag.style.height = `${this.slideHeight}vh`;
    this.imgTags.forEach((el) => {
      const margin = 0;
      el.style.margin = `${margin}vw`;
      el.style.width = `${this.slideWidth / this.rowImgCount - margin * 2}vw`;
      el.style.height = `${this.slideHeight / this.rowImgCount - margin * 2}vh`;
    });

    // ㅜ 첫 화면에 첫 번째의 이미지 태그가 보이게끔 left 조정하기
    this.slideWrapTag.style.left = `-${this.slideWidth}vw`;
    this.autoPlay();

    // ㅜ 다음 버튼을 클릭했을 때
    // ㅜ 맨 뒤에 복사해 둔 첫 번째 사진의 경우 원래 자리로 이동해야 하기 때문에 막아놓기
    this.nextBtn.onclick = () => {
      if (this.index === this.imgTags.length / this.rowImgCount - 1) return;
      this.btnControl("next");
    };

    // ㅜ 이전 버튼을 클릭했을 때
    // ㅜ 맨 뒤에 복사해 둔 첫 번째 사진의 경우 원래 자리로 이동해야 하기 때문에 막아놓기
    this.prevBtn.onclick = () => {
      if (this.index === 0) return;
      this.btnControl("prev");
    };

    // ㅜ 마우스 왼쪽 버튼을 클릭했을 때
    // this.slideContainerTag.onmousedown = (e) => {
    //     // ㅜ 맨 앞과 맨 뒤에 복사해 둔 사진의 위치일 때는 드래그 막아놓기
    //     if (this.index >= (this.imgTags.length / this.rowImgCount - 1)) return;
    //     if (this.index <= 0) return;
    //     if (this.dragSetTimeOut !== null) return;
    //     if (e.button === 0) {
    //         this.startX = this.pxToVw(e.pageX);
    //         console.log("onmousedown");

    //         clearInterval(this.autoPlayFn);
    //         console.log("autoPlayFn out");
    //         this.autoPlayFn = null;

    //         clearTimeout(this.stoppingSetTimeOut);
    //         console.log("stoppingSetTimeOut out");
    //         this.stoppingSetTimeOut = null;
    //     }
    // }

    // // 마우스 왼쪽 버튼의 클릭을 놓았을 때
    // this.slideContainerTag.onmouseup = (e) => {
    //     if (this.startX === null) return;
    //     if (e.button === 0) {
    //         console.log("onmouseup");
    //         this.isDragDone = false;

    //         this.endX = this.pxToVw(e.pageX);
    //         setTimeout(() => {
    //             this.dragEvent();
    //         }, 10);
    //     }
    // }

    // // 드래그 중일 때
    // this.slideContainerTag.onmousemove = (e) => {
    //     if (this.startX === null) return;
    //     if (this.isDragDone !== true) return;
    //     console.log("onmousemove");

    //     // 드래그의 정도에 따라 실시간으로 게이지 바와 슬라이드를 변화시키기
    //     let posX = this.startX - this.pxToVw(e.pageX);
    //     this.slideWrapTag.style.transform = `translateX(${(this.index - 1) * this.imgWidth - posX}vw)`;

    //     if (posX < 0) posX = -posX;
    //     this.gage(`${posX}%`, "");
    // }

    // 창의 크기가 변경될 때
    window.addEventListener("resize", () => {
      this.gage("0%", "");
      this.slideWrapTag.style.transition = "";

      clearTimeout(this.resizeControl);

      this.resizeControl = setTimeout(() => {
        clearInterval(this.autoPlayFn);
        this.autoPlayFn = null;

        clearTimeout(this.stoppingSetTimeOut);
        this.stoppingSetTimeOut = null;

        this.autoPlayFn = "first";
        setTimeout(() => {
          this.autoPlay();
        }, 10);
      }, 500);
    });

    // window.addEventListener("resize", (e) => {
    //     this.gage(0, 0);
    //     clearInterval(this.autoPlayFn);
    //     this.slideWrapTag.style.transition = "";
    //     this.autoPlayFn = null;
    //    if (this.resize === false) this.resize = true;
    //    this.resizeIndex = window.innerHeight;
    //    console.log("this.resizeIndex: "+this.resizeIndex);
    //    console.log("this.resizeIndex: "+this.resizeIndex);
    // })

    // setInterval(() => {
    //     let time = this.resizeIndex;
    //     setTimeout(() => {
    //         if(this.resizeIndex === time){
    //             if(this.resize === true)
    //             {
    //                  if(this.index === 6)
    //                  {
    //                      this.index = 1;
    //                      this.slideWrapTag.style.transition = "0s";
    //                      this.slideWrapTag.style.transform = `translateX(${(this.index - 1) * this.imgWidth}vw)`;
    //                  }
    //                  this.isMoving = false;
    //                  this.autoPlay();
    //                  this.resize = false;
    //             }
    //         }
    //     }, 1000);
    // }, 100);
  }
  autoPlay() {
    if (this.autoPlayFn === "first") {
      this.gage("100%", `${this.slideSecond}s`);
      this.autoPlayFn = null;
      this.autoPlay();
    } else if (this.autoPlayFn === null) {
      this.autoPlayFn = setInterval(() => {
        this.move("next");
      }, this.slideSecond * 1000);
    }
  }
  move(str) {
    if (!this.isMoving) {
      this.isMoving = true;
      this.slideWrapTag.style.transition = `${this.slideSecond}s`;

      // ㅜ 다음 슬라이드로 이동하기
      if (str === "next") {
        this.index++;
        this.slideWrapTag.style.transform = `translateX(${(this.index - 1) * this.imgWidth}vw)`;
        this.gage("0%", `${this.slideSecond}s`);

        // ㅜ 이동 후 슬라이드를 잠시 정지 상태로 두기
        if (this.stoppingSetTimeOut === null) {
          this.stoppingSetTimeOut = setTimeout(() => {
            // ㅜ autoPlay()가 짝수 번째마다 실행되도록 텀 두기
            this.stoppingSetTimeOut = setTimeout(() => {
              this.isMoving = false;
              this.stoppingSetTimeOut = null;
              this.gage("100%", `${this.slideSecond}s`);

              // ㅜ 맨 뒤에 복사해 둔 첫 번째 사진의 위치로 올 경우 원래 자리로 이동하기
              if (this.imgTags.length / this.rowImgCount - 1 <= this.index) {
                this.index = 1;
                this.slideWrapTag.style.transition = "";
                this.slideWrapTag.style.transform = `translateX(${(this.index - 1) * this.imgWidth}vw)`;
              }
            }, 10);
          }, this.slideSecond * 1000);
        }
      }

      // ㅜ 이전 슬라이드로 이동하기
      else if (str === "prev") {
        this.index--;
        this.slideWrapTag.style.transform = `translateX(${(this.index - 1) * this.imgWidth}vw)`;
        this.gage("0%", `${this.slideSecond}s`);

        // ㅜ 이동 후 슬라이드를 잠시 정지 상태로 두기
        if (this.stoppingSetTimeOut === null) {
          this.stoppingSetTimeOut = setTimeout(() => {
            // ㅜ autoPlay()가 먼저 실행되기 때문에 같은 시간이면 짝수 번째마다 실행된다.
            this.isMoving = false;
            this.stoppingSetTimeOut = null;
            this.gage("100%", `${this.slideSecond}s`);

            // ㅜ 맨 앞에 복사해 둔 마지막 사진의 위치로 올 경우 원래 자리로 이동하기
            if (0 >= this.index) {
              this.index = this.imgTags.length / this.rowImgCount - 2;
              this.slideWrapTag.style.transition = "0s";
              this.slideWrapTag.style.transform = `translateX(${(this.index - 1) * this.imgWidth}vw)`;
            }
          }, this.slideSecond * 1000);
        }
      }
    }
  }
  btnControl(str) {

    clearInterval(this.autoPlayFn);
    this.autoPlayFn = null;

    clearTimeout(this.stoppingSetTimeOut);
    this.stoppingSetTimeOut = null;

    // ㅜ 게이지 바는 버튼을 클릭하자마자 100%로 채워놓기
    this.gage("100%", "");

    // ㅜ move() 안에 있는 게이지 바의 0% 트랜지션과 겹치지 않게 텀 두기
    setTimeout(() => {
      this.isMoving = false;
      this.move(str);

      // ㅜ move() 안에 있는 게이지 바의 100% 트랜지션이 종료됨과 동시에 setInterval의 첫 실행이 이뤄지게 하기
      setTimeout(() => {
        this.autoPlay();
      }, this.slideSecond * 1000);
    }, 10);
  }
  // dragEvent() {
  //     let this = this;
  //     const posX = this.startX - this.endX;
  //     console.log(posX);

  //     // ㅜ 드래그 방향 및 정도에 따라 해당 슬라이드로 이동하기
  //     if (posX > 20 || posX < -20) {
  //         this.isMoving = false;
  //         if (posX > 20) this.move("next");
  //         else if (posX < -20) this.move("prev");

  //         // ㅜ move() 안에 있는 게이지 바의 100% 트랜지션이 종료됨과 동시에 setInterval의 첫 실행이 이뤄지게 하기
  //         this.dragSetTimeOut = setTimeout(() => {
  //             this.startX = null;
  //             this.endX = null;
  //             this.dragSetTimeOut = null;

  //             this.autoPlay();
  //         }, this.slideSecond * 1000);
  //     }

  //     // 슬라이드 이동이 없을 경우
  //     else {
  //         this.gage("100%", `${this.slideSecond}s`);
  //         this.slideWrapTag.style.transform = `translateX(${(this.index - 1) * this.imgWidth}vw)`;
  //         this.dragSetTimeOut = setTimeout(() => {
  //             this.move("next");

  //             // ㅜ move() 안에 있는 게이지 바의 100% 트랜지션이 종료됨과 동시에 setInterval의 첫 실행이 이뤄지게 하기
  //             setTimeout(() => {
  //                 this.startX = null;
  //                 this.endX = null;
  //                 this.dragSetTimeOut = null;

  //                 this.autoPlay();
  //             }, this.slideSecond * 1000);
  //         }, this.slideSecond * 1000);
  //     }
  // }
  gage(value, second) {
    this.timerTag.style.width = value;
    this.timerTag.style.transition = second;
  }
  pxToVw(value) {
    const bodyWidth = document.body.offsetWidth;
    return (value / bodyWidth) * 100;
  }
}

// 07 15 04 최종 수정 제가 더 열심히 할게요 흑흑흑흑흑
