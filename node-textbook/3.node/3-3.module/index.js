const { odd, even } = require('./var');
const checkNumber = require('./func');

function checkStringOddOrEven(str) {
  if (str.length % 2) {
    return odd;
  } else {
    return even;
  }
}

console.log(checkNumber(10)); // CJS 짝수입니다.
console.log(checkStringOddOrEven('hello')); // CJS 홀수입니다.
