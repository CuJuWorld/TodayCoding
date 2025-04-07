const express = require('express'); // Import the Express framework

const middleware = (app) => {
    // Middleware to parse JSON bodies
    app.use(express.json()); // Enable parsing of JSON request bodies

    // Serve static files from the 'public' directory
    app.use(express.static('public')); // Serve static files (like CSS and JS) from the 'public' directory

    // Enable parsing of URL-encoded data (for form submissions)
    app.use(express.urlencoded({ extended: true })); // Enable parsing of URL-encoded data

    // Set up the API routes for item-related operations
    // This line should remain in your server file where the itemRoutes are defined
    // app.use('/api/items', itemRoutes); // Route all '/api/items' requests to the itemRoutes handler

    // Serve uploaded files from the 'public/uploads' directory
    app.use('/productimages', express.static('productimages')); // Make the uploads directory accessible via the '/uploads' URL path
};

module.exports = middleware; // Export the middleware function