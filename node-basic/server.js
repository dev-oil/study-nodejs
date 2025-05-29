const mysql = require('mysql2');
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'myboard',
  port: '3306',
});

conn.connect();

const express = require('express'); // express 라는 메소드 호출
const app = express();
const port = 8080;

app.listen(port, () => console.log('포트 8080으로 서버 대기중 ...'));

// send 방식
// app.get('/', (req, res) =>
//   res.send(`<html>
//       <body>
//         <h1>HOMEPAGE</h1>
//         <p>홈페이지입니다.</p>
//         <marquee>dev-oil 님아 방가방가 ~~ ^^**</marquee>
//       </body>
//     </html>`)
// );

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
app.get('/list', (req, res) => {
  conn.query('select * from post', (err, rows, field) => {
    if (err) throw err;
    console.log(rows);
  });
}); // req - request 요청정보, res - response 응답정보
