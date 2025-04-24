const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    image: String // Path to the uploaded image
});

const User = mongoose.model('User', userSchema);
module.exports = User;