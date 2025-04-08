const express = require('express');
const router = express.Router();
const Order = require('../models/order'); // Import the Order model
const mongoose = require('mongoose');

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
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

        const order = await Order.findById(id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        res.json(order);
    } catch (err) {
        console.error("Error fetching order:", err);
        res.status(500).json({ message: err.message });
    }
});

async function validateOrderData(userId, products) {
    const errors = [];

    // Validate user if provided
    if (userId) {
        const userRecord = await User.findById(userId);
        if (!userRecord) {
            errors.push({ status: 404, message: `User (${userId}) not found` });
        }
    }

    // Validate products
    const productIds = products ? products.map(item => item.product) : [];
    // productIds = [1,3,45,66]
    const fetchedProducts = await Product.find({ _id: { $in: productIds } });
    // fetchedProducts = [{_id : 1, name: 'aa'}, {_id : 3, name: 'aa'}, {_id : 45, name: 'aa'}, {_id : 66, name: 'aa'}]
    // Create a map for quick lookups
    const productMap = fetchedProducts.reduce((map, product) => {
        map[product._id.toString()] = product;
        return map;
    }, {});
    // productMap['1'] =  {_id : 1, name: 'aa'}
    // productMap['3'] =  {_id : 3, name: 'aa'}
    // productMap['45'] =  {_id : 45, name: 'aa'}
    // productMap['66'] =  {_id : 66, name: 'aa'}

    // Check if all products exist and validate quantities
    for (const item of products) {
        const product = productMap[item.product];
        if (!product) {
            errors.push({ status: 404, message: `Product ${item.product} not found` });
        } else if (item.quantity > product.stock) {
            errors.push({ status: 400, message: `Not enough stock for product ${item.product}` });
        }
    }

    return errors;
}

// Create an Order
router.post('/', async (req, res) => {
    try {
        const { user, products, status, totalAmount } = req.body; // Assuming new fields like 'status' and 'totalAmount'

        // Validate order data
        const errors = await validateOrderData(user, products);
        if (errors.length > 0) {
            return res.status(400).json({ messages: errors });
        }

        // Create the new order
        const newOrder = new Order({
            user,
            products,
            status, // New field
            totalAmount, // New field
            createdAt: new Date(), // Assuming 'createdAt' is part of the schema
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        console.error("Error creating order:", err);
        res.status(500).json({ message: err.message });
    }
});

// Update a order by slug
router.put('/:code', async (req, res) => {
    try {
        const { code } = req.params;
        const { user, products, status, totalAmount, ...updateFields } = req.body;

        // Validate order data
        const errors = await validateOrderData(user, products);
        if (errors.length > 0) {
            return res.status(400).json({ messages: errors });
        }

        // Check if the order exists
        let order = await Order.findOne({ code });
        if (!order) {
            return res.status(404).json({ message: `Order (${code}) not found` });
        }

        // Update the existing order
        order = await Order.findOneAndUpdate(
            { code },
            { ...updateFields, products, user, status, totalAmount }, // Include new fields
            { new: true, runValidators: true }
        );

        res.status(200).json(order);
    } catch (err) {
        console.error("Error updating order:", err);
        res.status(500).json({ message: err.message });
    }
});

// Delete a order by ID
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