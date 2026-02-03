const express = require('express');
const authorize = require('../middlewares/authorize'); 
const AuditLog = require('../models/auditlog.mdel');       

const router = express.Router();

// DELETE USER with override support
router.delete('/user/:id', (req, res, next) => {
    req.action = 'DELETE_USER';
    next();
}, authorize, async (req, res) => {
    // Log the action
    await AuditLog.create({
        adminId: req.user.id,
        action: req.action,
        overrideUsed: req.overrideUsed || false,
        timestamp: new Date()
    });

    res.json({ message: 'User deleted (simulated)' });
});

module.exports = router;
