const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    role: String,
    otp: String,
    otpExpiry: Date
});

const User = mongoose.model('User', UserSchema);

module.exports = User;