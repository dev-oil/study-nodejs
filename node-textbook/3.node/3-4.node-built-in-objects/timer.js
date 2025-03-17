const timeout = setTimeout(() => {
  console.log('1.5초 후 실행');
}, 1500);

const interval = setInterval(() => {
  console.log('1초마다 실행');
}, 1000);

const timeout2 = setTimeout(() => {
  console.log('실행되지 않습니다');
}, 3000);

setTimeout(() => {
  clearTimeout(timeout2);
  clearInterval(interval);
}, 2500);

const immediate = setImmediate(() => {
  console.log('즉시 실행');
});

const immediate2 = setImmediate(() => {
  console.log('실행되지 않습니다');
});

clearImmediate(immediate2);

// setImmediate(콜백)과 setTimeout(콜백, 0)
// 둘의 차이점은?
// 특수한 경우에 setImmediate는 setTimeout(콜백, 0)보다 먼저 실행된다.
// 파일 시스템 접근, 네트워킹 같은 I/O 작업의 콜백 함수 안에서 타이머를 호출하는 경우에만!
// 항상 setImmediate 가 setTimeout보다 먼저 호출되는 것은 아니라는 사실을 알아두자 -> 그냥 setTimeout(콜백,0) 사용을 지양하자
