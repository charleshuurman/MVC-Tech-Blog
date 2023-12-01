const express = require('express');
const router = express.Router();
const { Post } = require('../models');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('home', { posts, headerTitle: 'The Tech Blog' }); 
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
