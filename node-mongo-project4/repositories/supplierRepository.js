// /repositories/supplierRepository.js

const Supplier = require('../models/supplier');

// Get all suppliers
async function findAllSuppliers() {
    try {
        return await Supplier.find();
    } catch (error) {
        console.error("Error in Supplier Repository (findAllSuppliers):", error);
        throw error;
    }
}

// Get a single supplier by ID
async function findSupplierById(id) {
    try {
        return await Supplier.findById(id);
    } catch (error) {
        console.error("Error in Supplier Repository (findSupplierById):", error);
        throw error;
    }
}

// Create a new supplier
async function createSupplier(supplierData) {
    try {
        const supplier = new Supplier(supplierData);
        return await supplier.save();
    } catch (error) {
        console.error("Error in Supplier Repository (createSupplier):", error);
        throw error;
    }
}

// Update a supplier by ID
async function updateSupplierById(id, updateData) {
    try {
        const supplier = await Supplier.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        return supplier; // Return the updated document
    } catch (error) {
        console.error("Error in Supplier Repository (updateSupplierById):", error);
        throw error;
    }
}

// Delete a supplier by ID
async function deleteSupplierById(id) {
    try {
        const supplier = await Supplier.findByIdAndDelete(id);
        return supplier; // Return the deleted document (can be null if not found)
    } catch (error) {
        console.error("Error in Supplier Repository (deleteSupplierById):", error);
        throw error;
    }
}

module.exports = {
    findAllSuppliers,
    findSupplierById,
    createSupplier,
    updateSupplierById,
    deleteSupplierById,
};