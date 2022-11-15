const mongoose = require('mongoose')
const Schema = mongoose.Schema
const users = new Schema({
    login: {
        type: String,
        required : true,
    },
    password: {
        type: String,
        required : true,
    },
    email: {
        type: String,
        required : true,
    },
})

module.exports = User = mongoose.model('users',users)