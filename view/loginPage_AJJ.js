const modal = document.querySelector(".modal");
const personIcon = document.querySelector(".person-icon");
const signInExitTag = document.querySelector(".sign-in-exit-btn").addEventListener("click", () => {
  modal.style.display = "none";
});

const userLogin = document.querySelector(".user-login").innerHTML;

personIcon.addEventListener("click", () => {
  if(userLogin !== ""){
    alert("내정보 페이지 준비중");
  }else{
    modal.style.display = "block";
  }
});

document.querySelector(".sign-in-exit-btn").addEventListener("click", function () {
  modal.style.display = "none";
});
