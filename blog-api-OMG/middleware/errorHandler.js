// Error-handling middleware for Express applications
// This middleware captures errors thrown in the application and sends a structured response to the client

const errorHandler = (err, req, res, next) => {
    // Log the error details to the console for debugging purposes
    console.error('Error:', err.message);

    // If the error has a status code, use it; otherwise, default to 500 (Internal Server Error)
    const statusCode = err.status || 500;

    // Send a JSON response with the error details
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error', // Provide a default error message if none is specified
        stack: process.env.NODE_ENV === 'production' ? null : err.stack // Include the stack trace only in non-production environments
    });
};

// Export the middleware for use in other parts of the application
module.exports = errorHandler;