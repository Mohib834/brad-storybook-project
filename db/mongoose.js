const mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose.connect( keys.mongoURI , {
    useNewUrlParser:true,
    useCreateIndex:true
}).then(() => console.log('DB connected'))
.catch(e => console.log(e));