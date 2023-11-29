const express = require('express');
const { Post } = require('../models');
const router = express.Router();

// Route to display all posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.render('blogPost', { posts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Error loading posts');
    }
});

// Route to display the form for creating a new post
router.get('/posts/new', (req, res) => {
    res.render('createPost');
});

// Route to handle creating a new post
router.post('/posts', async (req, res) => {
    try {
        const { title, content, imageUrl, url } = req.body;
        console.log('Received data for new post:', req.body);
        await Post.create({ title, content, imageUrl, url, userId: req.session.userId });
        res.redirect('/posts');
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).send('Error creating post');
    }
});

// Route to display a single post
router.get('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        const plainPost = post.get({ plain: true }); // Convert to plain object
        res.render('post', { post: plainPost });
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).send('Error loading post');
    }
});


// Route to display the form for editing a post
router.get('/posts/edit/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        
        // Log the post object to the console
        console.log('Editing post:', post.toJSON());

        res.render('editPost', { post });
    } catch (error) {
        console.error('Error fetching post for edit:', error);
        res.status(500).send('Error loading edit form');
    }
});

// Route to handle deleting a post with POST method
router.post('/posts/delete/:id', async (req, res) => {
    try {
        await Post.destroy({ where: { id: req.params.id } });
        res.redirect('/dashboard'); // Redirect to the dashboard or appropriate page
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).send('Error deleting post');
    }
});


// Route to handle updating a post using POST method
router.post('/posts/update/:id', async (req, res) => {
    try {
        const { title, content, imageUrl, url } = req.body;
        await Post.update({ title, content, imageUrl, url }, { where: { id: req.params.id } });
        res.redirect('/posts');
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).send('Error updating post');
    }
});


// Route to handle deleting a post
router.delete('/posts/:id', async (req, res) => {
    try {
        await Post.destroy({ where: { id: req.params.id } });
        res.redirect('/posts');
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).send('Error deleting post');
    }
});

module.exports = router;


