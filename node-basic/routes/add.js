const express = require('express');
const multer = require('multer');
let imagepath = ''; // 업로드된 이미지 경로 기억용

const storage = multer.diskStorage({
  destination: (req, file, done) => {
    done(null, './public/image');
  },
  filename: (req, file, done) => {
    done(null, file.originalname);
  },
});
const upload = multer({ storage });

module.exports = (db) => {
  const router = express.Router();

  router.get('/enter', (req, res) => {
    res.render('enter.ejs'); // views/enter.ejs 렌더링
  });

  router.post('/photo', upload.single('picture'), (req, res) => {
    imagepath = '/image/' + req.file.filename;
    res.redirect('/add/enter'); // 업로드 후 다시 글쓰기 페이지로 이동
  });

  router.post('/save', async (req, res) => {
    await db.collection('post').insertOne({
      title: req.body.title,
      content: req.body.content,
      date: req.body.someDate,
      path: imagepath,
    });
    imagepath = ''; // 업로드 경로 초기화
    res.redirect('/post/list');
  });

  return router;
};
