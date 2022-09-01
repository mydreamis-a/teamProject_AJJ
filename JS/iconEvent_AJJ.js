const mainEvent = document.querySelector('.main-event');

mainEvent.style.display = "none";

let stop;

function time() {
  // mainEvent.style.display = "block";
  let eventleft = Math.floor(Math.random() * 1851);
  let eventtop = Math.floor(Math.random() * 801);
  mainEvent.style.top = eventtop + "px";
  mainEvent.style.left = `${eventleft}px`;
  let _time = Math.floor(Math.random() * 10) * 10000;
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

let point = ["꽝", "꽝", "꽝", "10", "10", "100", "100", "1000", "10000", "100000"];

mainEvent.addEventListener("click", () => {
  let eventPoint = Math.floor(Math.random() * 10);
  clearTimeout(stop);
  alert(`${point[eventPoint]} 당첨`);
  mainEvent.style.display = "none";
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
