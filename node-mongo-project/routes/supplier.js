const express = require('express');
const router = express.Router();
const Supplier = require('../models/supplier'); // Import the User model


// Get all suppliers - retrieves all suppliers from the database
router.get('/', async (req, res) => {
    try {
        const suppliers = await Supplier.find(); // Await the completion of the Supplier.find() promise
        res.json(suppliers); // Respond with the suppliers in JSON format
    } catch (err) {
        res.status(500).json({ message: err.message }); // Respond with a 500 status code and error message
    }
});


// Get a single supplier by ID - retrieves a specific supplier by their ID
router.get('/:id', async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id); // Await the completion of the Supplier.findById() promise
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' }); // Respond with a 404 status code and error message if supplier is not found
        }
        res.json(supplier); // Respond with the supplier in JSON format
    } catch (err) {
        res.status(500).json({ message: err.message }); // Respond with a 500 status code and error message
    }
});


// Create a new supplier - creates a new supplier in the database
router.post('/', async (req, res) => {
    const supplier = new Supplier({
        name: req.body.name,
        email: req.body.email,
    });


    try {
        const newSupplier = await supplier.save(); // Await the completion of the supplier.save() promise
        res.status(201).json(newSupplier); // Respond with a 201 status code and the new supplier in JSON format
    } catch (err) {
        res.status(400).json({ message: err.message }); // Respond with a 400 status code and error message
    }
});


// Update a supplier by ID - updates an existing supplier's information
router.patch('/:id', async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id); // Await the completion of the Supplier.findById() promise
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' }); // Respond with a 404 status code and error message if supplier is not found
        }


        if (req.body.name != null) {
            supplier.name = req.body.name;
        }
        if (req.body.email != null) {
            supplier.email = req.body.email;
        }


        const updatedSupplier = await supplier.save(); // Await the completion of the supplier.save() promise
        res.json(updatedSupplier); // Respond with the updated supplier in JSON format
    } catch (err) {
        res.status(400).json({ message: err.message }); // Respond with a 400 status code and error message
    }
});


// Delete a supplier by ID - deletes a supplier from the database
router.delete('/:id', async (req, res) => {
    try {
        const supplier = await Supplier.findByIdAndDelete(req.params.id); // Await the completion of the Supplier.findByIdAndDelete() promise
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' }); // Respond with a 404 status code and error message if supplier is not found
        }
        res.json({ message: 'Supplier deleted successfully' }); // Respond with a success message in JSON format
    } catch (err) {
        res.status(500).json({ message: err.message }); // Respond with a 500 status code and error message
    }
});


module.exports = router;