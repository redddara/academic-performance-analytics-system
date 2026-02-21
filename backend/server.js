const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const authRoutes = require('./auth'); // make sure auth.js exists
const path = require('path');

// Create the app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'apas_secret',
    resave: false,
    saveUninitialized: true
}));

// Serve frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Use authentication routes
app.use('/', authRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});