let obj = new Object();
const str = "a";
obj[str] = "1";
obj[`${str}bc`] = 2;
console.log(obj)