const mongoose = require('mongoose');
const { authorSchema, bookSchema } = require('./schemas');

const authorModel = mongoose.model('Author', authorSchema);
const bookModel = mongoose.model('Book', bookSchema);

module.exports = {
  authorModel,
  bookModel
};