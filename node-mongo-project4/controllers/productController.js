// /controllers/productController.js

const productService = require('../services/productService');
const mongoose = require('mongoose');

// Utility function to handle errors
const handleApiError = (res, error, statusCode = 500, message = 'Internal server error') => {
    console.error(message + ':', error);
    res.status(statusCode).json({ message: error.message || message });
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (err) {
        handleApiError(res, err);
    }
};

// Get a single product by name
exports.getProductByName = async (req, res) => {
    const { name } = req.params;
    try {
        const product = await productService.getProductByName(name);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching product', error: err.message });
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ message: 'Product name is required' });
    }
    try {
        const newProduct = await productService.createProduct(req.body);
        res.status(201).json(newProduct);
    } catch (err) {
        handleApiError(res, err, 500, 'Error creating product');
    }
};

// Update a product by name
exports.updateProductByName = async (req, res) => {
    const { name } = req.params;
    try {
        const updatedProduct = await productService.updateProductByName(name, req.body);
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: 'Error updating product', error: err.message });
    }
};

// Delete a product by name
exports.deleteProductByName = async (req, res) => {
    const { name } = req.params;
    try {
        const deletedProduct = await productService.deleteProductByName(name);
        if (!deletedProduct) {
            return res.status(404).json({ message: `Product ${name} not found or already deleted.` });
        }
        res.json({ message: `Product ${name} deleted successfully` });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting product', error: err.message });
    }
};