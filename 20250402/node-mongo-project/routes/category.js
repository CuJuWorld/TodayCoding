const express = require('express');
const router = express.Router();
const Category = require('../models/category'); // Import the Category model
const mongoose = require('mongoose');

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single category by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the ID is a valid ObjectId
        if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid Category ID format' });

        const category = await Category.findById(id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        
        res.json(category);
    } catch (err) {
        console.error("Error fetching category:", err);
        res.status(500).json({ message: err.message });
    }
});

// Create a new category
router.post('/', async (req, res) => {
    try {
        // Validate request body
        if (!req.body.name) return res.status(400).json({ message: 'Category name is required' });

        // Create and save the new category
        const category = new Category(req.body);
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (err) {
        console.error("Error creating category:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Update a category by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the ID is a valid ObjectId
        if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid Category ID format' });

        // Update the category with the new fields
        const category = await Category.findByIdAndUpdate(
            id, // Filter by ID
            req.body, // Update fields
            { new: true, runValidators: true } // Options
        );

        if (!category) return res.status(404).json({ message: 'Category not found' });

        res.json(category);
    } catch (err) {
        console.error("Error updating category:", err);
        res.status(400).json({ message: err.message });
    }
});

// Delete a category by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Check if the ID is a valid ObjectId
        if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid Category ID format' });

        const category = await Category.findByIdAndDelete(id);
        if (!category) return res.status(404).json({ message: `Category ${id} not found or already deleted.` });
        
        res.json({ message: `Category ${id} deleted successfully` });
    } catch (err) {
        console.error("Error deleting category:", err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;