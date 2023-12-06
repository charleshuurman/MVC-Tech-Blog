const express = require('express');
const { Post, Comment, User } = require('../models');
const router = express.Router();

// Route to display all posts with their comments and the users who commented
router.get('/posts', async (req, res) => {
    
    try {
        const posts = await Post.findAll({
            include: [
                { 
                    model: Comment, 
                    as: 'comments',
                    include: [{ model: User, as: 'user' }] 
                }
            ]
        });
        res.render('blogPost', { 
            posts, 
            headerTitle: 'All Posts',
            loggedIn: req.session.userId ? true : false 
        });
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
        await Post.create({ title, content, imageUrl, url, userId: req.session.userId });
        res.redirect('/posts');
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).send('Error creating post');
    }
});

// Route to seeng a single post
router.get('/posts/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findByPk(postId, {
            include: [
                { 
                    model: Comment, 
                    as: 'comments', 
                    include: [{ model: User, as: 'user' }] 
                },
                {
                    model: User,
                    as: 'author'
                }
            ]
        });
  
        if (!post) {
            res.status(404).send('Post not found');
        } else {
            res.render('singlePost', { 
                post: post.get({ plain: true }), 
                headerTitle: 'Single Post',
                loggedIn: req.session.userId ? true : false 
            });
        }
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).send('Error loading post');
    }
  });



// Route to display the form for editing a post
router.get('/posts/edit/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        res.render('editPost', { post });
    } catch (error) {
        console.error('Error fetching post for edit:', error);
        res.status(500).send('Error loading edit form');
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
router.post('/posts/delete/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        await Post.destroy({ where: { id: postId } });
        res.redirect('/dashboard'); // Redirect to the dashboard after deletion
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).send('Error deleting post');
    }
});

module.exports = router;
