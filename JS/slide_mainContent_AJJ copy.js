class JangMainSlide {
  constructor(who, parentElement) {

    this.index = 1;
    this.second = 1;

    this.width = 100 - 0.6;
    this.height = 97.6;

    this.startX = null;
    this.endX = null;

    this.isMoving = false;
    this.isDragDone = true;
    this.moveControl = null;
    this.resizeControl = null;
    this.autoPlayControl = null;
    this.dragSetTimeout = null;
    
    this.totalImgCount = 3;
    this.imgTags = new Array();
    this.slideTextTags = new Array();

    this.prevBtn = document.createElement('div');
    this.nextBtn = document.createElement('div');
    this.timerTag = document.createElement('div');
    this.slideWrapTag = document.createElement('ul');
    this.timerWrapTag = document.createElement('div');
    this.slideContainerTag = document.createElement('div');
    this.section1Tag = document.querySelector(`.${parentElement}`);

    this.init(who);
  };

  init(who) {

    // ㅜ 우클릭, 블럭, 드래그 방지하기
    window.document.oncontextmenu = new Function("return false");
    window.document.onselectstart = new Function("return false");
    window.document.ondragstart = new Function("return false");

    // ㅜ HTML 태그 설정하기
    this.section1Tag.appendChild(this.slideContainerTag);
    this.slideContainerTag.appendChild(this.slideWrapTag);
    this.slideContainerTag.appendChild(this.prevBtn);
    this.slideContainerTag.appendChild(this.nextBtn);

    this.section1Tag.appendChild(this.timerWrapTag);
    this.timerWrapTag.appendChild(this.timerTag);

    this.slideContainerTag.classList.add(`${who}-slide-container`);
    this.slideWrapTag.classList.add(`${who}-slide-wrap`);
    this.timerWrapTag.classList.add(`${who}-timer-wrap`);
    this.timerTag.classList.add(`${who}-timer`);
    this.prevBtn.classList.add(`${who}-prev-btn`);
    this.nextBtn.classList.add(`${who}-next-btn`);

    this.prevBtn.innerHTML = "이전";
    this.nextBtn.innerHTML = "다음";

    for (let i = 0; i < this.totalImgCount; i++) {

      this.imgTags = [...this.imgTags, document.createElement('li')];
      this.imgTags[i].classList.add(`${who}-img`);
      this.slideWrapTag.appendChild(this.imgTags[i]);

      this.slideTextTags = [...this.slideTextTags, document.createElement('span')];
      this.slideTextTags[i].classList.add(`${who}-slide-text`);
      this.imgTags[i].appendChild(this.slideTextTags[i]);
    };

    // ㅜ 첫 번째와 마지막 사진을 양 끝에 복사해놓기
    const copyTagPrev = this.imgTags[this.imgTags.length - 1].cloneNode(true);
    const copyTagNext = this.imgTags[0].cloneNode(true);

    this.slideWrapTag.insertBefore(copyTagPrev, this.imgTags[0]);
    this.slideWrapTag.appendChild(copyTagNext);

    this.imgTags = document.querySelectorAll(`.${who}-img`);
    this.slideTextTags = document.querySelectorAll(`.${who}-slide-text`);

    // ㅜ 슬라이드의 width, height 설정하기
    this.slideContainerTag.style.width = `${this.width}vw`;
    this.slideContainerTag.style.height = `${this.height}vh`;

    this.imgTags.forEach((el) => {

      el.style.width = `${this.width}vw`;
      el.style.height = `${this.height}vh`;
    });

    // ㅜ 첫 화면에 첫 번째 사진이 보이게끔 left 조정하기
    this.slideWrapTag.style.transform = `translateX(${-this.width}vw)`;

    this.autoPlay();

    // ㅜ 다음 버튼을 클릭했을 때
    this.nextBtn.addEventListener("click", () => {

      // ㅜ 맨 끝에 복사해 둔 사진에서는 원래 자리로 이동할 때까지 클릭 막아놓기
      if (this.index >= this.imgTags.length - 1) return;
      this.btnControl("next");
    });

    // ㅜ 이전 버튼을 클릭했을 때
    this.prevBtn.addEventListener("click", () => {

      // ㅜ 맨 앞에 복사해 둔 사진에서는 원래 자리로 이동할 때까지 클릭 막아놓기
      if (this.index <= 0) return;
      this.btnControl("prev");
    });

    // this.slideContainerTag.addEventListener("mousedown", (e) => {
    //     // ㅜ 맨 앞과 맨 뒤에 복사해 둔 사진의 위치일 때는 드래그 막아놓기
    //     if (this.index >= (this.imgTags.length - 1)) return;
    //     if (this.index <= 0) return;
    //     if (this.dragSetTimeout !== null) return;
    //     if (e.button === 0) {
    //         this.startX = this.pxToVw(e.pageX);
    //         console.log("onmousedown");

    //         clearInterval(this.autoPlayControl);
    //         console.log("autoPlayControl out");
    //         this.autoPlayControl = null;

    //         clearTimeout(this.moveControl);
    //         console.log("moveControl out");
    //         this.moveControl = null;
    //     }
    // });

    // // 마우스 왼쪽 버튼의 클릭을 놓았을 때
    // this.slideContainerTag.addEventListener("mouseup", (e) => {
    //     if (this.startX === null) return;
    //     if (e.button === 0) {
    //         console.log("onmouseup");
    //         this.isDragDone = false;

    //         this.endX = this.pxToVw(e.pageX);
    //         setTimeout(() => {
    //             this.dragEvent();
    //         }, 10);
    //     }
    // });

    // // 드래그 중일 때
    // this.slideContainerTag.addEventListener("mousemove", (e) => {
    //     if (this.startX === null) return;
    //     if (this.isDragDone !== true) return;
    //     console.log("onmousemove");

    //     // 드래그의 정도에 따라 실시간으로 게이지 바와 슬라이드를 변화시키기
    //     let posX = this.startX - this.pxToVw(e.pageX);
    //     this.slideWrapTag.style.transform = `translateX(${(this.index - 1) * -this.width - posX}vw)`;

    //     if (posX < 0) posX = -posX;
    //     this.gage(`${posX}%`, "");
    // });

    // ㅜ 창의 크기가 변경될 때
    window.addEventListener("resize", () => {

      this.gage("0%", "");
      this.slideWrapTag.style.transition = "";

      clearTimeout(this.resizeControl);
      this.resizeControl = setTimeout(() => {

        clearInterval(this.autoPlayControl);
        this.autoPlayControl = null;
        this.autoPlay();
      }, 500);
    });

    // window.addEventListener("resize", (e) => {
    //     this.gage(0, 0);
    //     clearInterval(this.autoPlayControl);
    //     this.slideWrapTag.style.transition = "";
    //     this.autoPlayControl = null;
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
    //                      this.slideWrapTag.style.transform = `translateX(${(this.index - 1) * -this.width}vw)`;
    //                  }
    //                  this.isMoving = false;
    //                  this.autoPlay();
    //                  this.resize = false;
    //             }
    //         }
    //     }, 1000);
    // }, 100);
  };

  autoPlay() {

    this.gage("100%", `${this.second}s`);

    if (this.autoPlayControl === null) {
      this.autoPlayControl = setInterval(() => {

        this.move("next");
      }, this.second * 1000);
    };
  };

  move(str) {

    if (!this.isMoving) {

      this.isMoving = true;
      this.slideWrapTag.style.transition = `${this.second}s`;

      // ㅜ 다음 슬라이드로 이동하기
      if (str === "next") {

        this.index++;

        this.slideWrapTag.style.transform = `translateX(${this.index * -this.width}vw)`;
        this.gage("0%", `${this.second}s`);

        // ㅜ 트랜지션이 종료될 때까지 기다리기 (autoPlay()가 짝수 번째마다 실행됨)
        this.moveControl = setTimeout(() => {

          this.isMoving = false;
          this.moveControl = null;

          this.gage("100%", `${this.second}s`);
          console.log("moveControl");

          // ㅜ 맨 뒤에 복사해 둔 이미지 태그일 경우 원래 자리로 이동시키기
          if (this.index >= this.imgTags.length - 1) {

            this.index = 1;

            this.slideWrapTag.style.transition = "";
            this.slideWrapTag.style.transform = `translateX(${-this.width}vw)`;
          };
        }, this.second * 1000);
      }

      // ㅜ 이전 슬라이드로 이동하기
      else if (str === "prev") {
        this.index--;
        this.slideWrapTag.style.transform = `translateX(${this.index * -this.width}vw)`;
        this.gage("0%", `${this.second}s`);

        // ㅜ 트랜지션이 종료될 때까지 기다리기 (autoPlay()가 짝수 번째마다 실행됨)
        if (this.moveControl === null) {
          this.moveControl = setTimeout(() => {

            this.isMoving = false;
            this.moveControl = null;
            this.gage("100%", `${this.second}s`);

            // ㅜ 맨 앞에 복사해 둔 이미지 태그일 경우 원래 자리로 이동시키기
            if (this.index <= 0) {
              this.index = this.imgTags.length - 2;
              this.slideWrapTag.style.transition = "";
              this.slideWrapTag.style.transform = `translateX(${this.index * -this.width}vw)`;
            }
          }, this.second * 1000);
        };
      };
    };
  };

  btnControl(str) {

    clearInterval(this.autoPlayControl);
    this.autoPlayControl = null;

    clearTimeout(this.moveControl);
    this.moveControl = null;

    // ㅜ 게이지 바는 버튼을 클릭하자마자 100%로 채워놓기
    this.gage("100%", "");

    // ㅜ move() 안에 있는 게이지 바의 0% 트랜지션과 겹치지 않게 텀 두기
    setTimeout(() => {
      this.isMoving = false;
      this.move(str);

      // ㅜ move() 안에 있는 게이지 바의 100% 트랜지션이 종료됨과 동시에 setInterval의 첫 실행이 이뤄지게 하기
      this.moveControl = setTimeout(() => {
        this.autoPlay();
      }, this.second * 1000);
    }, 10);
  };
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
  //         }, this.second * 1000);
  //     }

  //     // 슬라이드 이동이 없을 경우
  //     else {
  //         this.gage("100%", `${this.second}s`);
  //         this.slideWrapTag.style.transform = `translateX(${(this.index - 1) * -this.width}vw)`;
  //         this.dragSetTimeout = setTimeout(() => {
  //             this.move("next");

  //             // ㅜ move() 안에 있는 게이지 바의 100% 트랜지션이 종료됨과 동시에 setInterval의 첫 실행이 이뤄지게 하기
  //             setTimeout(() => {
  //                 this.startX = null;
  //                 this.endX = null;
  //                 this.dragSetTimeout = null;

  //                 this.autoPlay();
  //             }, this.second * 1000);
  //         }, this.second * 1000);
  //     }
  // }

  gage(value, second) {

    this.timerTag.style.width = value;
    this.timerTag.style.transition = second;
  };

  pxToVw(value) {

    const bodyWidth = document.body.offsetWidth;
    return (value / bodyWidth) * 100;
  };
};
