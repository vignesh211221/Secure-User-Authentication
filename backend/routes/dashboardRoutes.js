const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware, userMiddleware } = require('../middlewares/middleware');

router.get('/user-dashboard', authMiddleware, userMiddleware, (req, res) => {
    res.json({ 
        message: `Welcome User, ${req.user.username}!`, 
        username: req.user.username 
    });
});

router.get('/admin-dashboard', authMiddleware, adminMiddleware, (req, res) => {
    res.json({ 
        message: `Welcome Admin, ${req.user.username}!`, 
        username: req.user.username 
    });
});

module.exports = router;
