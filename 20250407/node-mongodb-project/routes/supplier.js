const express = require('express');
const router = express.Router();
const Supplier = require('../models/supplier'); // Import the Supplier model
const mongoose = require('mongoose');

// Get all suppliers
router.get('/', async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single supplier by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the ID is a valid ObjectId
        if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid Supplier ID format' });

        const supplier = await Supplier.findById(id);
        if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
        
        res.json(supplier);
    } catch (err) {
        console.error("Error fetching supplier:", err);
        res.status(500).json({ message: err.message });
    }
});

// Create a new supplier
router.post('/', async (req, res) => {
    try {
        // Validate request body
        if (!req.body.name) return res.status(400).json({ message: 'Supplier name is required' });

        // Create and save the new supplier
        const supplier = new Supplier(req.body);
        const newSupplier = await supplier.save();
        res.status(201).json(newSupplier);
    } catch (err) {
        console.error("Error creating supplier:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Update a supplier by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the ID is a valid ObjectId
        if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid Supplier ID format' });

        // Update the supplier with the new fields
        const supplier = await Supplier.findByIdAndUpdate(
            id, // Filter by ID
            req.body, // Update fields
            { new: true, runValidators: true } // Options
        );

        if (!supplier) return res.status(404).json({ message: 'Supplier not found' });

        res.json(supplier);
    } catch (err) {
        console.error("Error updating supplier:", err);
        res.status(400).json({ message: err.message });
    }
});

// Delete a supplier by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Check if the ID is a valid ObjectId
        if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid Supplier ID format' });

        const supplier = await Supplier.findByIdAndDelete(id);
        if (!supplier) return res.status(404).json({ message: `Supplier ${id} not found or already deleted.` });
        
        res.json({ message: `Supplier ${id} deleted successfully` });
    } catch (err) {
        console.error("Error deleting supplier:", err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;