const express = require('express');
const router = express.Router();
const isLoggedIn = require('../helpers/auth');
const Story = require('../model/Story');

router.get('/', (req, res) => {
    res.render('index');
})

router.get('/dashboard', isLoggedIn, (req, res) => {
    res.render('dashboard');
})

router.get('/about', (req, res) => {
    res.render('about');
})

module.exports = router;