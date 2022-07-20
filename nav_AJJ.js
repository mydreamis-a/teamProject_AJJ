// ## 네브 바 만들기
// 1. 전체 크기는 100%
// 2. 메뉴 3개 (안주영 shop, 주병현 shop, 장지원 shop)
// 3. 클릭 시 스크롤 이동
// 4. 항상 고정
// 5. resize 되면 top 위치 맞춰주기
// 6. 구조 및 구현에 집중, 디자인은 추후 적용
class mainNav {
    constructor() {
        this.allSectionsTag = document.querySelector(".all-sections");
        this.sectionTags = document.querySelectorAll('[class ^="section"]');
        this.shopBtnTags = document.querySelectorAll('[class $="shop-btn"]');
        this.mainHeaderTag = document.querySelector('.main-header');
        this.searchTag = document.createElement('div');
        this.doNotClick = false;
        this.resizeControl = null;

        //리모컨
        this.remocon = document.querySelector(".remocon");
        //top버튼
        this.topIcon = document.querySelector(".top-icon");
        //chat활성화 버튼
        this.chatIcon = document.querySelector(".chat-icon");
        //챗봇박스
        this.chatBotTag = document.querySelector(".chat-bot");
        //챗봇 박스 
        this.chatBox = document.querySelector(".chat-box");
        //챗봇 input
        this.chatInput = document.querySelector(".chat-input");
        //채팅창
        this.chatText = document.querySelector(".chat-text");
        //챗로봇 알림창
        this.chatRobot = document.querySelector(".chat-robot");
        //챗봇 제출버튼
        this.subMission = document.querySelector(".submission");
        //제출버튼 백그라운드 색상 배열
        this.colors = ['green', 'pink', 'gray', 'orange', 'tomato', "rgb(204, 204, 255)"];
        //아직 미구현 채팅창 카운터
        this.keypressNumber = 0;
        //회원가입 삭제버튼 눌렀을때 삭제되게하려고 가져온거
        this.signupModal = document.querySelector('.sign-up-modal');
        //출석체크 삭제버튼 눌렀을 때 삭제되게하려고 가져온거
        this.mainContainer = document.querySelector(".main-container");
        this.logoTag = document.querySelector(".logo");
        //섹션 인덱스
        this.index = 0;
        this.init();
    }
    init() {
        let _this = this;
        //챗봇박스는 일단 먼저 꺼둔다.
        _this.chatBotTag.style.display = "none";
        //transition에 property(속성)를 넣으면 그 property(속성)에만 적용가능하다.
        // _this.remocon.style.transition = "opacity 10s";
        //js에서 먼저 설정해줘야함
        _this.remocon.style.opacity = "0";
        _this.remocon.style.visibility = "hidden";
        _this.chatRobot.style.visibility = "hidden";


        //제출버튼 클릭시 버튼색 바뀜
        _this.subMission.addEventListener("click", function () {
            let random = Math.floor(Math.random() * 6)
            _this.subMission.style.background = _this.colors[random];
        })

        //유저가 대화창 기능
        _this.chatInput.addEventListener("keypress", function (e) {
            if ((e.keyCode == 13) && (_this.keypressNumber == 0)) {
                _this.chatText.style.bottom = "-240px";
                let chatInputValue = _this.chatInput.value;
                _this.chatText.innerHTML = chatInputValue;
                _this.chatInput.value = null;
                setTimeout(() => {
                    _this.chatText.style.bottom = 0 + "px";
                    _this.chatRobot.style.visibility = "visible";
                }, 500);
            }
            // } else if((e.keyCode == 13) && (_this.keypressNumber == 1)){
            //   newDiv = document.createElement("div");
            //   newDiv.className = "chat-text";
            //   _this.chatBox.appendChild(newDiv);
            //   console.log(chatInput.value);
            //   let chatInputValue2 = _this.chatInput.value;
            //   _this.chatText.innerHTML = chatInputValue2;
            //   _this.chatInput.value = null;
            // }
        })

        //챗봇 모달창 클릭기능
        _this.chatIcon.addEventListener("click", function () {
            if (_this.chatBotTag.style.display === "none") {
                _this.chatBotTag.style.display = "block";
            }
            else if (_this.chatBotTag.style.display === "block") {
                _this.chatBotTag.style.display = "none";
            }
        })

        window.onclick = function (e) {
            let targetClass = e.target.className;
            switch (targetClass) {
                case 'chat-delete':
                    if (_this.chatBotTag.style.display === "block") {
                        _this.chatBotTag.style.display = "none";
                        _this.chatText.innerHTML = null;
                        _this.chatRobot.style.visibility = "hidden";
                        _this.remocon.style.visibility = "visible";
                        _this.subMission.style.background = "rgb(204, 204, 255)";
                    };
                    break;
                case 'sign-up-delete':
                    if (_this.signupModal.style.display === "block") {
                        _this.signupModal.style.display = "none";
                    };
                    break;
                case 'check-delete':
                    if (_this.mainContainer.style.display === "block") {
                        _this.mainContainer.style.display = "none";
                    };
                    break;
                default:
                    break;
            }
        }
        _this.logoTag.addEventListener("click",function(){
            _this.searchTag.remove();
            _this.allSectionsTag.style.top = `${0}vh`;
            _this.remoconMove(0);
            _this.remoconOff();
        })
        //TOP 버튼 클릭시 메인 페이지로 이동
        _this.topIcon.addEventListener("click", function () {
            _this.searchTag.remove();
            _this.allSectionsTag.style.top = `${0}vh`;
            _this.remoconMove(0);
            _this.remoconOff();
        })

        // ㅜ 메뉴 버튼을 클릭했을 때 ㅡㅡㅡ shopBtnTags[0, 1, 2]
        _this.shopBtnTags.forEach((el, idx) => {
            el.onclick = () => {
                if (_this.doNotClick) return;
                _this.doNotClick = true;
                _this.index = idx + 1;
                setTimeout(() => {
                    _this.doNotClick = false;
                }, 300);
                _this.allSectionsTag.style.top = `${-_this.index * 100}vh`;
                // ㅗ sectionTags[0]은 메인 컨텐츠가 들어갈 영역이기 때문에 버튼 클릭을 통해 이동할 수 있는 범위는 sectionTags[1, 2, 3]가 된다.

                // ㅜ html에 검색창 태그 추가하기
                // _this.mainHeaderTag.appendChild(_this.searchTag);
                _this.searchTag.classList.add('search');
                setTimeout(() => {
                    _this.remocon.style.opacity = "1";
                    _this.remocon.style.visibility = "visible";
                    setTimeout(() => {
                        _this.remoconMove(_this.index);
                    }, 100);
                }, 100);
            };
        });

        // ㅜ 창이 resize 될 때 요동치는 버그 잡기 위해 트랜지션 제어하기
        _this.allSectionsTag.style.transition = "0.3s";
        window.addEventListener("resize", () => {
            let _this = this;
            clearTimeout(_this.resizeControl);
            _this.allSectionsTag.style.transition = "";
            
            _this.resizeControl = setTimeout(() => {
                _this.remoconReMove();
                _this.allSectionsTag.style.transition = "0.3s";
            }, 500);
        })
    }

    //리모콘 투명도 조절 visibility = "visible"요소를 기본 값으로 설정, visibility = "hidden" 요소를 보여주진 않지만 할당된 공간은 존재
    remoconOff() {
        let _this = this;
        _this.remocon.classList.remove("remoconMoveOn");
        if (_this.remocon.style.opacity == "1") {
            _this.remocon.style.opacity = "0";
            _this.remocon.style.visibility = "hidden";
        }
    }

    //리모컨 생성 및 위치 조절
    remoconMove(index) {
        let _this = this;
        if (!_this.remocon.classList.contains("remoconMoveOn")) {
            _this.remocon.classList.add("remoconMoveOn");
        }
        _this.remocon.style.top = `${(index) * 100 + 50}vh`;
    }

    //리사이징 되었을 때 리모컨 transition없애기
    remoconReMove() {
        let _this = this;
        _this.remocon.classList.remove("remoconMoveOn");
        _this.remocon.style.top = `${(_this.index) * 100 + 50}vh`;
    }
}

// 07 11 10 최종 수정