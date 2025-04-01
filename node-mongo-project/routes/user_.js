const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import the User model


// Get all users - retrieves all users from the database
router.get('/', async (req, res) => {
    try {
        const users = await User.find(); // Await the completion of the User.find() promise
        res.json(users); // Respond with the users in JSON format
    } catch (err) {
        res.status(500).json({ message: err.message }); // Respond with a 500 status code and error message
    }
});


// Get a single user by ID - retrieves a specific user by their ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Await the completion of the User.findById() promise
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // Respond with a 404 status code and error message if user is not found
        }
        res.json(user); // Respond with the user in JSON format
    } catch (err) {
        res.status(500).json({ message: err.message }); // Respond with a 500 status code and error message
    }
});


// Create a new user - creates a new user in the database
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
    });


    try {
        const newUser = await user.save(); // Await the completion of the user.save() promise
        res.status(201).json(newUser); // Respond with a 201 status code and the new user in JSON format
    } catch (err) {
        res.status(400).json({ message: err.message }); // Respond with a 400 status code and error message
    }
});


// Update a user by ID - updates an existing user's information
router.patch('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Await the completion of the User.findById() promise
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // Respond with a 404 status code and error message if user is not found
        }


        if (req.body.name != null) {
            user.name = req.body.name;
        }
        if (req.body.email != null) {
            user.email = req.body.email;
        }


        const updatedUser = await user.save(); // Await the completion of the user.save() promise
        res.json(updatedUser); // Respond with the updated user in JSON format
    } catch (err) {
        res.status(400).json({ message: err.message }); // Respond with a 400 status code and error message
    }
});


// Delete a user by ID - deletes a user from the database
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id); // Await the completion of the User.findByIdAndDelete() promise
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // Respond with a 404 status code and error message if user is not found
        }
        res.json({ message: 'User deleted successfully' }); // Respond with a success message in JSON format
    } catch (err) {
        res.status(500).json({ message: err.message }); // Respond with a 500 status code and error message
    }
});


module.exports = router;