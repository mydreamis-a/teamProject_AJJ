const modal = document.querySelector(".modal");
const personIcon = document.querySelector(".person-icon");
const signInExitTag = document.querySelector(".sign-in-exit-btn").addEventListener("click", () => {
  modal.style.display = "none";
});

const userLogin = document.querySelector(".user-login");

personIcon.addEventListener("click", () => {
  modal.style.display = "block";
});

document.querySelector(".sign-in-exit-btn").addEventListener("click", function () {
  modal.style.display = "none";
});
