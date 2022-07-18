 // ## 네브 바 만들기
    // 1. 전체 크기는 100%
    // 2. 메뉴 3개 (안주영 shop, 주병현 shop, 장지원 shop)
    // 3. 클릭 시 스크롤 이동
    // 4. 항상 고정
    // 5. resize 되면 top 위치 맞춰주기
    // 6. 구조 및 구현에 집중, 디자인은 추후 적용
    class MainNavAJJ{
        constructor(){
            this.navTag = document.querySelector(".nav-container");
            this.navChildTags = document.querySelectorAll('[class $="shop"]');
            this.sectionTags = document.querySelectorAll('[class ^="section"]');
        
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
            this.colors = ['green','pink','gray','orange','tomato',"rgb(204, 204, 255)"];
            //아직 미구현 채팅창 카운터
            this.keypressNumber = 0;
            //섹션 인덱스/탑값
            this.index = 0;
            this.theTop = 0;
            this.init();
        }
        init(){
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
            _this.subMission.addEventListener("click",function(){
            let random = Math.floor(Math.random() * 6)
            _this.subMission.style.background = _this.colors[random];
            })
    
            //유저가 대화창 기능
            _this.chatInput.addEventListener("keypress",function(e){
            if((e.keyCode == 13) && (_this.keypressNumber == 0)){
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
    
            // 챗봇 모달창 클릭기능
            _this.chatIcon.addEventListener("click",function(){
            if(_this.chatBotTag.style.display === "none"){
                _this.chatBotTag.style.display = "block";
            }
            else if(_this.chatBotTag.style.display === "block"){
                _this.chatBotTag.style.display = "none";
            }
            })
    
            window.onclick  = function(e){
                let targetClass = e.target.className;
                switch (targetClass) {
                    case 'chat-delete':
                    if(_this.chatBotTag.style.display === "block"){
                    _this.chatBotTag.style.display = "none";
                    _this.chatText.innerHTML = null;
                    _this.chatRobot.style.visibility = "hidden";
                    _this.subMission.style.background = "rgb(204, 204, 255)";
                    };
                    break;
                
                    default:
                    break;
                }
            }
            //아이콘 클릭시 메인페이지로 이동
            _this.topIcon.addEventListener("click",function(){
                _this.navEvent(0);
                _this.remoconMove(_this.theTop);
                _this.remoconOff();
            })
            // 메뉴 버튼을 클릭했을 때 ㅡㅡㅡ navChildTags[0, 1, 2]
            _this.navChildTags.forEach((el, idx) => {
                el.onclick = () => {
                _this.navEvent(idx+1); // sectionTags[0]은 메인 컨텐츠가 들어갈 영역이기 때문에 버튼 클릭을 통해 이동할 수 있는 범위는 sectionTags[1, 2, 3]가 된다.
                _this.index = idx+1;
                setTimeout(() => {
                    _this.remocon.style.opacity = "1";
                    _this.remocon.style.visibility = "visible";
                    setTimeout(() => {
                    _this.remoconMove(_this.theTop);
                    }, 100);
                }, 100);
                };
            });
      
            // 창이 resize 되면 section의 크기가 달라지기 때문에 sectionTags의 top을 0으로 초기화시키고 마지막으로 보았던 해당 section[_this.index]으로 스크롤을 이동시킨다.
            window.onresize = () => {
                _this.navEvent(_this.index);
                _this.remoconReMove(_this.theTop);
                // ㅗ 마지막으로 보았던 section[_this.index] 정보가 들어있다.
                // ㅗ onclick 안 해도 _this.index 초기 값이 0이기 때문에 메인 페이지 그대로 resize 된다.
            };
        }
        // 리모콘 투명도 조절 visibility = "visible"요소를 기본 값으로 설정, visibility = "hidden" 요소를 보여주진 않지만 할당된 공간은 존재
        remoconOff(){
            let _this = this;
            _this.remocon.classList.remove("remoconMoveOn");
            if(_this.remocon.style.opacity == "1"){
              _this.remocon.style.opacity = "0";
              _this.remocon.style.visibility = "hidden";
            }
        }
        //리모컨 생성 및 위치 조절
        remoconMove(theTop){
            let _this = this;
            if (!_this.remocon.classList.contains("remoconMoveOn")) {
                _this.remocon.classList.add("remoconMoveOn");
            }
            _this.remocon.style.top = theTop + 400 + "px";
        }
        //리사이징 되었을 때 리모컨 transition없애기
        remoconReMove(theTop){
            let _this = this;
            _this.remocon.classList.remove("remoconMoveOn");
            _this.remocon.style.top = theTop + 400 + "px";
        }
        // 메뉴 선택에 따라 해당 section으로 스크롤 되는 함수
        navEvent(idx) {
            let _this = this;
            const allPagesTag = document.querySelector(".all-pages");
            const sectionTagsTop = _this.whereIsSectionTop(_this.theTop); // sectionTags의 top이 들어있다.
            _this.theTop = sectionTagsTop[idx]; // 클릭한 메뉴의 해당 section의 top이 들어있다.
            allPagesTag.style.top = `-${_this.theTop}px`; // 스크롤 이동
        }
      
          // sectionTags의 위치를 sectionTagsTop 배열에 담아 return하는 함수
        whereIsSectionTop(theTop) {
            let _this = this;
            let sectionTagsTop = [];
            for (let i = 0; i < _this.sectionTags.length; i++) {
              sectionTagsTop.push(
                this.sectionTags[i].getBoundingClientRect().top + theTop
              );
              // ㅗ _this.theTop이 0이 아닐 때 _this.theTop을 더해줌으로써 section1의 top을 0으로 만든다.
            }
            return sectionTagsTop;
        }
    }


    //2022-07-07 오후3시42분