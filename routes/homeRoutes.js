const express = require('express');
const router = express.Router();
const { Post } = require('../models'); // Import Post model

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll(); // Fetch posts from the database
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('home', { posts }); // Render home.handlebars with posts data
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
