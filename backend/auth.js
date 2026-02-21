const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('./db');

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM tblUsers WHERE username = ?', [username], async (err, results) => {
        if(err) return res.json({ success: false, message: 'Database error' });
        if(results.length === 0) return res.json({ success: false, message: 'User not found' });

        const user = results[0];
        const valid = await bcrypt.compare(password, user.password);
        if(!valid) return res.json({ success: false, message: 'Incorrect password' });

        // Login success → return role
        res.json({ success: true, role: user.role, username: user.username });
    });
});

module.exports = router;