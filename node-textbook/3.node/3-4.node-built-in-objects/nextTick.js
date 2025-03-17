setImmediate(() => {
  console.log('immediate');
});
process.nextTick(() => {
  console.log('nextTick');
});
setTimeout(() => {
  console.log('timeout');
}, 0);
Promise.resolve().then(() => console.log('promise'));

// 실행 순서
// nextTick;
// promise;
// -----
// timeout;
// immediate;

// 마이크로태스크의 재귀 호출
// process.nextTick 으로 받은 콜백 함수나 resolve 된 Promise는 다른 이벤트 루프에서 대기하는 콜백 함수보다도 더 먼저 실행된다.
// 그래서 비동기 처리를 할 때 setImmediate보다 process.nextTick을 선호하는 개발자도 있으나,,,
// 이런 마이크로태스크를 재귀 호출하게 되면 이벤트 루프는 다른 콜백 하뭇보다 마이크로태스크를 우선해 처리하므로 콜백 함수들이 실행되지 않을 수도 있다.
