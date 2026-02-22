const express = require('express');
const router = express.Router();
const db = require('./db');

// Get all subjects with course name
router.get('/', (req, res) => {
    const query = `
        SELECT tblSubjects.*, tblCourses.courseName
        FROM tblSubjects
        JOIN tblCourses ON tblSubjects.courseId = tblCourses.courseId
    `;

    db.query(query, (err, results) => {
        if (err) return res.json({ success: false, message: 'Database error' });
        res.json({ success: true, subjects: results });
    });
});

// Add subject
router.post('/add', (req, res) => {
    const { courseId, subjectName, semester } = req.body;

    if (!courseId || !subjectName || !semester) {
        return res.json({ success: false, message: 'All fields required' });
    }

    db.query(
        'INSERT INTO tblSubjects (courseId, subjectName, semester) VALUES (?, ?, ?)',
        [courseId, subjectName, semester],
        (err) => {
            if (err) return res.json({ success: false, message: 'Insert failed' });
            res.json({ success: true, message: 'Subject added' });
        }
    );
});

// Delete subject
router.delete('/:id', (req, res) => {
    db.query(
        'DELETE FROM tblSubjects WHERE subjectId = ?',
        [req.params.id],
        (err) => {
            if (err) return res.json({ success: false, message: 'Delete failed' });
            res.json({ success: true });
        }
    );
});

module.exports = router;