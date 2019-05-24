const express = require('express');
const router = express.Router();
const passport = require('passport');

/*

auth/google: Send our user to Google to authenticate
/auth/google/callback: Google sends our user back to our application with token and profile

*/

//localhost/auth/google=========== google auth needed routes
router.get('/google', passport.authenticate('google', {
    scope:['profile', 'email'] // requesting these two thing if authenticated
}))

router.get('/google/callback', passport.authenticate('google', {
    successRedirect:'/dashboard',
    failureRedirect:'/',
}))

//================

router.get('/logout', (req,res) => {
    req.logout();
    res.redirect('/');
});


module.exports = router;