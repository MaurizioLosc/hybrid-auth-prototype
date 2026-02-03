const mongoose = require('mongoose');

const ModelNameSchema = new mongoose.Schema({
    email: String,
    role: String,
    otp: String,
    otpExpiry: Date
});

const ModelName = mongoose.model('ModelName', ModelNameSchema);

module.exports = ModelName;