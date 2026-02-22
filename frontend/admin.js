// ==============================
// ADMIN PAGE PROTECTION
// ==============================

const role = localStorage.getItem('role');
const username = localStorage.getItem('username');

if (!role || role.toLowerCase() !== 'admin') {
    alert('Access denied');
    window.location.href = 'login.html';
}

// Welcome message
const welcomeEl = document.getElementById('welcome');
if (welcomeEl) {
    welcomeEl.textContent = `Welcome, ${username}! You are logged in as Admin.`;
}

// Logout function
function logout() {
    localStorage.clear();
    window.location.href = 'login.html';
}

// ==============================
// COURSE MANAGEMENT
// ==============================

const courseList = document.getElementById('courseList');

async function loadCourses() {
    const res = await fetch('http://localhost:3000/courses');
    const data = await res.json();

    courseList.innerHTML = '';

    if (data.courses) {
        data.courses.forEach(course => {
            const li = document.createElement('li');
            li.textContent = course.courseName;

            const btn = document.createElement('button');
            btn.textContent = 'Delete';
            btn.onclick = () => deleteCourse(course.courseId);

            li.appendChild(btn);
            courseList.appendChild(li);
        });

        document.getElementById('courseCount').textContent = data.courses.length;
    }
}

async function addCourse() {
    const courseName = document.getElementById('courseName').value.trim();

    if (!courseName) return alert('Enter course name');

    await fetch('http://localhost:3000/courses/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseName })
    });

    document.getElementById('courseName').value = '';

    loadCourses();
    loadCourseDropdown();
}

async function deleteCourse(id) {
    await fetch(`http://localhost:3000/courses/${id}`, {
        method: 'DELETE'
    });

    loadCourses();
    loadCourseDropdown();
}

// ==============================
// SUBJECT MANAGEMENT
// ==============================

const subjectList = document.getElementById('subjectList');
const courseSelect = document.getElementById('courseSelect');

async function loadCourseDropdown() {
    const res = await fetch('http://localhost:3000/courses');
    const data = await res.json();

    courseSelect.innerHTML = '';

    if (data.courses) {
        data.courses.forEach(course => {
            const option = document.createElement('option');
            option.value = course.courseId;
            option.textContent = course.courseName;
            courseSelect.appendChild(option);
        });
    }
}

async function loadSubjects() {
    const res = await fetch('http://localhost:3000/subjects');
    const data = await res.json();

    subjectList.innerHTML = '';

    if (data.subjects) {
        data.subjects.forEach(sub => {
            const li = document.createElement('li');
            li.textContent = `${sub.subjectName} - ${sub.courseName} (Sem ${sub.semester})`;

            const btn = document.createElement('button');
            btn.textContent = 'Delete';
            btn.onclick = () => deleteSubject(sub.subjectId);

            li.appendChild(btn);
            subjectList.appendChild(li);
        });

        document.getElementById('subjectCount').textContent = data.subjects.length;
    }
}

async function addSubject() {
    const courseId = courseSelect.value;
    const subjectName = document.getElementById('subjectName').value.trim();
    const semester = document.getElementById('semester').value.trim();

    if (!subjectName || !semester) return alert('Fill all fields');

    await fetch('http://localhost:3000/subjects/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, subjectName, semester })
    });

    document.getElementById('subjectName').value = '';
    document.getElementById('semester').value = '';

    loadSubjects();
}

async function deleteSubject(id) {
    await fetch(`http://localhost:3000/subjects/${id}`, {
        method: 'DELETE'
    });

    loadSubjects();
}

// ==============================
// INITIAL LOAD
// ==============================

loadCourses();
loadCourseDropdown();
loadSubjects();