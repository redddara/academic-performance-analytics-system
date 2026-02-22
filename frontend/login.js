const form = document.getElementById('loginForm');
const message = document.getElementById('message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('/auth/login', {  // same origin
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if(data.success){
            // Save role and username
            localStorage.setItem('role', data.role);
            localStorage.setItem('username', data.username);

            // Redirect by role
            if(data.role === 'admin') window.location.href = 'admin-dashboard.html';
            else if(data.role === 'teacher') window.location.href = 'teacher-dashboard.html';
            else window.location.href = 'student-portal.html';
        } else {
            message.textContent = data.message; // show error
        }
    } catch(err) {
        message.textContent = 'Error connecting to server';
        console.error(err);
    }
});