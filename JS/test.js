
const items = [3,4,5,1,8];

items.sort((a, b) => {
    if (a.value > b.value) {
      return 1;
    }
    else if (a.value < b.value) {
      return -1;
    }
    else return 0;

});

console.log(items);