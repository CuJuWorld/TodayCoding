const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express(); // Create an instance of an Express application
const port = process.env.PORT || 3000; // Set the port to listen on

const middleware = require('./middleware'); // Import the middleware configuration
const path = require('path'); // Import the path module for handling file paths
// Use the middleware for the Express application
middleware(app); // Call the middleware function, passing the app instance
// Middleware
app.use(bodyParser.json());


// Connect to the database
// connectDB(); // Call the function to establish a connection to the MongoDB database


mongoose.connect('mongodb://localhost:27017/20250331_db')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));


// Define Routes (before starting the server)
const userRoutes = require('./routes/user'); // Import user routes
app.use('/users', userRoutes);       // Use user routes

const productRoutes = require('./routes/product'); // Import user routes
app.use('/products', productRoutes);       // Use user routes

const supplierRoutes = require('./routes/supplier'); // Import user routes
app.use('/suppliers', supplierRoutes);       // Use user routes

const categoryRoutes = require('./routes/category'); // Import user routes
app.use('/categories', categoryRoutes);


// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
