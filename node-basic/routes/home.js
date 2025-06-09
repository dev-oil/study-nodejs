const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // 메인 홈
  router.get('/', async (req, res) => {
    const posts = await db.collection('post').find().toArray();
    res.render('index.ejs', {
      user: req.session.user ?? null,
      posts,
    });
  });

  // 검색
  router.get('/search', async (req, res) => {
    const keyword = req.query.value;
    const result = await db
      .collection('post')
      .find({
        title: { $regex: keyword, $options: 'i' },
      })
      .toArray();
    res.render('sresult.ejs', { data: result });
  });

  return router;
};
