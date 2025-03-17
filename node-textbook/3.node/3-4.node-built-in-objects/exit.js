let i = 1;
setInterval(() => {
  if (i === 5) {
    console.log('종료!');
    process.exit(); // 에러가 발생해서 종료하는 경우에는 process.exit(1); 이렇게 인자에 1을 넣어주면 됨
  }
  console.log(i);
  i += 1;
}, 1000);
