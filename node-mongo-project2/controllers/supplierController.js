const supplierService = require('../services/supplierService');
const mongoose = require('mongoose');

// Utility function to handle errors
const handleApiError = (res, error, statusCode = 500, message = 'Internal server error') => {
    console.error(message + ':', error);
    res.status(statusCode).json({ message: error.message || message });
};

// Get all suppliers
exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await supplierService.getAllSuppliers();
        res.json(suppliers);
    } catch (err) {
        handleApiError(res, err);
    }
};

// Get a single supplier by ID
exports.getSupplierById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid Supplier ID format' });
    }
    try {
        const supplier = await supplierService.getSupplierById(id);
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.json(supplier);
    } catch (err) {
        handleApiError(res, err, 500, 'Error fetching supplier');
    }
};

// Create a new supplier
exports.createSupplier = async (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ message: 'Supplier name is required' });
    }
    try {
        const newSupplier = await supplierService.createSupplier(req.body);
        res.status(201).json(newSupplier);
    } catch (err) {
        handleApiError(res, err, 500, 'Error creating supplier');
    }
};

// Update a supplier by ID
exports.updateSupplier = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid Supplier ID format' });
    }
    try {
        const updatedSupplier = await supplierService.updateSupplier(id, req.body);
        if (!updatedSupplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.json(updatedSupplier);
    } catch (err) {
        handleApiError(res, err, 400, 'Error updating supplier'); // Could be 400 if validation fails in service
    }
};

// Delete a supplier by ID
exports.deleteSupplier = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid Supplier ID format' });
    }
    try {
        const deletedSupplier = await supplierService.deleteSupplier(id);
        if (!deletedSupplier) {
            return res.status(404).json({ message: `Supplier ${id} not found or already deleted.` });
        }
        res.json({ message: `Supplier ${id} deleted successfully` });
    } catch (err) {
        handleApiError(res, err, 500, 'Error deleting supplier');
    }
};