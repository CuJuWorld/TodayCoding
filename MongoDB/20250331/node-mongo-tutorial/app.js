const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const userRoutes = require('./routes/user');
app.use('/users', userRoutes);

// Middleware
app.use(bodyParser.json());

// MongoDB connection
// mongoose.connect('mongodb://localhost:27017/20250331_db', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected...'))
//     .catch(err => console.log(err));
mongoose.connect('mongodb://localhost:27017/20250331_db')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});