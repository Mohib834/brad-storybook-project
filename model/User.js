const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleID:{
        type:String,
        required:true //only when we use google authentication
    },
    email:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    userAvatar:{
        type:String
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;