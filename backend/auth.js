const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('./db');

// Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM tblUsers WHERE username = ?', [username], async (err, results) => {
        if(err) return res.json({ success: false, message: 'Database error' });
        if(results.length === 0) return res.json({ success: false, message: 'User not found' });

        const user = results[0];
            const valid = await bcrypt.compare(password, user.Password); // <-- capital P
            if(!valid) return res.json({ success: false, message: 'Incorrect password' });

        // Login success → return role
        res.json({ success: true, role: user.Role, username: user.Username });
    });
});

module.exports = router;