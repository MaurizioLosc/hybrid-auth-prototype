const mongoose = require('mongoose');

const OverRideSchema = new mongoose.Schema({
    adminId: String,
    action: String,
    reason: String,
    expiresAt: Date
});

const OverRide = mongoose.model('OverRide', OverRideSchema);

module.exports = OverRide;