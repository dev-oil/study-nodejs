// 1️⃣ 콜백 (Callback)
// 콜백 함수는 다른 함수의 인자로 전달되어 실행되는 함수.
// 오래된 방식이지만, 비동기 처리를 가능하게 해주는 기본적인 패턴.
// "콜백 지옥(Callback Hell)" 문제가 있기 때문에, 최신 방식으로는 잘 사용하지 않음.

function fetchData(callback) {
  console.log('데이터 요청 중 ...');
  setTimeout(() => {
    let data = '서버에서 받은 데이터';
    console.log('데이터 받기 완료!');
    callback(data);
  }, 2000);
}

function handleData(result) {
  console.log('받은 데이터:', result);
}

// 실행
fetchData(handleData);

// 데이터 요청 중 ...
// 데이터 받기 완료!
// 받은 데이터: 서버에서 받은 데이터
