const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: 'Field required'
    },
    email:{
        type: String,
        required: 'Field required'
    },
    password:{
        type: String,
        required: 'Field required'
    }
});

const User = mongoose.model('User',userSchema)
module.exports = User