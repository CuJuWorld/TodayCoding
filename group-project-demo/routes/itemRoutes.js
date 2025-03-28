const express = require('express');
const multer = require('multer'); // for handling multipart/form-data and uploading files
const path = require('path'); 
const Item = require('../models/item');

const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
        // callback function will pass 2 parameters to implement the process
        cb(null, Date.now() + path.extname(file.originalname)); // Append the original file extension
    }
});

// multer will accept file with the name image and store it to req.file.filename
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Limit file size to 1MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }
}).single('image');

const uploadMany =  multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Limit file size to 1MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/; // Allowed file types
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // Check file extension
        const mimetype = filetypes.test(file.mimetype); // Check file MIME type
        if (mimetype && extname) {
            return cb(null, true); // Accept the file
        } else {
            cb('Error: Images Only!'); // Reject the file
        }
    }
}).fields([{ name: 'image', maxCount: 1 }, { name: 'image2', maxCount: 1 }]); // Accept both 'image' and 'image2' fields

// Create a new item
router.post('/', upload, async (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        description: req.body.description,
        image: req.file ? req.file.filename : null // Store filename if uploaded
    });

    try {
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Search Items by name and description
router.get('/search', async (req, res) => {
    try {
        const {name, description} = req.query;
        const items = await Item.find({name: name, description: description}); // filter name
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an item
router.put('/:id', upload, async (req, res) => {
    const updatedData = {
        name: req.body.name,
        description: req.body.description,
    };

    if(req.file && req.file.filename) {
        updatedData.image = req.file.filename; // Get filename from file
    }

    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!updatedItem) return res.status(404).json({ error: 'Item not found' });
        res.status(200).json(updatedItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// for demo only
router.put('/:id/demo', uploadMany, async (req, res) => {
    const updatedData = {
        name: req.body.name,
        description: req.body.description,
    };

    // Check if the first image is uploaded
    if (req.files['image'] && req.files['image'][0].filename) {
        updatedData.image = req.files['image'][0].filename; // Get filename from the first file
    }

    // Check if the second image is uploaded
    if (req.files['image2'] && req.files['image2'][0].filename) {
        updatedData.image2 = req.files['image2'][0].filename; // Get filename from the second file
    }

    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!updatedItem) return res.status(404).json({ error: 'Item not found' });
        res.status(200).json(updatedItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete an item
router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ error: 'Item not found' });
        res.status(200).json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;