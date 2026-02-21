// backend/auth.js
const express = require('express');
const router = express.Router();

// Example login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Temporary test login (no DB yet)
    if(username === 'admin' && password === 'admin123'){
        return res.json({ success: true, role: 'Admin' });
    }

    res.json({ success: false, message: 'Invalid username or password' });
});

module.exports = router;