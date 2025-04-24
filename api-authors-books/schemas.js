const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const bookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  cantPages: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }
});

module.exports = {
  authorSchema,
  bookSchema
}