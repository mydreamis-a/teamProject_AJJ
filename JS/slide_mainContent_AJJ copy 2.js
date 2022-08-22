class JangListSlide {
  constructor(classNameValue, sectionNum, _nextSiblingTag, imgArray) {
    this.index = 1;
    this.endX = null;
    this.margin = 0.5;
    this.imgTags = []; // 이미지 주소값만 배열에 담아서 순서대로
    this.startX = null;
    this.slideWidth = 60;
    this.slideSecond = 5;
    this.isMoving = false;
    this.rowImgCount = 10;
    this.isDragDone = true;
    this.totalImgCount; // 슬라이드 배열 방 개수
    this.pageNumberTag = [];
    this.autoPlayFn = "first";
    this.resizeControl = null;
    this.dragSetTimeout = null;
    this.stoppingSetTimeout = null;
    this.imgWidth = -this.slideWidth;
    this.prevBtn = document.createElement("div");
    this.nextBtn = document.createElement("div");
    this.timerTag = document.createElement("div");
    this.slideWrapTag = document.createElement("ul");
    this.timerWrapTag = document.createElement("div");
    this.slideHeight = this.slideWidth / this.rowImgCount;
    this.slideContainerTag = document.createElement("div");
    this.sectionTag = document.querySelector(`.section${sectionNum}`);
    this.nextSiblingTag = document.querySelector(`.${_nextSiblingTag}`);
    this.init(classNameValue, imgArray);
  }
  init(classNameValue, imgArray) {
    // // ㅜ 우클릭, 블럭, 드래그 방지하기
    // window.document.oncontextmenu = new Function("return false");
    // window.document.onselectstart = new Function("return false");
    // window.document.ondragstart = new Function("return false");

    // ㅜ HTML 태그 설정하기
    this.sectionTag.insertBefore(this.slideContainerTag, this.nextSiblingTag);
    this.sectionTag.insertBefore(this.slideContainerTag, this.nextSiblingTag);
    // this.sectionTag.appendChild(this.slideContainerTag);
    this.sectionTag.insertBefore(this.timerWrapTag, this.nextSiblingTag);
    this.timerWrapTag.appendChild(this.timerTag);
    this.slideContainerTag.appendChild(this.slideWrapTag);
    this.slideContainerTag.appendChild(this.prevBtn);
    this.slideContainerTag.appendChild(this.nextBtn);

    this.slideContainerTag.classList.add(`${classNameValue}-slide-container`);
    this.slideWrapTag.classList.add(`${classNameValue}-slide-wrap`);
    this.timerWrapTag.classList.add(`timer-wrap`);
    this.timerTag.classList.add(`${classNameValue}-timer`);
    this.prevBtn.classList.add(`${classNameValue}-prev-btn`);
    this.nextBtn.classList.add(`${classNameValue}-next-btn`);
    this.prevBtn.innerHTML = "이전";
    this.nextBtn.innerHTML = "다음";

    if (imgArray.length % 10 > 0) {
      this.totalImgCount = imgArray.length + 10 - (imgArray.length % 10);
    } else if (imgArray.length % 10 === 0) {
      this.totalImgCount = imgArray.length;
    }
    for (let i = 0; i < this.totalImgCount; i++) {
      this.imgTags.push(document.createElement("li"));
      this.pageNumberTag.push(document.createElement("span"));
      this.slideWrapTag.appendChild(this.imgTags[i]);
      this.imgTags[i].appendChild(this.pageNumberTag[i]);
      this.imgTags[i].classList.add(`${classNameValue}-img`);
      this.pageNumberTag[i].classList.add("page-number");
    }

    this.imgTags.forEach((el, idx) => {
      if (idx < imgArray.length) {
        el.style.backgroundImage = imgArray[idx];
      } else {
        el.innerHTML = "안주장 ♥";
      }
    });
    // // ㅜ 이미지 태그 번호 넣기
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
    this.slideContainerTag.style.height = `${this.slideHeight}vw`;
    this.slideContainerTag.style.width = `${this.slideWidth}vw`;
    this.imgTags.forEach((el) => {
      el.style.margin = `${this.margin}vw`;
      el.style.width = `${this.slideHeight - this.margin * 2}vw`;
      el.style.height = `${this.slideHeight - this.margin * 2}vw`;
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

    // // ㅜ 마우스 왼쪽 버튼을 클릭했을 때
    // this.slideContainerTag.onmousedown = (e) => {
    //     // ㅜ 맨 앞과 맨 뒤에 복사해 둔 사진의 위치일 때는 드래그 막아놓기
    //     if (this.index >= (this.imgTags.length / this.rowImgCount - 1)) return;
    //     if (this.index <= 0) return;
    //     if (this.dragSetTimeout !== null) return;
    //     if (e.button === 0) {
    //         this.startX = this.pxToVw(e.pageX);
    //         console.log("onmousedown");

    //         clearInterval(this.autoPlayFn);
    //         console.log("autoPlayFn out");
    //         this.autoPlayFn = null;

    //         clearTimeout(this.stoppingSetTimeout);
    //         console.log("stoppingSetTimeout out");
    //         this.stoppingSetTimeout = null;
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

    // this.slideContainerTag.onmouseleave = (e) => {
    //     if (this.startX === null) return;
    //     if (this.dragSetTimeout !== null) return;
    //     console.log("mouseleave");

    //     this.endX = this.pxToVw(e.pageX);
    //     setTimeout(() => {
    //         this.dragEvent();
    //     }, 10);
    // }

    this.slideContainerTag.onmouseenter = (e) => {
      // e.stopPropagation();
      clearInterval(this.autoPlayFn);
      this.autoPlayFn = null;

      clearTimeout(this.stoppingSetTimeout);
      this.stoppingSetTimeout = null;

      // ㅜ 게이지 바는 버튼을 클릭하자마자 100%로 채워놓기
      this.gage("100%", "");
    };

    this.slideContainerTag.addEventListener("mouseleave", () => {
      // ㅜ move() 안에 있는 게이지 바의 0% 트랜지션과 겹치지 않게 텀 두기
      setTimeout(() => {
        this.isMoving = false;
        this.move("next");

        // ㅜ move() 안에 있는 게이지 바의 100% 트랜지션이 종료됨과 동시에 setInterval의 첫 실행이 이뤄지게 하기
        setTimeout(() => {
          this.autoPlay();
        }, this.slideSecond * 1000);
      }, 10);
    });

    // 창의 크기가 변경될 때
    window.addEventListener("resize", () => {
      this.gage("100%", "");
      this.slideWrapTag.style.transition = "";

      clearTimeout(this.resizeControl);

      this.resizeControl = setTimeout(() => {
        this.btnControl("next");
      }, 500);
    });

    window.addEventListener("resize", (e) => {
      this.gage(0, 0);
      clearInterval(this.autoPlayFn);
      this.slideWrapTag.style.transition = "";
      this.autoPlayFn = null;
      if (this.resize === false) this.resize = true;
      this.resizeIndex = window.innerHeight;
      console.log("this.resizeIndex: " + this.resizeIndex);
      console.log("this.resizeIndex: " + this.resizeIndex);
    });

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
      this.slideWrapTag.style.transition = `${this.slideSecond}s`;

      // ㅜ 다음 슬라이드로 이동하기
      if (str === "next") {
        this.index++;
        this.slideWrapTag.style.transform = `translateX(${(this.index - 1) * this.imgWidth}vw)`;
        this.gage("0%", `${this.slideSecond}s`);

        // ㅜ 이동 후 슬라이드를 잠시 정지 상태로 두기
        if (this.stoppingSetTimeout === null) {
          this.stoppingSetTimeout = setTimeout(() => {
            // ㅜ autoPlay()가 짝수 번째마다 실행되도록 텀 두기
            this.stoppingSetTimeout = setTimeout(() => {
              this.isMoving = false;
              this.stoppingSetTimeout = null;
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
        if (this.stoppingSetTimeout === null) {
          this.stoppingSetTimeout = setTimeout(() => {
            // ㅜ autoPlay()가 먼저 실행되기 때문에 같은 시간이면 짝수 번째마다 실행된다.
            this.isMoving = false;
            this.stoppingSetTimeout = null;
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

    clearTimeout(this.stoppingSetTimeout);
    this.stoppingSetTimeout = null;

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
  //         this.dragSetTimeout = setTimeout(() => {
  //             this.startX = null;
  //             this.endX = null;
  //             this.dragSetTimeout = null;

  //             this.autoPlay();
  //         }, this.slideSecond * 1000);
  //     }

  //     // 슬라이드 이동이 없을 경우
  //     else {
  //         this.gage("100%", `${this.slideSecond}s`);
  //         this.slideWrapTag.style.transform = `translateX(${(this.index - 1) * this.imgWidth}vw)`;
  //         this.dragSetTimeout = setTimeout(() => {
  //             this.move("next");

  //             // ㅜ move() 안에 있는 게이지 바의 100% 트랜지션이 종료됨과 동시에 setInterval의 첫 실행이 이뤄지게 하기
  //             setTimeout(() => {
  //                 this.startX = null;
  //                 this.endX = null;
  //                 this.dragSetTimeout = null;

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
