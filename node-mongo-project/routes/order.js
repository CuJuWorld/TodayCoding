const express = require('express');
const router = express.Router();
const Order = require('../models/order'); // Import the Order model
const Product = require('../models/product'); // Import the Product model
const mongoose = require('mongoose');

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('user').populate('OrderItems.productId'); // Populate user and product details
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single order by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the ID is a valid ObjectId
        if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid Order ID format' });

        const order = await Order.findById(id).populate('user').populate('OrderItems.productId'); // Populate user and product details
        if (!order) return res.status(404).json({ message: 'Order not found' });

        res.json(order);
    } catch (err) {
        console.error("Error fetching order:", err);
        res.status(500).json({ message: err.message });
    }
});

async function validateOrderData(userId, orderItems) {
    const errors = [];

    // Validate user if provided
    if (userId) {
        const userRecord = await mongoose.model('User').findById(userId); // Assuming User model exists
        if (!userRecord) {
            errors.push({ status: 404, message: `User (${userId}) not found` });
        }
    }

    // Validate order items
    const productIds = orderItems ? orderItems.map(item => item.productId) : [];
    const fetchedProducts = await Product.find({ _id: { $in: productIds } });

    const productMap = fetchedProducts.reduce((map, product) => {
        map[product._id.toString()] = product;
        return map;
    }, {});

    for (const item of orderItems) {
        const product = productMap[item.productId];
        if (!product) {
            errors.push({ status: 404, message: `Product ${item.productId} not found` });
        } else if (item.quantity > product.InStockQuantity) {
            errors.push({ status: 400, message: `Not enough stock for product ${item.productId}` });
        }
    }

    return errors;
}

// Create an Order
router.post('/', async (req, res) => {
    try {
        const { user, OrderItems, PromotionCode, TotalAmount, OrderStatus } = req.body;

        // Validate order data
        const errors = await validateOrderData(user, OrderItems);
        if (errors.length > 0) {
            return res.status(400).json({ messages: errors });
        }

        // Create the new order
        const newOrder = new Order({
            user,
            OrderItems,
            PromotionCode,
            TotalAmount,
            OrderStatus,
            OrderDate: new Date(),
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        console.error("Error creating order:", err);
        res.status(500).json({ message: err.message });
    }
});

// Update an order by PromotionCode
router.put('/:PromotionCode', async (req, res) => {
    try {
        const { PromotionCode } = req.params;
        const { user, OrderItems, TotalAmount, OrderStatus, ...updateFields } = req.body;

        // Validate order data
        const errors = await validateOrderData(user, OrderItems);
        if (errors.length > 0) {
            return res.status(400).json({ messages: errors });
        }

        // Check if the order exists
        let order = await Order.findOne({ PromotionCode });
        if (!order) {
            return res.status(404).json({ message: `Order with PromotionCode (${PromotionCode}) not found` });
        }

        // Update the existing order
        order = await Order.findOneAndUpdate(
            { PromotionCode },
            { ...updateFields, user, OrderItems, TotalAmount, OrderStatus },
            { new: true, runValidators: true }
        );

        res.status(200).json(order);
    } catch (err) {
        console.error("Error updating order:", err);
        res.status(500).json({ message: err.message });
    }
});

// Delete an order by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the ID is a valid ObjectId
        if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid Order ID format' });

        const order = await Order.findByIdAndDelete(id);
        if (!order) return res.status(404).json({ message: `Order ${id} not found or already deleted.` });

        res.json({ message: `Order ${id} deleted successfully` });
    } catch (err) {
        console.error("Error deleting order:", err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;