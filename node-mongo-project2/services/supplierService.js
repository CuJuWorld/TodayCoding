const Supplier = require('../models/supplier');

// Get all suppliers
async function getAllSuppliers() {
    try {
        return await Supplier.find();
    } catch (error) {
        console.error("Error fetching all suppliers:", error);
        throw error; // Re-throw for controller to handle
    }
}

// Get a single supplier by ID
async function getSupplierById(id) {
    try {
        return await Supplier.findById(id);
    } catch (error) {
        console.error("Error fetching supplier by ID:", error);
        throw error; // Re-throw for controller to handle
    }
}

// Create a new supplier
async function createSupplier(supplierData) {
    try {
        const supplier = new Supplier(supplierData);
        return await supplier.save();
    } catch (error) {
        console.error("Error creating supplier:", error);
        throw error; // Re-throw for controller to handle
    }
}

// Update a supplier by ID
async function updateSupplier(id, updateData) {
    try {
        const supplier = await Supplier.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        return supplier; // Return the updated document
    } catch (error) {
        console.error("Error updating supplier:", error);
        throw error; // Re-throw for controller to handle
    }
}

// Delete a supplier by ID
async function deleteSupplier(id) {
    try {
        const supplier = await Supplier.findByIdAndDelete(id);
        return supplier; // Return the deleted document (can be null if not found)
    } catch (error) {
        console.error("Error deleting supplier:", error);
        throw error; // Re-throw for controller to handle
    }
}

module.exports = {
    getAllSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier,
};