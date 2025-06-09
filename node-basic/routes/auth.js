const express = require('express');
const sha = require('sha256');

module.exports = (db) => {
  const router = express.Router();

  router.get('/login', (req, res) => {
    if (req.session.user) {
      return res.redirect('/');
    }
    res.render('login.ejs');
  });

  router.post('/login', async (req, res) => {
    const result = await db
      .collection('account')
      .findOne({ userid: req.body.userid });
    if (result && result.userpw === sha(req.body.userpw)) {
      req.session.user = req.body;
      res.redirect('/');
    } else {
      res.render('login.ejs');
    }
  });

  router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });

  router.get('/signup', (req, res) => {
    res.render('signup.ejs');
  });

  router.post('/signup', async (req, res) => {
    await db.collection('account').insertOne({
      userid: req.body.userid,
      userpw: sha(req.body.userpw),
      usergroup: req.body.usergroup,
      useremail: req.body.useremail,
    });
    res.redirect('/');
  });

  return router;
};
