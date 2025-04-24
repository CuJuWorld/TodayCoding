const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path'); // Import path module

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/BackendDB_db')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Define Routes (before starting the server)
const productRoutes = require('./routes/product'); // Import product routes
app.use('/products', productRoutes);
const userRoutes = require('./routes/user'); // Import user routes
app.use('/users', userRoutes);
const reviewRoutes = require('./routes/review'); // Import review routes
app.use('/reviews', reviewRoutes);

// Serve registerlogin.html
app.get('/registerlogin', (req, res) => {
    res.sendFile(path.join(__dirname, 'registerlogin.html'));
});

// Serve productadmin.html
app.get('/productadmin', (req, res) => {
    res.sendFile(path.join(__dirname, 'productadmin.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
