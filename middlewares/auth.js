const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer '))
            return res.status(401).json({ error: 'Authentication required' });

        const token = authHeader.split(' ')[1];

        const secret = req.app.get('jwt-secret');
        if (!secret)
            return res.status(500).json({ error: 'JWT secret not configured' });

        const decoded = jwt.verify(token, secret);

        // Attach user context for downstream authorization
        req.user = {
            id: decoded.id,
            role: decoded.role
        };

        next();
    } catch (err) {
        return res.status(401).json({
            error: 'Invalid or expired token'
        });
    }
};
