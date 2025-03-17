// 2️⃣ Promise(프로미스)
// Promise는 비동기 작업의 결과를 반환하는 객체.
// 성공하면 resolve(), 실패하면 reject()를 호출.
// 콜백과 다르게 .then()과 .catch()를 이용해 가독성이 좋아지고, 콜백 지옥을 해결할 수 있음.

function fetchData() {
  return new Promise((resolve, reject) => {
    console.log('데이터 요청 중...');
    setTimeout(() => {
      let success = true; // 성공 여부 설정

      if (success) {
        resolve('서버에서 받은 데이터'); // 성공 시
      } else {
        reject('데이터 요청 실패!'); // 실패 시
      }
    }, 2000);
  });
}

fetchData()
  .then((result) => console.log('성공', result))
  .catch((error) => console.error('실패...', error));
