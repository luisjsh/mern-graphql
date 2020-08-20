const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: String,
    password: String,
    username: String,
    role: String
})

module.exports = mongoose.model('user', userSchema)