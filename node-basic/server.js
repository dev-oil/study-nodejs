const express = require('express'); // express 라는 메소드 호출
const app = express();
const port = 3245;

const sha = require('sha256');

const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json()); // JSON도 받을 수 있게 추가

// 정적 파일 라이브러리
// app.use(express.static('public'));
app.use('/public', express.static('public'));

app.set('view engine', 'ejs');

// 쿠키
let cookieParser = require('cookie-parser');

app.use(cookieParser());
app.get('/cookie', (req, res) => {
  res.cookie('milk', '1000원');
  res.send('product :' + req.cookies.milk);
});

// 세션
let session = require('express-session');
app.use(
  session({
    secret: 'sdklfjsd',
    resave: false,
    saveUninitialized: true,
  })
);

app.get('/session', (req, res) => {
  if (isNaN(req.session.milk)) {
    req.session.milk = 0;
  }
  req.session.milk = req.session.milk + 1000;
  res.send('session : ' + req.session.milk + '원');
});

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
const { render } = require('ejs');
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

app.get('/', (req, res) =>
  res.render('index.ejs', { user: req.session.user ?? null })
);

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
      path: imagepath,
    })
    .then((result) => {
      console.log(result);
      console.log('데이터 추가 성공');
    });
  res.redirect('/list');

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
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
});

app.get('/content/:id', (req, res) => {
  req.params.id = new ObjId(req.params.id);

  mydb
    .collection('post')
    .findOne({ _id: req.params.id })
    .then((result) => {
      console.log(result);
      res.render('content.ejs', { data: result });
    });
});

// edit 값 끌어오기
app.get('/edit/:id', (req, res) => {
  console.log(req.params.id);
  req.params.id = new ObjId(req.params.id);

  mydb
    .collection('post')
    .findOne({ _id: req.params.id })
    .then((result) => {
      console.log(result);
      res.render('edit.ejs', { data: result });
    });
});

// 수정하기
app.post('/edit', (req, res) => {
  console.log(req.body);

  req.body.id = new ObjId(req.body.id);

  // updateOne(수정할 게시물 식별자, 수정할 값)
  mydb
    .collection('post')
    .updateOne(
      { _id: req.body.id },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          date: req.body.someDate,
        },
      }
    )
    .then((result) => {
      console.log('수정 완료');
      res.redirect('/list');
    })
    .catch((err) => console.log(error));
});

// 로그인
// 요청 라우터 생성
app.get('/login', (req, res) => {
  console.log(req.session);
  if (req.session.user) {
    console.log('세션 유지');
    res.render('index.ejs', { user: req.session.user });
  } else {
    res.render('login.ejs');
  }
});

// post
app.post('/login', (req, res) => {
  console.log('아이디 : ' + req.body.userid);
  console.log('비밀번호 : ' + req.body.userpw);

  mydb
    .collection('account')
    .findOne({ userid: req.body.userid })
    .then((result) => {
      if (result.userpw === sha(req.body.userpw)) {
        req.session.user = req.body;
        console.log('새로운 로그인');
        res.redirect('/');
      } else {
        res.render('login.ejs');
      }
    });
});

app.get('/logout', (req, res) => {
  console.log('로그아웃');
  req.session.destroy();
  res.redirect('/');
});

// 회원가입
app.get('/signup', (req, res) => {
  res.render('signup.ejs');
});

app.post('/signup', (req, res) => {
  console.log(req.body.userid);
  console.log(sha(req.body.userpw));
  console.log(req.body.usergroup);
  console.log(req.body.useremail);

  mydb
    .collection('account')
    .insertOne({
      userid: req.body.userid,
      userpw: sha(req.body.userpw),
      usergroup: req.body.usergroup,
      useremail: req.body.useremail,
    })
    .then((result) => {
      console.log('회원가입 성공');
    });
  res.redirect('/');
});

// 이미지 업로드 기능
let multer = require('multer');

let storage = multer.diskStorage({
  destination: (req, file, done) => {
    done(null, './public/image');
  },
  filename: (req, file, done) => {
    done(null, file.originalname);
  },
});

let upload = multer({ storage: storage });

let imagepath = '';

app.post('/photo', upload.single('picture'), (req, res) => {
  console.log(req.file.path);
  imagepath = '/' + req.file.path;
});
