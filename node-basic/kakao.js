const express = require('express');
const passport = require('passport');
const kakaoStrategy = require('passport-kakao').Strategy;

const app = express();

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

const users = [];

passport.use(
  new kakaoStrategy(
    {
      clientID: '',
      callbackURL: 'http://localhost:3245/auth/kakao/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      const authId = 'Kakao' + profile.id;
      let user = users.find((user) => user.authId === authId);

      if (!user) {
        user = {
          authId: authId,
          displayName: profile.username ?? profile.displayName,
        };
        users.push(user);
      }
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  console.log('serializeUser');
  done(null, user.authId);
});

passport.deserializeUser((authId, done) => {
  console.log('deserializeUser');
  const user = users.find((user) => user.authId === authId);
  done(null, user ?? false);
});

app.get('/', (req, res) => {
  res.send(`
    <h2>카카오로그인</h2>
    <a href='/auth/kakao'>로그인</a>
    `);
});
app.get('/auth/kakao', passport.authenticate('kakao'));
app.get(
  '/auth/kakao/callback',
  passport.authenticate('kakao', {
    successRedirect: '/profile',
    failureRedirect: '/',
  })
);

app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/');

  res.send(`
    <h2>${req.user.displayName}님 반갑습니다.</h2>
  `);
});

const PORT = 3245;
app.listen(PORT, () => {
  console.log(`포트 ${PORT}에서 실행중...`);
});
