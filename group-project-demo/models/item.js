const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }, // Field to store the image filename
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;