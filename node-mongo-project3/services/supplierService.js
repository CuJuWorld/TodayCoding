// /services/supplierService.js

const supplierRepository = require('../repositories/supplierRepository');

// Get all suppliers
async function getAllSuppliers() {
    try {
        return await supplierRepository.findAllSuppliers();
    } catch (error) {
        console.error("Error in Supplier Service (getAllSuppliers):", error);
        throw error;
    }
}

// Get a single supplier by ID
async function getSupplierById(id) {
    try {
        return await supplierRepository.findSupplierById(id);
    } catch (error) {
        console.error("Error in Supplier Service (getSupplierById):", error);
        throw error;
    }
}

// Create a new supplier
async function createSupplier(supplierData) {
    try {
        return await supplierRepository.createSupplier(supplierData);
    } catch (error) {
        console.error("Error in Supplier Service (createSupplier):", error);
        throw error;
    }
}

// Update a supplier by ID
async function updateSupplier(id, updateData) {
    try {
        return await supplierRepository.updateSupplierById(id, updateData);
    } catch (error) {
        console.error("Error in Supplier Service (updateSupplier):", error);
        throw error;
    }
}

// Delete a supplier by ID
async function deleteSupplier(id) {
    try {
        return await supplierRepository.deleteSupplierById(id);
    } catch (error) {
        console.error("Error in Supplier Service (deleteSupplier):", error);
        throw error;
    }
}

module.exports = {
    getAllSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier,
};