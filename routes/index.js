const express = require('express');
const router = express.Router();

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

router.get('/', (req, res) => {
    res.render('index');
})

router.get('/dashboard', isLoggedIn, (req, res) => {
    res.render('dashboard');
})

module.exports = router;