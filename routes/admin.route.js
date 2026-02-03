const express = require('express');
const authorize = require('../middlewares/authorize');
const AuditLog = require('../models/auditlog.mdel');

const router = express.Router()

router.delete('/user/:id', authorize, async (req, res) => {
    await AuditLog.create({
        adminId: req.user.id,
        action: 'DELETE_USER',
        overrideUsed: req.overrideUsed,
        timestamp: new Date()
    });

    res.json({ message: 'User deleted (simulated)' });
})

module.exports = router;