const box = document.querySelector('.box');
const mainContainer = document.querySelector('.main-container');
const checkIcon = document.querySelector('.check-icon');

// 새로운 만들 div를 담아 놓는 배열
const datediv = new Array();

mainContainer.style.display = "none";
checkIcon.addEventListener("click", () => {
  mainContainer.style.display = "block";
});

for (let i = 1; i < 36; i++) {
  datediv[i] = document.createElement('div');
  datediv[i].className = "date";
  datediv[i].innerHTML = i;
  box.appendChild(datediv[i]);
}

// 현재 날짜 요일 값
const date = new Date(Date.now());
const nowdate = date.getDate();

const day = document.querySelectorAll('.date');

// 오늘 날짜 구역을 표시함.
day[nowdate - 1].style.backgroundColor = "white";

const colors = ["green", "pink", "gray", "orange", "tomato", "rgb(204, 204, 255)"];

day[nowdate - 1].addEventListener("mouseenter", () => {
  if (!(day[nowdate - 1].style.backgroundColor == "royalblue")) {
    let random = Math.floor(Math.random() * colors.length);
    day[nowdate - 1].style.backgroundColor = colors[random];
  }
});

day.forEach((el, index) => {
  let idx = index + 1;
  el.addEventListener("click", () => {
    if (userSignInInfor.email == "" && userSignInInfor.pw == "") {
      alert("로그인을 해주세요!(출석해서 파란색 모찌로 만들어보세요!)");
      document.querySelector('.main-container').style.display = "none";
    } else if (idx == nowdate) {
      if (day[index].style.backgroundColor == "royalblue") {
        alert(userSignInInfor.name + " 님은 이미 출석 하셨습니다");
        document.querySelector('.main-container').style.display = "none";
      } else if (!(day[nowdate - 1].style.backgroundColor == "royalblue")) {
        day[index].style.backgroundColor = "royalblue";
        signInCheck = document.createElement('p');
        signInCheck.classList.add('sign-in-check');
        signInCheck.innerHTML = "출석체크 완료!";
        signInText.appendChild(signInCheck);
        document.querySelector('.main-container').style.display = "none";
        alert("출석체크 완료!");
      }
    }
  });
});

day[30].style.visibility = "hidden";
day[31].style.visibility = "hidden";
day[32].style.visibility = "hidden";
day[33].style.visibility = "hidden";
day[34].style.visibility = "hidden";
