const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  OrderItems: [{ // Renamed from 'products' to 'OrderItems'
    productId: { // Renamed from 'product' to 'productId'
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    USD: { // Added from Product model
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  }],
  TotalAmount: { // Renamed from 'amount' to 'totalAmount'
    type: Number,
    required: true,
  },
  OrderDate: {
    type: Date,
    default: Date.now,
  },
  PromotionCode: { // Renamed from 'code' to 'PromotionCode'
    type: String,
    required: true,
  },
  OrderStatus: { // Renamed from 'status' to 'orderStatus'
    type: String,
    enum: ['pending', 'completed', 'refunded', 'delivered', 'canceled'],
    default: 'pending',
  },
});

module.exports = mongoose.model('Order', orderSchema);
