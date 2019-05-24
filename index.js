const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');

require('./db/mongoose');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views' ))
app.use(cookieParser());

//passport config
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions

//passport configfile
require('./config/passport')(passport);

//Global vars
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
})

//Load routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

app.listen(port, () => console.log('Server Started'))