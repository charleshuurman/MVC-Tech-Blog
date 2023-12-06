const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models'); 

// Sign Up Route
router.get('/signup', (req, res) => {
    res.render('signup', {
        oggedIn: req.session.userId ? true : false,
        headerTitle: 'Create your new account',
    }); // Render the sign-up form
});

router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 6);
        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        res.redirect('/login'); // Redirect to the login page after successful sign up
    } catch (error) {
        res.status(500).send('Error during sign up: ' + error.message);
    }
});

// Log In Route
router.get('/login', (req, res) => {
    res.render('login', {
        loggedIn: req.session.userId ? true : false,
        headerTitle: 'Log in to your account',
    }); // Render the login form
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (user && await bcrypt.compare(req.body.password, user.password)) {
            // User authentication successful
            req.session.userId = user.id; // Save user id in session
            res.redirect('/dashboard'); // Redirect to the dashboard
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        res.status(500).send('Error during login: ' + error.message);
    }
});

// Log Out Route
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error while logging out');
        }
        res.redirect('/login'); // Redirect to login after logout
    });
});

module.exports = router;
