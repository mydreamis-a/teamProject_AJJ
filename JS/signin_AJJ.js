const modal = document.querySelector('.modal');
const personIcon = document.querySelector('.person-icon');
const signInExitTag = document.querySelector('.sign-in-exit-btn').addEventListener("click", () => {
  modal.style.display = "none";
});
personIcon.addEventListener("click", () => {
  const socket = io.connect();

  modal.style.display = "block";

  document.querySelector(".sign-in-btn").addEventListener("click",function(){
    let userInfor = {
      userInputEmail: document.querySelector('#sign-in-email').value,
      userInputPw: document.querySelector('#sign-in-password').value,
    };
    socket.emit("login",userInfor);
    socket.on("loginSuccess",(user)=>{
        alert(`${user}님 환영합니다`);
        signInText = document.createElement('p');
        signInText.classList.add('sign-in-text');
        signInText.innerHTML = `${user} 님 환영합니다!`;
        document.querySelector(".search").appendChild(signInText);
        modal.style.display = "none";
        return;
    })
  })
});
