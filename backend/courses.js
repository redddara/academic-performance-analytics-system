const express = require('express');
const router = express.Router();
const db = require('./db');

// Get all courses
router.get('/', (req, res) => {
    db.query('SELECT * FROM tblCourses', (err, results) => {
        if (err) return res.json({ success: false, message: 'Database error' });
        res.json({ success: true, courses: results });
    });
});

// Add new course
router.post('/add', (req, res) => {
    const { courseName } = req.body;

    if (!courseName) {
        return res.json({ success: false, message: 'Course name required' });
    }

    db.query(
        'INSERT INTO tblCourses (courseName) VALUES (?)',
        [courseName],
        (err) => {
            if (err) return res.json({ success: false, message: 'Insert failed' });
            res.json({ success: true, message: 'Course added successfully' });
        }
    );
});

// Delete course
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    db.query(
        'DELETE FROM tblCourses WHERE courseId = ?',
        [id],
        (err) => {
            if (err) return res.json({ success: false, message: 'Delete failed' });
            res.json({ success: true, message: 'Course deleted' });
        }
    );
});

module.exports = router;