import express from 'express'; // Import the Express framework
import path from 'path'; // Import the path module for handling file paths
import multer from 'multer'; // for handling multipart/form-data and uploading files
import mongoose from 'mongoose'; // Import Mongoose for MongoDB interaction
import { fileURLToPath } from 'url';

// Set up __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); // Create an instance of an Express application
const PORT = process.env.PORT || 3000; // Set the port to listen on
const router = express.Router();

// Define the Item schema
const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }, // Field to store the image filename
});

const Item = mongoose.model('Item', ItemSchema);

// Connect to the MongoDB database
try {
    await mongoose.connect('mongodb://localhost:27017/mydatabase');
    console.log('MongoDB connected');
} catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
}

// Use middleware for the Express application
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('public/uploads'));

// Set up multer storage
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append the original file extension
    }
});

// Configure multer
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

// Create a new item
router.post('/api/items/', upload, async (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        description: req.body.description,
        image: req.file ? req.file.filename : null
    });

    try {
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all items
router.get('/api/items/', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Search Items by name and description
router.get('/api/items/search', async (req, res) => {
    try {
        const { name, description } = req.query;
        const items = await Item.find({ name, description });
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an item
router.put('/api/items/:id', upload, async (req, res) => {
    const updatedData = {
        name: req.body.name,
        description: req.body.description,
    };

    if (req.file && req.file.filename) {
        updatedData.image = req.file.filename;
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
router.delete('/api/items/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ error: 'Item not found' });
        res.status(200).json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Use the router
app.use(router);

// Start the web server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});