const express = require('express');
const router = express.Router();
const User = require('../models/User');
const upload = require('../upload'); // Import the upload middleware

// Route to handle form submission
router.post('/submit', async (req, res) => {
    const { name, email } = req.body;
    const newUser = new User({ name, email });

    try {
        await newUser.save();
        res.send('User submitted successfully!');
    } catch (error) {
        res.status(500).send('Error saving user: ' + error.message);
    }
});

// Route to handle form submission with image upload
router.post('/submit/v2', upload.single('image'), async (req, res) => {
    const { name, email } = req.body; // Get name and email from the request body
    const image = req.file; // Get the uploaded file

    try {
        if (image) {
            console.log(`Uploaded file: ${image.filename}`);
            // Save the user with the image path
            const newUser = new User({ name, email, image: image.filename });
            await newUser.save(); // Save new user data
            res.send('User submitted successfully with image!');
        } else {
            res.status(400).send('Image upload failed!');
        }
    } catch (error) {
        res.status(500).send('Error saving user: ' + error.message);
    }
});


module.exports = router;