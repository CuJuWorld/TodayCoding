const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/20250331_db')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Define Routes (before starting the server)
const supplierRoutes = require('./routes/supplier'); // Import supplier routes
app.use('/suppliers', supplierRoutes);
const userRoutes = require('./routes/user'); // Import user routes
app.use('/users', userRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
