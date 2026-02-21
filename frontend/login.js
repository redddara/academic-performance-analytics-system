const form = document.getElementById('loginForm');
const message = document.getElementById('message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();
        if(res.ok){
            message.textContent = `Logged in as ${data.role}`;
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);

            // Example role-based redirect
            if(data.role === 'admin') window.location.href = 'admin-dashboard.html';
            else if(data.role === 'teacher') window.location.href = 'teacher-dashboard.html';
            else window.location.href = 'student-portal.html';
        } else {
            message.textContent = data; // show error message
        }
    } catch(err) {
        message.textContent = 'Error connecting to server';
        console.error(err);
    }
});