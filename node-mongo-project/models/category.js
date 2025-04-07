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

var category = [
  { "CategoryName": "CellPhone", "CategoryDescription": "Mobile Phone", "CategoryCreatedAt:": "01-Jan-2021" },
  { "CategoryName": "NoteBook", "CategoryDescription": "Computer", "CategoryCreatedAt:": "02-Feb-2022" },
  { "CategoryName": "SmartWatch", "CategoryDescription": "Wearable IoT", "CategoryCreatedAt:": "03-Mar-2023" },
  { "CategoryName": "27inchesLED", "CategoryDescription": "Display", "CategoryCreatedAt:": "04-Apr-2024" },
];


module.exports = mongoose.model('Category', categorySchema);
