const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;


// Middleware
app.use(bodyParser.json());


// MongoDB connection
// mongoose.connect('your-mongodb-connection-string', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected...'))
// .catch((err) => console.log('MongoDB connection error:', err));

mongoose.connect('mongodb://localhost:27017/your_database_name')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Define Routes (before starting the server)
const userRoutes = require('./routes/user'); // Import user routes
app.use('/users', userRoutes);       // Use user routes


// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
