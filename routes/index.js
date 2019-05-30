const express = require('express');
const router = express.Router();
const isLoggedIn = require('../helpers/auth');
const Story = require('../model/Story');

router.get('/', (req, res) => {
    res.render('index');
})

router.get('/dashboard', isLoggedIn, async(req, res) => {
    try{
        const stories = await Story.find({ owner: req.user.id });    
        res.render('dashboard', { stories });
        console.log(stories);
    } catch(e){
        console.log(e);
    }
})

router.get('/about', (req, res) => {
    res.render('about');
})

module.exports = router;