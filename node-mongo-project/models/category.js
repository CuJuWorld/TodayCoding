const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  CategoryName: {
    type: String,
    required: true,
  },
  CategoryDescription: {
    type: String,
  },
  CategoryCreatedAt: {
    type: Date,
    default: Date.now,
  },
});




module.exports = mongoose.model('Category', categorySchema);
