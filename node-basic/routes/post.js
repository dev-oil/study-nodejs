const express = require('express');
const { ObjectId } = require('mongodb');

module.exports = (db) => {
  const router = express.Router();

  router.get('/list', async (req, res) => {
    const result = await db.collection('post').find().toArray();
    res.render('list.ejs', { data: result });
  });

  router.get('/content/:id', async (req, res) => {
    const id = new ObjectId(req.params.id);
    const result = await db.collection('post').findOne({ _id: id });
    res.render('content.ejs', { data: result });
  });

  router.post('/delete', async (req, res) => {
    const id = new ObjectId(req.body._id);
    await db.collection('post').deleteOne({ _id: id });
    res.sendStatus(200);
  });

  router.get('/edit/:id', async (req, res) => {
    const id = new ObjectId(req.params.id);
    const result = await db.collection('post').findOne({ _id: id });
    res.render('edit.ejs', { data: result });
  });

  router.post('/edit', async (req, res) => {
    const id = new ObjectId(req.body.id);
    await db.collection('post').updateOne(
      { _id: id },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          date: req.body.someDate,
        },
      }
    );
    res.redirect('/post/list');
  });

  return router;
};
