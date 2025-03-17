// 확장자 mjs 안쓰고 싶으면 package.json에 type: "module" 적용필요
import { odd, even } from './var.mjs';
import checkNumber from './func.mjs';

function checkStringOddOrEven(str) {
  if (str.length % 2) {
    // 홀수면
    return odd;
  }
  return even;
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven('hello'));
