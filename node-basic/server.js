const express = require('express'); // express 라는 메소드 호출
const app = express();
const port = 3245;

const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json()); // JSON도 받을 수 있게 추가

app.set('view engine', 'ejs');

// mongoDB + Node.js 접속 코드
const mongoclient = require('mongodb').MongoClient;
const ObjId = require('mongodb').ObjectId;

const url =
  'mongodb+srv://yoo:[비번]@cluster0.a3vdfze.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoclient
  .connect(url)
  .then((client) => {
    console.log('몽고DB 접속 성공');
    mydb = client.db('myboard');

    app.listen(port, () => console.log('포트 8080으로 서버 대기중 ...'));
  })
  .catch((err) => console.log);

// Mysql + Node.js 접속
const mysql = require('mysql2');
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'myboard',
  port: '3306',
});

conn.connect();

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

app.get('/enter', (req, res) => res.render('enter.ejs'));

app.post('/save', (req, res) => {
  console.log(req.body.title);
  console.log(req.body.content);
  console.log(req.body.someDate);

  mydb
    .collection('post')
    .insertOne({
      title: req.body.title,
      content: req.body.content,
      date: req.body.someDate,
    })
    .then((result) => {
      console.log(result);
      console.log('데이터 추가 성공');
    });

  // SQL
  // let sql = 'insert into post (title, content, created) values(?, ?, now())';
  // let params = [req.body.title, req.body.content];

  // conn.query(sql, params, (err, rows, field) => {
  //   if (err) throw err;
  //   console.log('데이터 추가 성공!');
  // });

  // res.send('데이터 추가 성공');
});

app.get('/list', (req, res) => {
  mydb
    .collection('post')
    .find()
    .toArray()
    .then((result) => {
      console.log(result);
      res.render('list.ejs', { data: result });
    });
}); // req - request 요청정보, res - response 응답정보

app.post('/delete', (req, res) => {
  console.log(req.body._id);
  console.log(req.body);

  req.body._id = new ObjId(req.body._id);
  mydb
    .collection('post')
    .deleteOne(req.body)
    .then((result) => {
      console.log('삭제완료');
      res.status(200).send();
    });
});
