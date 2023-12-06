const express = require('express');
const ensureAuthenticated = require('../middleware/authMiddleware');
const { Post, User } = require('../models'); // Import Post and User models
const router = express.Router();

router.get('/dashboard', async (req, res) => {
    try {
        const userId = req.session.userId;
        const userPosts = await Post.findAll({ where: { userId: userId } });
        const posts = userPosts.map(post => post.get({ plain: true }));

        res.render('dashboard', { 
            loggedIn: req.session.userId ? true : false,
            posts, 
            headerTitle: 'Your Dashboard' 
        }); 


    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).send('You need to log in first');
    }
});

module.exports = router;
