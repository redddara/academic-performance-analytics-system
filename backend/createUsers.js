const bcrypt = require('bcryptjs');
const db = require('./db');

const users = [
    { username: 'admin1', password: 'admin123', role: 'Admin' },
    { username: 'teacher1', password: 'teach123', role: 'Teacher' },
    { username: 'student1', password: 'stud123', role: 'Student' }
];

users.forEach(async user => {
    const hash = await bcrypt.hash(user.password, 10);
    db.query(
        'INSERT INTO tblUsers (username, password, role) VALUES (?, ?, ?)',
        [user.username, hash, user.role],
        (err, results) => {
            if(err) console.log(err);
            else console.log(`${user.role} added: ${user.username}`);
        }
    );
});