const express = require('express');
const router = express.Router();
const Supplier = require('../models/supplier'); // Import the Supplier model

// Get all suppliers - retrieves all suppliers from the database
router.get('/', async (req, res) => {
    try {
        const suppliers = await Supplier.find(); // Retrieve all suppliers
        res.json(suppliers); // Respond with the suppliers in JSON format
    } catch (err) {
        res.status(500).json({ message: err.message }); // Respond with a 500 status code and error message
    }
});

// Get a single supplier by ID - retrieves a specific supplier by their ID
router.get('/:id', async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id); // Find supplier by ID
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' }); // Respond with 404 if not found
        }
        res.json(supplier); // Respond with the supplier in JSON format
    } catch (err) {
        res.status(500).json({ message: err.message }); // Respond with a 500 status code and error message
    }
});

// Create a new supplier - creates a new supplier in the database
router.post('/', async (req, res) => {
    const supplier = new Supplier({
        SupplierName: req.body.SupplierName,
        SupplierDescription: req.body.SupplierDescription,
        SupplierEmail: req.body.SupplierEmail,
    });

    try {
        const newSupplier = await supplier.save(); // Save the new supplier
        res.status(201).json(newSupplier); // Respond with a 201 status code and the new supplier in JSON format
    } catch (err) {
        res.status(400).json({ message: err.message }); // Respond with a 400 status code and error message
    }
});

// Update a supplier by ID - updates an existing supplier's information
router.patch('/:id', async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id); // Find supplier by ID
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' }); // Respond with 404 if not found
        }

        if (req.body.SupplierName != null) {
            supplier.SupplierName = req.body.SupplierName;
        }
        if (req.body.SupplierDescription != null) {
            supplier.SupplierDescription = req.body.SupplierDescription;
        }
        if (req.body.SupplierEmail != null) {
            supplier.SupplierEmail = req.body.SupplierEmail;
        }

        const updatedSupplier = await supplier.save(); // Save the updated supplier
        res.json(updatedSupplier); // Respond with the updated supplier in JSON format
    } catch (err) {
        res.status(400).json({ message: err.message }); // Respond with a 400 status code and error message
    }
});

// Delete a supplier by ID - deletes a supplier from the database
router.delete('/:id', async (req, res) => {
    try {
        const supplier = await Supplier.findByIdAndDelete(req.params.id); // Delete supplier by ID
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' }); // Respond with 404 if not found
        }
        res.json({ message: 'Supplier deleted successfully' }); // Respond with a success message
    } catch (err) {
        res.status(500).json({ message: err.message }); // Respond with a 500 status code and error message
    }
});

module.exports = router;