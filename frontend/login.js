const form = document.getElementById('loginForm');
const message = document.getElementById('message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get input values
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Simple input validation
    if (!username || !password) {
        message.textContent = 'Please enter both username and password.';
        return;
    }

    try {
        const res = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (data.success) {
            // Store username and role in localStorage
            localStorage.setItem('username', data.username);
            localStorage.setItem('role', data.role);

            // Case-insensitive redirect based on role
            const role = data.role.toLowerCase();
            if (role === 'admin') window.location.href = 'admin-dashboard.html';
            else if (role === 'teacher') window.location.href = 'teacher-dashboard.html';
            else if (role === 'student') window.location.href = 'student-portal.html';
            else {
                message.textContent = `Unknown role: ${data.role}`;
            }
        } else {
            // Show backend error message
            message.textContent = data.message || 'Login failed';
        }
    } catch (err) {
        message.textContent = 'Error connecting to server';
        console.error('Login fetch error:', err);
    }
});