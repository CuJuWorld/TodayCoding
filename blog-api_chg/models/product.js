const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    SKUid: {
        type: Number,
        required: true,
        unique: true,
    },
    //Title
    ProductName: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true
      },
    ProductDescription: {
        type: String
      },
    USD: {
        type: Number,
        required: true,
    },
    ProductCategory: {
        type: String,
        required: true,
    },
    InStockQuantity: {
        type: Number,
        required: true,
    },
    SupplierName: {
        type: String,
        required: true,
    },
    ProductImageUrl: {
        type: String
      },
    ProductCreatedAt: {
        type: Date,
        default: Date.now
      },
});
module.exports = mongoose.model('Product', ProductSchema);
// Here's a quick breakdown of the process:

// Model Name: User
// Lowercase: user
// Pluralization: users
// So, even if you don't explicitly provide the collection name, Mongoose recognizes it as users. 
// If you want to specify a different collection name, you can do so in the model definition like this:

// module.exports = mongoose.model('User', UserSchema, 'users');
