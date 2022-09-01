const mainEvent = document.querySelector(".main-event");

mainEvent.style.display = "none";

let stop;
let userPoint;

// 이미 dailyCheck_ajax.js에서 선언해서 사용하기 때문에 재선언할 필요가 없다.
// ㅜ 로그인된 회원의 아이디(이메일) 임의 지정
// const loginEmail = "ajj@ajj.com";

function time() {
  // mainEvent.style.display = "block";
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

let point = ["0", "0", "0", "10", "10", "10", "100", "1000", "10000", "100000"];

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
      email: loginEmail,
    },
    success: function (result) {
      console.log(result);
      if (result.data == "null") {
        alert(" 로그인하시면 포인트 받을 수 있음 ^^7 ");
      } else {
        console.log(result.data);
        alert(result.data + "적립");
      }
    },
  });
  // console.log(loginEmail);
  time();
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
