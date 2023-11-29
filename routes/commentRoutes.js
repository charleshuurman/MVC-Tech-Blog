const express = require('express');
const { Comment, Post } = require('../models');
const router = express.Router();

router.post('/comments', async (req, res) => {
    try {
        const { postId, content } = req.body; 
        if (!req.session.userId) {
            return res.status(401).send('You must be logged in to comment');
        }

        if (!postId) {
            return res.status(400).send('Post ID is required');
        }

        await Comment.create({
            content,
            postId,
            userId: req.session.userId
        });

        res.redirect(`/posts/${postId}`);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).send('Error posting comment');
    }
});


//DELETE Route to Remove a Comment:
router.delete('/comments/:id', async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id);

        if (!comment) {
            return res.status(404).send('Comment not found');
        }

        // Check if the logged-in user owns the comment
        if (comment.userId !== req.session.userId) {
            return res.status(403).send('You do not have permission to delete this comment');
        }

        await comment.destroy();
        res.redirect('back');
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).send('Error deleting comment');
    }
});

module.exports = router;
