const dep1 = require('./dep1');
const dep2 = require('./dep2');

dep1();
dep2();

// 모듈을 사용할 때 주의해야할 점
// 만약 두 모듈 dep1 과 dep2 가 있고 이 둘이 서로를 require 한다면 ?
// 어떻게 될까?

// 우선 실행하면 dep1 먼저 실행. dep1에선는 require(dep2)가 실행. 다시 dep2에서는 require(dep1) 실행

// 결과는 다음과 같음
// node dep-run.js
// require dep1 {}
// require dep2 [Function (anonymous)]
// dep2 [Function (anonymous)]
// dep1 {}
// (node:11807) Warning: Accessing non-existent property 'Symbol(nodejs.util.inspect.custom)' of module exports inside circular dependency

// dep1의 module.exports가 함수가 아니라 빈 객체로 표시됨
// 이러한 현상을 순환참조 (circular dependency) 라고 한다.
// 순환 참조가 있을 경우에 순환 참조되는 대상을 빈 객체로 만듦. -> 이 때 무서운건 에러가 나지 않음.. (예기치 못한 동작 발생 가능함)
