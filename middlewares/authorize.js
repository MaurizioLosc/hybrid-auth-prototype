const policies = require('../policies/policies.json');
const Override = require('../models/override.model');

module.exports = async(req, res, next) => {
    const { role } = req.user
    const action = req.action

    // get based policy
    const basePolicy = policies[role]?.includes(action)

    
}

