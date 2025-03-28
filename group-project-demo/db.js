const mongoose = require('mongoose'); // Import the Mongoose library for interacting with MongoDB

// Define an asynchronous function to connect to the MongoDB database
const connectDB = async () => {
    try {
        // Attempt to connect to the MongoDB database at the specified URI
        await mongoose.connect('mongodb://localhost:27017/mydatabase'); // Connect to the database 'mydatabase' on localhost
        console.log('MongoDB connected'); // Log a success message if the connection is established
    } catch (err) {
        // If there's an error during the connection attempt
        console.error('MongoDB connection error:', err); // Log the error details to the console
        process.exit(1); // Exit the process with a failure status code (1)
    }
};

// Export the connectDB function so it can be used in other modules
module.exports = connectDB;