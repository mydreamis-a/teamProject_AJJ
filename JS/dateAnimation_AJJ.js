class dateAnimation {
  constructor() {
    this.today = new Date();
    this.year = String(this.today.getFullYear()).slice(-2);
    this.month = ("0" + (this.today.getMonth() + 1)).slice(-2);
    this.day = ("0" + this.today.getDate()).slice(-2);
    this.goal = this.year + this.month + this.day;
    this.value = 0;
    this.increasePoint = 0;
    this.increaseCopyTag = null;
    this.increaseTag = document.createElement("div");
    this.init();

    // this.speedUp = null;
    // this.speedincreasePoint = [];
    // this.second = [1, 2, 3, 4, 5, 100];
  }

  init() {
    this.increaseTag.classList.add("date-animation-increase");
    this.increaseTag.innerHTML = `TODAY is<br>0`;
    this.increaseCopyTag = this.increaseTag.cloneNode(true);

    // ㅜ 반복 실행시키기
    setTimeout(() => {
      this.increaseAnimaition(this.increaseTag);
      setInterval(() => {
        this.increaseTag.innerHTML = `TODAY is<br>0`;
        setTimeout(() => {
          this.increaseAnimaition(this.increaseTag);
        }, 500);
      }, 20000);
    }, 1000);

    // ㅜ 복사한 태그도 동시에 반복 실행시키기
    setTimeout(() => {
      this.increaseAnimaition(this.increaseCopyTag);
      setInterval(() => {
        this.increaseCopyTag.innerHTML = `TODAY is<br>0`;
        setTimeout(() => {
          this.increaseAnimaition(this.increaseCopyTag);
        }, 500);
      }, 20000);
    }, 1000);

    // ㅜ 목표 숫자까지 반절씩 5단계로 나눠서 속도의 차이를 두기
    // this.speedTag.innerHTML = 0;
    // for (let i = 0; i < 5; i++) {
    //   this.increasePoint = Math.ceil((this.goal - this.increasePoint) * 0.5 + this.increasePoint);
    //   this.speedincreasePoint.push(this.increasePoint);
    // }
    // this.speedincreasePoint.push(this.goal);
    // this.speedAnimation(0);
  }

  // speedAnimation(index) {
  //   this.speedUp = setInterval(() => {
  //     this.increaseTag.innerHTML++;
  //     if (this.increaseTag.innerHTML >= this.speedincreasePoint[index]) {
  //       clearInterval(this.speedUp);
  //       if (index < this.second.length - 1)
  //         this.speedAnimation(index + 1);
  //     }
  //   }, this.second[index])
  // }

  // ㅜ 1부터 n까지의 합을 구하는 함수
  sum(n) {
    if (n > 1) return n + this.sum(n - 1);
    else if (n > 0) return 1;
    else return n;
  }

  // ㅜ 반대로 어떤 숫자가 1부터 몇 까지의 합을 더하면 되는 것인지 구하는 함수
  againstSum(n) {
    let count = 1;
    let fn = null;
    (fn = () => {
      n -= count;
      if (n < 0) return count--;
      else if (n === 0) return count;
      else {
        count++;
        fn();
      }
    })();
    return count;
    // while (n > 0) {
    //   if (n - this.sum(count) < 0) return count - 1;
    //   else if (n - this.sum(count) === 0) return count;
    //   count++;
    // }
  }

  // ㅜ 증가하는 수치를 감소시키는 함수
  increaseAnimaition(increaseTag) {
    let increaseFn = null;
    let _setTimeOut = null;

    // ㅜ 나머지 값에서 시작하기
    console.log();
    const startValue = this.goal - this.sum(this.againstSum(this.goal));
    this.value = startValue;

    // ㅜ 1씩 감소되는 증가 값을 더해주기 (값이 변경되는 과정이 보이려면 한 번에 처리되지 않도록 setTimeout의 사용이 필요함)
    this.increasePoint = this.againstSum(this.goal);
    _setTimeOut = setTimeout(
      (increaseFn = () => {
        this.value += this.increasePoint;
        increaseTag.innerHTML = `TODAY is<br>${this.value}`;
        this.increasePoint--;

        // ㅜ 증가 값이 0이 될 때까지 반복하기
        _setTimeOut = setTimeout(() => {
          increaseFn();
          if (this.increasePoint <= 0) {
            clearTimeout(_setTimeOut);
          }
        }, 15);
      }),
      0
    );
  }
}

// 07 26 17 수정
