const policies = require('../policies/policies.json');
const Override = require('../models/override.model');

module.exports = async (req, res, next) => {
    const { role } = req.user
    const action = req.action

    // get based policy
    const basePolicy = policies[role]?.includes(action)

    // find any policy overrides
    const override = await Override.findOne({
        adminId: req.user.id,
        action,
        expiresAt: { $gt: new Date() }
    });

    if (!basePolicy && !override)
        return res.status(403).json({ error: 'Access denied' });

    req.overrideUsed = !!override;
    next();
}

