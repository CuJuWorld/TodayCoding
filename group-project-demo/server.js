const express = require('express'); // Import the Express framework
const connectDB = require('./db'); // Import the database connection function
const itemRoutes = require('./routes/itemRoutes'); // Import the item routes
const middleware = require('./middleware'); // Import the middleware configuration
const path = require('path'); // Import the path module for handling file paths

const app = express(); // Create an instance of an Express application
const PORT = process.env.PORT || 3000; // Set the port to listen on

// Connect to the database
connectDB(); // Call the function to establish a connection to the MongoDB database

// Use the middleware for the Express application
middleware(app); // Call the middleware function, passing the app instance

// Set up the API routes for item-related operations
app.use('/api/items', itemRoutes); // Route all '/api/items' requests to the itemRoutes handler

// Define a route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Send the 'index.html' file located in the 'public' directory
});

app.get('/about', (req, res) => {  
    res.sendFile(path.join(__dirname, 'public', 'about.html')); // Send the 'about.html' file located in the 'public' directory
});

// Start the web server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:3000 `);
});