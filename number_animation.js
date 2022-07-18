class numberAnimation {
    constructor() {
      this.point = 0;
      this.value = 0;
      this.speedPoint = [];
      this.today = new Date();
      this.year = String(this.today.getFullYear()).slice(-2);
      this.month = ("0" + (this.today.getMonth() + 1)).slice(-2);
      this.day = ("0" + (this.today.getDate())).slice(-2);
      this.goal = this.year + this.month + this.day;
      this.speedUp = null;
      this.second = [1, 2, 3, 4, 5, 100];
      this.increaseTag = document.createElement("div");
      this.init();
    }
    init() {
      const _this = this;
      // _this.speedTag.innerHTML = 0;

      // ㅜ 목표 숫자까지 반절씩 5단계로 나눠서 속도의 차이 두기
      // for (let i = 0; i < 5; i++) {
      //   _this.point = Math.ceil((_this.goal - _this.point) * 0.5 + _this.point);
      //   _this.speedPoint.push(_this.point);
      // }
      // _this.speedPoint.push(_this.goal);
      // console.log(_this.speedPoint);
      // _this.speedAnimation(0);
      _this.increaseTag.classList.add("umber-animation-increase");
      
      // ㅜ 증가하는 수치를 감소시키기
      _this.increaseTag.innerHTML = `TODAY is<br>0`;
      setTimeout(() => {
        _this.increaseAnimaition();
        setInterval(() => {
          _this.increaseTag.innerHTML = `TODAY is<br>0`;
          setTimeout(() => {
            _this.increaseAnimaition();

          }, 1000)
        }, 20000)
      }, 1000)
    }
    // speedAnimation(index) {
    //   const _this = this;
    //   _this.speedUp = setInterval(() => {
    //     _this.increaseTag.innerHTML++;
    //     if (_this.increaseTag.innerHTML >= _this.speedPoint[index]) {
    //       clearInterval(_this.speedUp);
    //       if (index < _this.second.length - 1)
    //         _this.speedAnimation(index + 1);
    //     }
    //   }, _this.second[index])
    // }
    // ㅜ 1부터 n까지의 합 구하기
    sum(n) {
      const _this = this;
      if (n > 1) return n + _this.sum(n - 1);
      else return 1;
    }
    // ㅜ 반대로 어떤 숫자가 1부터 몇 까지의 합을 더한 것인지 구하기
    againstSum(n) {
      const _this = this;
      let count = 1;
      while (n > 0) {
        if (n - _this.sum(count) < 0) return count - 1;
        else if (n - _this.sum(count) === 0) return count;
        count++;
      }
    }
    increaseAnimaition() {
      const _this = this;
      let _setTimeOut = null;
      _this.point = _this.againstSum(_this.goal) + 1;
      _this.value = _this.goal - _this.sum(_this.againstSum(_this.goal));
      _setTimeOut = setTimeout(function increase() {
        _this.point--;
        _this.value += _this.point;
        _this.increaseTag.innerHTML = `TODAY is<br>${_this.value}`;
        _setTimeOut = setTimeout(() => {
          increase();
          if (_this.point <= 0) {
            clearTimeout(_setTimeOut);
          }
        }, 9);
      }, 0)
    }
  }
