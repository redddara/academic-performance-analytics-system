const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // ✅ Add this
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'apas_secret',
    resave: false,
    saveUninitialized: true
}));

// Routes
app.use('/auth', authRoutes);

// Test route (optional but useful)
app.get('/', (req, res) => {
    res.send('Backend is working');
});

// Start server
app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`)
);