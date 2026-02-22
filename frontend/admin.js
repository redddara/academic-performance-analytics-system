const subjectList = document.getElementById('subjectList');
const courseSelect = document.getElementById('courseSelect');

async function loadCourseDropdown() {
    const res = await fetch('http://localhost:3000/courses');
    const data = await res.json();

    courseSelect.innerHTML = '';
    data.courses.forEach(course => {
        const option = document.createElement('option');
        option.value = course.courseId;
        option.textContent = course.courseName;
        courseSelect.appendChild(option);
    });
}

async function loadSubjects() {
    const res = await fetch('http://localhost:3000/subjects');
    const data = await res.json();

    subjectList.innerHTML = '';

    data.subjects.forEach(sub => {
        const li = document.createElement('li');
        li.textContent = `${sub.subjectName} - ${sub.courseName} (Sem ${sub.semester})`;

        const btn = document.createElement('button');
        btn.textContent = 'Delete';
        btn.onclick = () => deleteSubject(sub.subjectId);

        li.appendChild(btn);
        subjectList.appendChild(li);
    });
}

async function addSubject() {
    const courseId = courseSelect.value;
    const subjectName = document.getElementById('subjectName').value;
    const semester = document.getElementById('semester').value;

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

loadCourseDropdown();
loadSubjects();