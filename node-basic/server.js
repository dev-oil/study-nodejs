const express = require('express'); // express 라는 메소드 호출
const app = express();
const port = 8080;

app.listen(port, () => console.log('포트 8080으로 서버 대기중 ...'));
