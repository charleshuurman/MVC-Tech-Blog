const express = require('express');
const router = express.Router();
const { Post, User } = require('../models'); // Import Post and User models

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{
        model: User,
        as: 'author' 
      }]
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('home', { 
      loggedIn: req.session.userId ? true : false,
      posts, 
      headerTitle: 'The Tech Blog' 
    }); 
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
