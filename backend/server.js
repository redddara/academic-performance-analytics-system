const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const cors = require('cors');

// CONNECTION WITH THE ROUTES
const authRoutes = require('./auth');
const courseRoutes = require('./courses');
const subjectRoutes = require('./subjects');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // allow frontend requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'apas_secret', resave: false, saveUninitialized: true }));

// Serve frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);
app.use('/subjects', subjectRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));