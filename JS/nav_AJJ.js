class mainNav {
  constructor() {
    this.allSectionsTag = document.querySelector('.all-sections');
    this.sectionTags = document.querySelectorAll('[class ^="section"]');
    this.shopBtnTags = document.querySelectorAll('[class $="shop-btn"]');
    this.mainHeaderTag = document.querySelector('.main-header');
    this.searchTag = document.createElement('div');
    this.doNotClick = false;
    this.resizeControl = null;
    // 리모컨
    this.remocon = document.querySelector('.remocon');
    // top버튼
    this.topIcon = document.querySelector('.top-icon');
    // chat활성화 버튼
    this.chatIcon = document.querySelector('.chat-icon');
    // 챗봇박스
    this.chatBotTag = document.querySelector('.chat-bot');
    // 챗봇 박스
    this.chatBox = document.querySelector('.chat-box');
    // 챗봇 input
    this.chatInput = document.querySelector('.chat-input');
    // 챗로봇 알림창
    this.chatRobot = document.querySelector('.chat-robot');
    // 챗봇 제출버튼
    this.subMission = document.querySelector('.submission');
    this.callBtn = document.querySelector(".call-btn");
    this.liveBtn = document.querySelector(".live-btn");
    this.twoBtn = document.querySelector(".tow-btn");
    // 제출버튼 백그라운드 색상 배열
    this.colors = ["green", "pink", "gray", "orange", "tomato", "rgb(204, 204, 255)"];
    // 아직 미구현 채팅창 카운터
    this.keypressNumber = 0;
    // 회원가입 삭제버튼 눌렀을때 삭제되게하려고 가져온거
    this.signupModal = document.querySelector('.sign-up-modal');
    // 출석체크 삭제버튼 눌렀을 때 삭제되게하려고 가져온거
    this.mainContainer = document.querySelector('.main-container');
    this.logoTag = document.querySelector('.logo');
    // 섹션 인덱스
    this.index = 0;
    this.init();
  }
  init() {

    // 챗봇박스는 일단 먼저 꺼둔다.
    this.chatBotTag.style.display = "none";
    // transition에 property(속성)를 넣으면 그 property(속성)에만 적용가능하다.
    // this.remocon.style.transition = "opacity 10s";
    // js에서 먼저 설정해줘야함
    this.remocon.style.opacity = "0";
    this.remocon.style.visibility = "hidden";
    // this.chatRobot.style.display = "none";

    // // 전화상담버튼
    // this.callBtn.addEventListener("click", () => {
    //   setTimeout(() => {
    //     this.chatRobot.style.display = "block";
    //   }, 500);
    // });
    // socketio
    const socket = io.connect();

    // 소켓 (유저 텍스트 추가)
    socket.on("to-message",(data) => {
      this.chatBox.innerHTML += `
      <div class="chat-p">
      ${data.message}
      </div>
      `;
      this.chatInput.value = null;
      this.chatBox.scrollBy(0, this.chatBox.offsetHeight);
    });

    // 유저 채팅 소켓 이벤트
    this.chatInput.addEventListener("keydown", (e) => {
      if (e.keyCode == 13 && this.keypressNumber == 0) {
        socket.emit("message", {
          message : this.chatInput.value,
        });
      }
    });

    // 전화상담 버튼 소켓
    socket.on("callChat2", () => {
      const chat = document.createElement("div");
      chat.classList.add("chat-robot");
      chat.innerHTML = "연락처를 남겨주시면 상담원이 연락 드립니다.";
      
      const chatName = document.createElement("div");
      chatName.innerHTML = "이름";
      
      const inputName = document.createElement("input");
      inputName.setAttribute("type","text");
      inputName.setAttribute("placeholder","정확하게 입력해주세요");
      
      const chatNumber = document.createElement("div");
      chatNumber.innerHTML = "휴대폰 번호";
      
      const inputNumber = document.createElement("input");
      inputNumber.setAttribute("type","text");
      inputNumber.setAttribute("placeholder","정확하게 입력해주세요");
      
      const submit = document.createElement("div");
      submit.classList.add("submission");
      submit.innerHTML="제출하기";
      
      chat.appendChild(chatName);
      chat.appendChild(inputName);
      chat.appendChild(chatNumber);
      chat.appendChild(inputNumber);
      chat.appendChild(submit);
      this.chatBox.appendChild(chat);
      this.chatBox.scrollBy(0, this.chatBox.offsetHeight);
          submit.addEventListener("click", () => {
            const random = Math.floor(Math.random() * 6);
            submit.style.background = this.colors[random];
            alert("기다려라 ㅋ.");
          });
    });

    socket.on("liveChat2",() => {
      
    });
    
    // 전화상담 버튼 누르면 
    this.callBtn.addEventListener("click", () => {
      setTimeout(() => {
      socket.emit("callChat", {});
    }, 500);
    });

    this.liveBtn.addEventListener("click",() => {
      alert("5초 뒤 상담원과 연결됩니다.");
      setTimeout(() => {
        socket.emit("liveChat", {});
      }, 5000);
    });


    // 챗봇 모달창 클릭기능
    this.chatIcon.addEventListener("click", () => {
      if (this.chatBotTag.style.display === "none") {
        this.chatBotTag.style.display = "block";
      } else if (this.chatBotTag.style.display === "block") {
        this.chatBotTag.style.display = "none";
      }
    });

  
    window.addEventListener("click", (e) => {
      let targetClass = e.target.className;
      switch (targetClass) {
        case "chat-delete":
          if (this.chatBotTag.style.display === "block") {
            this.chatBotTag.style.display = "none";
            this.remocon.style.visibility = "block";
          }
          break;
        case "sign-up-delete":
          if (this.signupModal.style.display === "block") {
            this.signupModal.style.display = "none";
          }
          break;
        case "check-delete":
          if (this.mainContainer.style.display === "block") {
            this.mainContainer.style.display = "none";
          }
          break;
        default:
          break;
      }
    });

    // TOP 버튼 클릭시 메인 페이지로 이동
    this.topIcon.addEventListener("click", () => {
      this.searchTag.remove();
      this.allSectionsTag.style.top = `${0}vh`;
      this.remoconMove(0);
      this.remoconOff();
    });

    // ㅜ 메뉴 버튼을 클릭했을 때 ㅡㅡㅡ shopBtnTags[0, 1, 2]
    this.shopBtnTags.forEach((el, idx) => {
      el.addEventListener("click", () => {
        if (this.doNotClick) return;
        this.doNotClick = true;
        this.index = idx + 1;
        setTimeout(() => {
          this.doNotClick = false;
        }, 300);
        this.allSectionsTag.style.top = `${-this.index * 100}vh`;
        // ㅗ sectionTags[0]은 메인 컨텐츠가 들어갈 영역이기 때문에 버튼 클릭을 통해 이동할 수 있는 범위는 sectionTags[1, 2, 3]가 된다.

        // ㅜ html에 검색창 태그 추가하기
        // this.mainHeaderTag.appendChild(this.searchTag);
        this.searchTag.classList.add('search');
        setTimeout(() => {
          this.remocon.style.opacity = "1";
          this.remocon.style.visibility = "visible";
          setTimeout(() => {
            this.remoconMove(this.index);
          }, 100);
        }, 100);
      });
    });

    // ㅜ 창이 resize 될 때 요동치는 버그 잡기 위해 트랜지션 제어하기
    this.allSectionsTag.style.transition = "0.3s";
    window.addEventListener("resize", () => {
      clearTimeout(this.resizeControl);
      this.allSectionsTag.style.transition = "";

      this.resizeControl = setTimeout(() => {
        this.remoconReMove();
        this.allSectionsTag.style.transition = "0.3s";
      }, 500);
    });
  }

  // 리모콘 투명도 조절 visibility = "visible"요소를 기본 값으로 설정, visibility = "hidden" 요소를 보여주진 않지만 할당된 공간은 존재
  remoconOff() {
    this.remocon.classList.remove('remoconMoveOn');
    if (this.remocon.style.opacity == "1") {
      this.remocon.style.opacity = "0";
      this.remocon.style.visibility = "hidden";
    }
  }

  // 리모컨 생성 및 위치 조절
  remoconMove(index) {
    if (!this.remocon.classList.contains('remoconMoveOn')) {
      this.remocon.classList.add('remoconMoveOn');
    }
    this.remocon.style.top = `${index * 100 + 50}vh`;
  }

  // 리사이징 되었을 때 리모컨 transition없애기
  remoconReMove() {
    this.remocon.classList.remove('remoconMoveOn');
    this.remocon.style.top = `${this.index * 100 + 50}vh`;
  }
}
