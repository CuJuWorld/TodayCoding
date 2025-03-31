// app.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

var items = [
    { "SKUid": 1, "ProductName": "iPhone 16e", "USD": 499, "InStockQuantity": 15 },
    { "SKUid": 2, "ProductName": "iPhone 16 Plus", "USD": 699, "InStockQuantity": 5 },
    { "SKUid": 3, "ProductName": "iPhone 16 Pro Max", "USD": 899, "InStockQuantity": 10 },
    { "SKUid": 4, "ProductName": "Mac_Air_15", "USD": 999, "InStockQuantity": 20 },
    { "SKUid": 5, "ProductName": "Mac_Pro_14", "USD": 1099, "InStockQuantity": 12 },
    { "SKUid": 6, "ProductName": "Mac Pro 16", "USD": 1199, "InStockQuantity": 8 }
];

// Initialize nextId based on the highest existing ID
let nextId = items.reduce((max, item) => (item.SKUid > max ? item.SKUid : max), 0) + 1;

app.get('/', (req, res) => {
    res.send('Welcome to the REST API!');
});

// Create (POST): Add a new item
app.post('/items', (req, res) => {
    const { ProductName, USD, InStockQuantity } = req.body;

    // Validate input
    if (!ProductName || typeof USD !== 'number' || typeof InStockQuantity !== 'number') {
        return res.status(400).json({
            message: 'Invalid input. Ensure "ProductName" is a string, and "USD" and "InStockQuantity" are numbers.'
        });
    }

    const newItem = { SKUid: nextId, ProductName, USD, InStockQuantity }; // Use nextId
 //   res.status(201).json(newItem);
    items.push(newItem);
++nextId; // Increment nextId for the next item
    res.status(201).json({
        message: 'Item created successfully',
        item: newItem,
        // url: `/items/id:${newItem.SKUid}`
        url: `/items/${newItem.SKUid}`
    });
    // ++nextId; // Increment nextId for the next item

});

// Read (GET): Get all items
app.get('/items', (req, res) => {
    const modifiedItems = items.map(item => {
        return {
            SKUid: item.SKUid,
            ProductName: item.ProductName,
            USD: item.USD,
            InStockQuantity: item.InStockQuantity
        };
    });
    res.json(modifiedItems);
});

app.get('/items/test', (req, res) => {
    res.send('123');
});

// Read (GET): Get a single item by ID
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.SKUid === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');
    
    const modifiedItem = {
        SKUid: item.SKUid,
        ProductName: item.ProductName,
        USD: item.USD,
        InStockQuantity: item.InStockQuantity
    };
    res.json(modifiedItem);
});

// Update (PUT): Update an item by ID
app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.SKUid === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');

    const { ProductName, USD, InStockQuantity } = req.body;

    // Validate input
    if (ProductName) item.ProductName = ProductName;
    if (USD) {
        const parsedUSD = Number(USD);
        if (isNaN(parsedUSD)) {
            return res.status(400).json({ message: 'Invalid USD value. Must be a number.' });
        }
        item.USD = parsedUSD;
    }
    if (InStockQuantity) {
        const parsedQuantity = Number(InStockQuantity);
        if (isNaN(parsedQuantity)) {
            return res.status(400).json({ message: 'Invalid InStockQuantity value. Must be a number.' });
        }
        item.InStockQuantity = parsedQuantity;
    }

    res.json(item);
});

// Delete (DELETE): Delete an item by ID
app.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    const itemIndex = items.findIndex(i => i.SKUid === parseInt(req.params.id));
    if (itemIndex === -1) return res.status(404).send('Item not found');

    try {
        const deletedItem = items.splice(itemIndex, 1);
        res.json({
            message: `The record (${id}) is deleted.`,
            deletedItem
        });
    } catch (error) {
        console.error("Error deleting item:", error);
        return res.status(500).json({ message: 'Failed to delete item.' });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});