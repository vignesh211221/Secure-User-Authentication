const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) return res.status(401).json({ message: 'Unauthorized: User not found' });

        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access Denied: Admins only' });
    }
    next();
};

const userMiddleware = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(403).json({ message: 'Access Denied: Users only' });
    }
    next();
};

module.exports = { authMiddleware, adminMiddleware, userMiddleware };
