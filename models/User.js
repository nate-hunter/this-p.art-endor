const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    img: String,
    bio: String
})

module.exports = mongoose.model("User", UserSchema)