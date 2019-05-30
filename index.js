const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const port = process.env.PORT || 3000;
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const publicDirectory = path.join(__dirname, 'public');
const { truncate, formatDate, select } = require('./helpers/ejs');
require('./db/mongoose');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views' ))
app.use(cookieParser());
app.use(express.static(publicDirectory))

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

    //ejs helper functions
    res.locals.truncate = truncate;
    res.locals.formatDate = formatDate;
    res.locals.select = select;
    next();
})

//Load routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));

app.listen(port, () => console.log('Server Started'))