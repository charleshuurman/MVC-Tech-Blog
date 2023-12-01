const express = require('express');
const ensureAuthenticated = require('../middleware/authMiddleware');
const { Post } = require('../models');
const router = express.Router();

router.get('/dashboard', async (req, res) => {
    try {
        const userId = req.session.userId;
        const userPosts = await Post.findAll({ where: { userId: userId } });
        const posts = userPosts.map(post => post.get({ plain: true }));

        res.render('dashboard', { posts, headerTitle: 'Your Dashboard' }); // Added headerTitle here
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).send('Error loading dashboard');
    }
});

module.exports = router;
