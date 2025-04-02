const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
/* 
  useNewUrlParser: A better way to read the connection address.
  useUnifiedTopology: A simpler and more reliable way to manage connections.
MongoDB connection
mongoose.connect('mongodb://localhost:27017/20250331_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch((err) => console.log('MongoDB connection error:', err));
*/

mongoose.connect('mongodb://localhost:27017/20250331_db')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));


// Define Routes (before starting the server)
const userRoutes = require('./routes/user'); // Import user routes
app.use('/users', userRoutes);       // Use user routes

const productRoutes = require('./routes/product'); // Import user routes
app.use('/products', productRoutes);       // Use user routes

const productRoutes = require('./routes/supplier'); // Import user routes
app.use('/suppliers', supplierRoutes);       // Use user routes

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
