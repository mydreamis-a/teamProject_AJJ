let emailPw = false;
let justEmail = false;
let justPw = false;
let checkArraySignBoolean = new Array(emailPw, justEmail, justPw);

const modal = document.querySelector('.modal');
const personIcon = document.querySelector('.person-icon');
let userInfor = {
  userInputEmail: document.querySelector('#sign-in-email').value,
  userInputPw: document.querySelector('#sign-in-password').value,
};
const signInExitTag = document.querySelector('.sign-in-exit-btn').addEventListener("click", () => {
  modal.style.display = "none";
});
personIcon.addEventListener("click", () => {
  if (userSignInInfor.email != "" && userSignInInfor.pw != "") {
    alert(userSignInInfor.name + " 님은 이미 로그인 하셨습니다!");
    modal.style.display = "none";
  } else {
    modal.style.display = "block";
    function loadJson() {
      return fetch("/JSON/loginData_AJJ.json")
        .then((res) => res.json())
        .then((json) => json.user)
        .catch((rej) => {
          console.log("연결이 안됐음");
        });
    }
    document.querySelector('.sign-in-btn').addEventListener("click", () => {
      userInfor = {
        userInputEmail: document.querySelector('#sign-in-email').value,
        userInputPw: document.querySelector('#sign-in-password').value,
      };
      {
        loadJson().then((user) => {
          for (const key in user) {
            if (userInfor.userInputEmail == "" && userInfor.userInputPw == "") {
              alert("이메일과 비밀번호를 입력해주세요!");
              break;
            } else if (userInfor.userInputEmail == "" && userInfor.userInputPw != "") {
              alert("이메일을 입력해주세요!");
              break;
            } else if (userInfor.userInputEmail != "" && userInfor.userInputPw == "") {
              alert("패스워드를 입력해주세요!");
              break;
            } else if (userInfor.userInputEmail != "" && userInfor.userInputPw != "") {
              if (user[key].email != userInfor.userInputEmail && user[key].pw == userInfor.userInputPw) {
                checkArraySignBoolean.emailPw = false;
                checkArraySignBoolean.justEmail = true;
                checkArraySignBoolean.justPw = false;
              } else if (user[key].email == userInfor.userInputEmail && user[key].pw != userInfor.userInputPw) {
                checkArraySignBoolean.emailPw = false;
                checkArraySignBoolean.justEmail = false;
                checkArraySignBoolean.justPw = true;
              } else if (user[key].email != userInfor.userInputEmail && user[key].pw != userInfor.userInputPw) {
                checkArraySignBoolean.emailPw = true;
                checkArraySignBoolean.justEmail = false;
                checkArraySignBoolean.justPw = false;
              } else if (user[key].email == userInfor.userInputEmail && user[key].pw == userInfor.userInputPw) {
                checkArraySignBoolean.emailPw = false;
                checkArraySignBoolean.justEmail = false;
                checkArraySignBoolean.justPw = false;
                alert(user[key].name + " 환영합니다!");
                modal.style.display = "none";
                signInText = document.createElement('p');
                signInText.classList.add('sign-in-text');
                userSignInInfor.email = user[key].email;
                userSignInInfor.pw = user[key].pw;
                userSignInInfor.name = user[key].name;
                signInText.innerHTML = userSignInInfor.name + " 님 환영합니다!";
                document.querySelector('.search').appendChild(signInText);
                break;
              }
            }
          }
          if (checkArraySignBoolean.justEmail == true) {
            alert("이메일이 맞지 않습니다");
          } else if (checkArraySignBoolean.justPw == true) {
            alert("비밀번호가 맞지 않습니다");
          } else if (checkArraySignBoolean.emailPw == true) {
            alert("회원님의 정보가 없습니다!");
          }
        });
      }
    });
  }
});
