const express = require('express');
const router = express.Router();
const Product = require('../models/product'); // Import the Product model
const Category = require('../models/category'); // Import the Product model

const mongoose = require('mongoose');

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the ID is a valid ObjectId
        if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid Product ID format' });

        // const product = await Product.findById(id).populate('category', 'name description createdAt');
        const product = await Product.findById(id).populate('category');
        if (!product) return res.status(404).json({ message: 'Product not found' });
        
        // product.category = await Category.findOne({_id: product.category});
        //product = product.populate('category', 'name description createdAt');

        res.json(product);
    } catch (err) {
        console.error("Error fetching product:", err);
        res.status(500).json({ message: err.message });
    }
});

// Create a new product
router.post('/', async (req, res) => {
    try {
        // Create and save the new product
        const product = new Product(req.body);
        const newProduct = await product.save();
        const populatedProduct = await newProduct.populate('category');
        res.status(201).json(populatedProduct);
    } catch (err) {
        console.error("Error creating product:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Update a product by slug
router.put('/:slug', async (req, res) => {
    try {
        // const { slug } = req.params;
        const product = await Product.findOne({ slug: req.params.slug });
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const { category, slug, ...updateFields } = req.body; // Extract category and other fields
    
        // Check if category is provided
        if (category) {
            const { _id: category_id } = (await Category.findOne({ _id: category }))?.toObject() || {};
            if (!category_id) return res.status(404).json({ message: 'Category not found' });
            
            // Assign the category ID to the updateFields
            updateFields.category = category_id;
        }

        // Update the product with the new fields
        const updatedProduct = await Product.findOneAndUpdate(
            { slug: req.params.slug }, // Filter by slug
            updateFields, // Update fields
            { new: true, runValidators: true } // Options
        );
        // new: true gives you the updated document.
        // runValidators: true checks that the updates comply with your schema's validation rules.

        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        const populatedProduct = await updatedProduct.populate("category");

        res.json(populatedProduct);
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(400).json({ message: err.message });
    }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Check if the ID is a valid ObjectId
        if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid Product ID format' });

        const product = await Product.findByIdAndDelete(id);
        if (!product) return res.status(404).json({ message: `Product ${id} not found or already deleted.` });
        
        res.json({ message: `Product ${id} deleted successfully` });
    } catch (err) {
        console.error("Error deleting product:", err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;