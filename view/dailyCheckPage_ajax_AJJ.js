const box = document.querySelector(".box");
const mainContainer = document.querySelector(".main-container");
const checkIcon = document.querySelector(".check-icon");

// 새로운 만들 div를 담아 놓는 배열
const datediv = new Array();

mainContainer.style.display = "none";
checkIcon.addEventListener("click", () => {
  mainContainer.style.display = "block";
});

for (let i = 1; i < 36; i++) {
  datediv[i] = document.createElement("div");
  datediv[i].className = "date";
  datediv[i].innerHTML = i;
  box.appendChild(datediv[i]);
}

// 현재 날짜 요일 값
const date = new Date(Date.now());
const nowdate = date.getDate();

const day = document.querySelectorAll(".date");

// 오늘 날짜 구역을 표시함.
day[nowdate - 1].style.backgroundColor = "white";

const colors = ["green", "pink", "gray", "orange", "tomato", "rgb(204, 204, 255)"];

day[nowdate - 1].addEventListener("mouseenter", () => {
  if (!(day[nowdate - 1].style.backgroundColor == "royalblue")) {
    let random = Math.floor(Math.random() * colors.length);
    day[nowdate - 1].style.backgroundColor = colors[random];
  }
});

// ㅜ 로그인된 회원의 아이디(이메일) 임의 지정
const loginEmail = "ajj@ajj.com";

day[nowdate - 1].addEventListener("click", () => {
  $.ajax({
    url: "/dailyCheck/today",
    type: "post",
    data: {
      email: loginEmail,
      date: nowdate,
    },
    success: function (result) {
      log(result);
      if (result.done == "already") {
        alert("욕심부리지마라");
      } else {
        log("gd");
        day[result.result - 1].style.backgroundColor = "royalblue";
      }
    },
  });
});

checkIcon.addEventListener("click", () => {
  $.ajax({
    url: "/dailyCheck/last",
    type: "post",
    data: { email: loginEmail },
    success: function (result) {
      console.log(result);
      result.data.forEach((el) => {
        day[el - 1].style.backgroundColor = "royalblue";
      });
    },
  });
});

// day[30].style.visibility = "hidden";
day[31].style.visibility = "hidden";
day[32].style.visibility = "hidden";
day[33].style.visibility = "hidden";
day[34].style.visibility = "hidden";
