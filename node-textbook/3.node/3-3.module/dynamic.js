// 다이내믹 임포트란?
// 조건부로 모듈을 불러오는 것을 다이내믹 임포트라고 한다.

const a = false;
if (a) {
  require('./func');
}
console.log('성공');
