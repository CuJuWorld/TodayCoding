require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Express app
const app = express();
app.use(express.json()); // Parse JSON requests

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Import user routes
const userRoutes = require('./routes/users');
app.use('/users', userRoutes); // Use the user routes

