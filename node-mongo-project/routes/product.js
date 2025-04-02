const express = require('express');
const router = express.Router();
const Product = require('../models/product'); // Import the Product model


// Get all products
router.get('/', async (req, res) => {
    try {
        let { ProductName } = req.query;
        let products;

        // Filter by name
        if(ProductName) {
            products = await Product.find( { ProductName: ProductName } );
        } else {
            products = await Product.find();
        }
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Get a single user by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // const { name } = req.query;
        var product;

        try {
            //user = await User.findById(id);
            product = await Product.findOne( { _id: id });
            if(!product) res.status(404).json({ message: 'Product not found' });
        } catch (err) {
            res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.log("err", err);
        res.status(500).json({ message: err.message });
    }
});

/* 
const validateEmail = (USD) => {
    return String(USD)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};
*/

const validateUSD = (USD) => {
    const regex = /^\d+(\.\d{1,2})?$/;
    return regex.test(USD);
};

const validateInteger = (InStockQuantity) => {
    const regex = /^\d+$/;
    return regex.test(InStockQuantity);
}
  

// Create a new user
router.post('/', async (req, res) => {
    const { ProductName, USD, InStockQuantity} = req.body;
    if(!ProductName) res.status(400).json({ message: "Missing ProductName field" });
    if(!USD) res.status(400).json({ message: "Missing price field" });
    if(!InStockQuantity) res.status(400).json({ message: "Missing InStock field" });
/*
    const duplicatedEmail = await Product.findOne( { USD: USD }) ? true: false;
    if(duplicatedEmail) res.status(400).json({ message: "duplicated email field. Please enter another email address" });
*/
    if(!validateUSD(USD)) res.status(400).json({ message: "invalid USD field" });
    if(!validateInteger(InStockQuantity)) res.status(400).json({ message: "invalid InStockQuantity field" });
    const product = new Product({
        ProductName,
        USD,
        InStockQuantity
    });

    try {
        const newProduct = await product.save(); // create users collection
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Update a user by ID
router.put('/:id', async (req, res) => {
    try {
        let product;
        const { ProductName, USD } = req.body;
        try {
            product = await Product.findById(req.params.id);
            if(!product) res.status(404).json({ message: 'Product not found' });
        } catch (err) {
            res.status(404).json({ message: 'Product not found' });
        }

        if (ProductName) product.ProductName = ProductName;
        if (USD) product.USD = USD;
        product = await product.save(); // update users collection
        res.json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let product;
        try {
            product = await Product.findOneAndDelete({ _id: id});
            // user = await User.findByIdAndDelete(id);
            if(!product) return res.status(404).json({ message: `Product ${id} has deleted before.` });
        } catch (error) {
            return res.status(404).json({ message: `Product ${id} has deleted before.` });
        }
        res.json({ message: `Product ${id} deleted successfully` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
