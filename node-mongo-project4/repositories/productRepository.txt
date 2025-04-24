// /repositories/productRepository.js

const Product = require('../models/product');

// Get all products
async function findAllProducts() {
    try {
        return await Product.find();
    } catch (error) {
        console.error("Error in Product Repository (findAllProducts):", error);
        throw error;
    }
}

// Get a single product by ID
async function findProductById(id) {
    try {
        return await Product.findById(id);
    } catch (error) {
        console.error("Error in Product Repository (findProductById):", error);
        throw error;
    }
}

// Find a product by name
async function findProductByName(name) {
    try {
        return await Product.findOne({ name });
    } catch (error) {
        console.error("Error in Product Repository (findProductByName):", error);
        throw error;
    }
}

// Create a new product
async function createProduct(productData) {
    try {
        const product = new Product(productData);
        return await product.save();
    } catch (error) {
        console.error("Error in Product Repository (createProduct):", error);
        throw error;
    }
}

// Update a product by ID
async function updateProductById(id, updateData) {
    try {
        const product = await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        return product; // Return the updated document
    } catch (error) {
        console.error("Error in Product Repository (updateProductById):", error);
        throw error;
    }
}

// Update a product by name
async function updateProductByName(name, updateData) {
    try {
        return await Product.findOneAndUpdate({ name }, updateData, { new: true });
    } catch (error) {
        console.error("Error in Product Repository (updateProductByName):", error);
        throw error;
    }
}

// Update product price by ID
async function updateProductPrice(productId, newPrice) {
    try {
        return await Product.findByIdAndUpdate(productId, { productPrice: newPrice }, { new: true });
    } catch (error) {
        console.error("Error in Product Repository (updateProductPrice):", error);
        throw error;
    }
}

// Delete a product by ID
async function deleteProductById(id) {
    try {
        const product = await Product.findByIdAndDelete(id);
        return product; // Return the deleted document (can be null if not found)
    } catch (error) {
        console.error("Error in Product Repository (deleteProductById):", error);
        throw error;
    }
}

// Delete a product by name
async function deleteProductByName(name) {
    try {
        return await Product.findOneAndDelete({ name });
    } catch (error) {
        console.error("Error in Product Repository (deleteProductByName):", error);
        throw error;
    }
}

module.exports = {
    findAllProducts,
    findProductById,
    findProductByName,
    createProduct,
    updateProductById,
    updateProductByName,
    updateProductPrice,
    deleteProductById,
    deleteProductByName,
};