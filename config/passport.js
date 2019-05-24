const GoogleStrategy = require('passport-google-oauth2').Strategy;
const keys = require('./keys');
const User = require('../model/User');

module.exports = function(passport){
    passport.serializeUser((user, done) => {
        done(null, user.id); 
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        })
    })

    passport.use(new GoogleStrategy({
        clientID:keys.googleClientID,
        clientSecret:keys.googleClientSecret,
        callbackURL:'/auth/google/callback',
        proxy:true, //for http 
        passReqToCallback:true
    }, async (req, accessToken, refreshToken, profile, done) => {
        //Find user if exist by google id
        const user = await User.findOne({ googleID: profile.id })
        if(user){
            done(null, user);
        } else{
            //if no user then create user
            const newUser = new User({
                googleID: profile.id,
                firstName: profile.given_name,
                lastName: profile.family_name,
                email: profile.emails[0].value,
                userAvatar: profile.picture
            })
            await newUser.save();
            done(null, newUser);
        } 
    }))
}