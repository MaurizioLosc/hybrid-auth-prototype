const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
    adminId: String,
    action: String,
    overrideUsed: Boolean,
    timestamp: Date
});

const AuditLog = mongoose.model('AuditLog', AuditLogSchema);

module.exports = AuditLog;