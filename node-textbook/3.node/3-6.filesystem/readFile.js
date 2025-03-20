const fs = require('fs');

fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data); // 버퍼 (데이터) 출력 <Buffer ec a0 80 eb a5 bc 20 ec 9d bd ec 96 b4 ec a3 bc ec 84 b8 ec 9a 94 2e>
  console.log(data.toString()); // 읽을 수 있는 형식으로 변환
});
