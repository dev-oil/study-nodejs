const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
require('dotenv').config();

const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: 'sdklfjsd',
    resave: false,
    saveUninitialized: true,
  })
);
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');

// MongoDB 연결
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.DB_URL);

client.connect().then(() => {
  console.log('몽고DB 연결 성공');
  const mydb = client.db('myboard');

  // 각 기능별 라우터 주입
  app.use('/', require('./routes/home')(mydb));
  app.use('/post', require('./routes/post')(mydb));
  app.use('/add', require('./routes/add')(mydb));
  app.use('/auth', require('./routes/auth')(mydb));

  app.listen(port, () => console.log(`포트 ${port}에서 대기중...`));
});
