const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/20250415_db')
    .then(() => { console.log('Successfully connected to MongoDB!'); })
    .catch(err => { console.error('Error connecting to MongoDB:', err.message); });

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.static('public')); // Serve static files from 'public'

const userRoutes = require('./routes/user'); // Import user routes
app.use('/users', userRoutes); // Mount user routes at /users

// Serve index.html at the root path
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'index.html')); });
app.get('/v2', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'index2.html')); });
app.get('/v3', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'index3.html')); });


// Start server
app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`); });