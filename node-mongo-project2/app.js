const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/20250411_db')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Define Routes (before starting the server)
const supplierRoutes = require('./routes/supplier'); // Import user routes
app.use('/suppliers', supplierRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
