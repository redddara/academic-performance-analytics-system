const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const authRoutes = require('./auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'apas_secret', resave: false, saveUninitialized: true }));

// Routes
app.use('/auth', authRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));