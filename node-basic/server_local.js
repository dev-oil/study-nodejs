const express = require('express');
const app = express();
const port = 3245;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const sha = require('sha256');

const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const session = require('express-session');
app.use(
  session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.use(express.static('public'));

// MongoDB 연결
const { MongoClient, ObjectId } = require('mongodb');
const url =
  'mongodb+srv://yoo:[비번]@cluster0.a3vdfze.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

let mydb;
MongoClient.connect(url)
  .then((client) => {
    mydb = client.db('myboard');
    console.log('MongoDB 연결 성공');
    app.listen(port, () => console.log(`서버 ${port}번에서 실행 중...`));
  })
  .catch(console.error);

// Passport 전략 설정
passport.use(
  new LocalStrategy(
    {
      usernameField: 'userid',
      passwordField: 'userpw',
    },
    (userid, userpw, done) => {
      mydb
        .collection('account')
        .findOne({ userid })
        .then((user) => {
          if (!user) return done(null, false, { message: '아이디 없음' });
          if (user.userpw !== sha(userpw))
            return done(null, false, { message: '비밀번호 틀림' });
          return done(null, user);
        });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.userid);
});

passport.deserializeUser((userid, done) => {
  mydb
    .collection('account')
    .findOne({ userid })
    .then((user) => {
      done(null, user);
    });
});

// 페이지 라우터
app.get('/', (req, res) => {
  res.render('index.ejs', { user: req.user ?? null });
});

app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

app.get('/signup', (req, res) => {
  res.render('signup.ejs');
});

app.post('/signup', (req, res) => {
  const { userid, userpw, usergroup, useremail } = req.body;

  mydb
    .collection('account')
    .insertOne({
      userid,
      userpw: sha(userpw),
      usergroup,
      useremail,
    })
    .then(() => {
      res.redirect('/login');
    });
});

// 게시글
app.get('/list', (req, res) => {
  mydb
    .collection('post')
    .find()
    .toArray()
    .then((result) => {
      res.render('list.ejs', { data: result });
    });
});

app.get('/enter', (req, res) => {
  res.render('enter.ejs');
});

app.post('/save', (req, res) => {
  const { title, content, someDate } = req.body;

  mydb
    .collection('post')
    .insertOne({
      title,
      content,
      date: someDate,
    })
    .then(() => {
      res.redirect('/list');
    });
});

app.get('/content/:id', (req, res) => {
  const id = new ObjectId(req.params.id);
  mydb
    .collection('post')
    .findOne({ _id: id })
    .then((result) => {
      res.render('content.ejs', { data: result });
    });
});

app.get('/edit/:id', (req, res) => {
  const id = new ObjectId(req.params.id);
  mydb
    .collection('post')
    .findOne({ _id: id })
    .then((result) => {
      res.render('edit.ejs', { data: result });
    });
});

app.post('/edit', (req, res) => {
  const id = new ObjectId(req.body.id);
  const { title, content, someDate } = req.body;

  mydb
    .collection('post')
    .updateOne({ _id: id }, { $set: { title, content, date: someDate } })
    .then(() => {
      res.redirect('/list');
    });
});

app.post('/delete', (req, res) => {
  const id = new ObjectId(req.body._id);
  mydb
    .collection('post')
    .deleteOne({ _id: id })
    .then(() => {
      res.status(200).send();
    })
    .catch(() => {
      res.status(500).send();
    });
});
