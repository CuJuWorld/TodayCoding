// /services/productService.js

const productRepository = require('../repositories/productRepository');

// Get all products
async function getAllProducts() {
    try {
        return await productRepository.findAllProducts();
    } catch (error) {
        console.error("Error in Product Service (getAllProducts):", error);
        throw error;
    }
}

// Get a single product by ID
async function getProductById(id) {
    try {
        return await productRepository.findProductById(id);
    } catch (error) {
        console.error("Error in Product Service (getProductById):", error);
        throw error;
    }
}

// Get a product by name
async function getProductByName(name) {
    return await productRepository.findProductByName(name);
}

// Create a new product
async function createProduct(productData) {
    try {
        return await productRepository.createProduct(productData);
    } catch (error) {
        console.error("Error in Product Service (createProduct):", error);
        throw error;
    }
}

// Update a product by ID
async function updateProduct(id, updateData) {
    try {
        return await productRepository.updateProductById(id, updateData);
    } catch (error) {
        console.error("Error in Product Service (updateProduct):", error);
        throw error;
    }
}

// Update a product by name
async function updateProductByName(name, updateData) {
    return await productRepository.updateProductByName(name, updateData);
}

// Delete a product by ID
async function deleteProduct(id) {
    try {
        return await productRepository.deleteProductById(id);
    } catch (error) {
        console.error("Error in Product Service (deleteProduct):", error);
        throw error;
    }
}

// Delete a product by name
async function deleteProductByName(name) {
    return await productRepository.deleteProductByName(name);
}

async function addProduct(name, price) {
    const productData = {
        name,
        productPrice: price,
    };

    return await productRepository.createProduct(productData);
}

async function changeProductPrice(productId, newPrice) {
    if (newPrice < 0) {
        throw new Error('Price must be a positive value');
    }

    return await productRepository.updateProductPrice(productId, newPrice);
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    addProduct,
    changeProductPrice,
    getProductByName,
    updateProductByName,
    deleteProductByName,
};