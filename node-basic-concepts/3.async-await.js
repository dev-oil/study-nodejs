// 3️⃣ async/await
// async/await는 Promise를 더 직관적으로 사용할 수 있도록 만든 문법
// Promise 기반이라서 비동기 작업을 동기 코드처럼 깔끔하게 작성할 수 있어!

function fetchData() {
  return new Promise((resolve) => {
    console.log('데이터 요청 중 ...');
    setTimeout(() => {
      resolve('서버에서 받은 데이터');
    }, 2000);
  });
}

async function getData() {
  console.log('1. 요청 시작');

  let result = await fetchData(); // 비동기 함수 호출
  console.log('2. 받은 데이터', result);

  console.log('3. 실행 완료!');
}

getData();
