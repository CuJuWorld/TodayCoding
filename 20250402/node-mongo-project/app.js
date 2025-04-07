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
const userRoutes = require('./routes/user'); // Import user routes
const categoryRoutes = require('./routes/category'); // Import user routes
const productRoutes = require('./routes/product'); // Import user routes
const supplierRoutes = require('./routes/supplier'); // Import user routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/suppliers', supplierRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
