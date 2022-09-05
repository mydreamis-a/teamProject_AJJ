const mainEvent = document.querySelector(".main-event");
mainEvent.style.display = "none";

let stop;
let userPoint;

// document.cookie = "user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT"

// 쿠키 생성 함수
let createCookie = function (name, value, time) {
  let date = new Date();
  date.setTime(date.getTime() + time * 10 * 1000);
  // ㅜ 날짜로 잘 들어감..
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/;`;
  // ㅜ 세션으로 들어감..
  // document.cookie = name + "=" + value + "; expries=" + date.toUTCString() + "; path=/;"
};
// 쿠키 유무
let isActiveCookie = function (key) {
  // 값이 있는지 없는지 빈문자열이 아니면 값이 있는것.
  return getCookie(key) != null ? true : false;
};
// 쿠키 값 가져오기
let getCookie = function (name) {
  // 현재 저장된 쿠키중 name에 맞는 쿠키가 저장되어 있으면
  let value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  // 있으면 값을 내보낸다.
  // 쿠키의 값이 있는 인덱스가 2번이라서 인덱스 값을 가져온다.
  // console.log("cookie" + value[2]);
  // console.log("cookie" + value[0]);
  return value ? value[2] : null;
};

// 쿠키 제거 함수
let isDeleteCookie = function (key) {
  // key는 쿠키의 이름
  // 쿠키 제거 기능은 없기에 제일 예전 날짜를 넣어줘서 자동으로 삭제되게 만든다.
  document.cookie = key + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
};

// 이미 dailyCheck_ajax.js에서 선언해서 사용하기 때문에 재선언할 필요가 없다.
// ㅜ 로그인된 회원의 아이디(이메일) 임의 지정

function time() {
  let eventleft = Math.floor(Math.random() * 1851);
  let eventtop = Math.floor(Math.random() * 801);
  mainEvent.style.top = eventtop + "px";
  mainEvent.style.left = `${eventleft}px`;
  let _time = Math.floor(Math.random() * 10) * 100;
  if (mainEvent.style.display == "none") {
    stop = setTimeout(() => {
      mainEvent.style.display = "block";
      time();
    }, _time);
  } else {
    stop = setTimeout(() => {
      mainEvent.style.display = "none";
      time();
    }, 3000);
  }
}

let point = ["0", "0", "0", "0", "10", "10", "100", "1000", "10000", "10000"];

mainEvent.addEventListener("click", () => {
  let eventPoint = Math.floor(Math.random() * 10);
  clearTimeout(stop);
  userPoint = point[eventPoint];
  mainEvent.style.display = "none";
  $.ajax({
    url: "/dailyPoint",
    type: "post",
    data: {
      userPoint: userPoint,
    },
    success: function (result) {
      if (result.data == "null") {
        alert(" 로그인하시면 포인트 받을 수 있음 ^^7 ");
        time();
      } else {
        alert(result.data + "적립");
        createCookie("qq", "qq", 1);
        isDeleteCookie();
        let aa = isActiveCookie(result.name);
        if (aa == true) {
          mainEvent.style.display = "none";
        } else {
          time();
        }
      }
    },
  });
});

time();

// let time = 0;
// let ran = 0;
// let inter;
// let screen = true;

// function setter(ran){
//     inter = setInterval(() => {
//         if(screen == true){
//             screen = false;
//             mainEvent.style.display = "block";
//             clearInterval(inter);
//             ran = 1;
//             setter(ran);
//         }
//         else if(screen == false){
//             screen = true;
//             mainEvent.style.display = "none";
//             clearInterval(inter);
//             ran = Math.floor(Math.random() * 10);
//             setter(ran);
//         }
//     }, ran * 1000);
// }

// setter(ran);
