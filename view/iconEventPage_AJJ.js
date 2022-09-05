const mainEvent = document.querySelector(".main-event");
mainEvent.style.display = "none";

let stop;
let userPoint;
let userCookie = null;

// ㅜ 인터넷 예시? 이건 또 잘 날짜가 들어감..
// document.cookie = "user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT"

// 쿠키 생성 함수
let createCookie = function (name, value, time) {
  let date = new Date();
  date.setTime(date.getTime() + time * 60 * 1000);
  // ㅜ 날짜로 잘 들어감..
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/;`;
  // ㅜ 세션으로 들어감.. 이건 왜 안되는걸까?
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
  // 있으면 값을 내보낸다..
  // 쿠키의 값이 있는 인덱스가 2번이라서 인덱스 값을 가져온다.
  // console.log("cookie" + value[2]);
  // console.log("cookie" + value[0]);
  return value ? value[2] : null;
};

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
    success: function ({ data, id }) {
      if (data == "null") {
        console.log(document.cookie);
        alert(" 로그인하시면 포인트 받을 수 있음 ^^7 ");
        time();
      } else {
        alert(data + "적립");
        createCookie("id", id, 1);
        userCookie = id;
        // console.log(document.cookie);
        // let aa = isActiveCookie("id")
        // console.log(aa);
        // if(aa == true)
        // {
        //   console.log("aa1");
        // } else{
        //   console.log("aa2");
        if (getCookie("id") === userCookie) {
          mainEvent.style.display = "none";
        } else {
          // time();
        }
        // }
      }
    },
  });
});
window.onload = () => {
  $.ajax({
    url: "/dailyPoint",
    type: "post",
    data: {
      userPoint: userPoint,
    },
    success: function ({ data, id }) {
      userCookie = id;
      if (data == "null") {
        time();
      } else if (getCookie("id") === userCookie) {
        mainEvent.style.display = "none";
      } else time();
    },
  });
};

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
