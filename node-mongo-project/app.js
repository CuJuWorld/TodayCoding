const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path'); // Import the path module for handling file paths

const app = express(); // Create an instance of an Express application
const port = process.env.PORT || 3000; // Set the port to listen on

// Middleware
app.use(bodyParser.json());

// Serve static files from the project directory
app.use(express.static(path.join(__dirname)));

// Import routes
const userAuthRegisterRoute = require('./routes/userauthregister'); // Import userauthregister route
const productReviewRoute = require('./routes/productreview'); // Import productreview route

// Connect to the database
mongoose.connect('mongodb://localhost:27017/20250331_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Define Routes
app.use('/register', userAuthRegisterRoute); // User registration route
app.use('/auth', userAuthRegisterRoute); // Ensure this is correctly defined
app.use('/reviews', productReviewRoute); // Product review route

// Serve index.html as the default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
