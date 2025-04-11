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
  

// Create a new product
router.post('/', async (req, res) => {
    const { SKUid, ProductName, slug, ProductDescription, USD, ProductCategory, InStockQuantity, SupplierName, ProductImageUrl } = req.body;

    if (!SKUid) return res.status(400).json({ message: "Missing SKUid field" });
    if (!ProductName) return res.status(400).json({ message: "Missing ProductName field" });
    if (!slug) return res.status(400).json({ message: "Missing slug field" });
    if (!USD) return res.status(400).json({ message: "Missing USD field" });
    if (!ProductCategory) return res.status(400).json({ message: "Missing ProductCategory field" });
    if (!InStockQuantity) return res.status(400).json({ message: "Missing InStockQuantity field" });
    if (!SupplierName) return res.status(400).json({ message: "Missing SupplierName field" });

    if (!validateUSD(USD)) return res.status(400).json({ message: "Invalid USD field" });
    if (!validateInteger(InStockQuantity)) return res.status(400).json({ message: "Invalid InStockQuantity field" });

    const product = new Product({
        SKUid,
        ProductName,
        slug,
        ProductDescription,
        USD,
        ProductCategory,
        InStockQuantity,
        SupplierName,
        ProductImageUrl
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Update a product by ID
router.put('/:id', async (req, res) => {
    try {
        const { SKUid, ProductName, slug, ProductDescription, USD, ProductCategory, InStockQuantity, SupplierName, ProductImageUrl } = req.body;
        let product = await Product.findById(req.params.id);

        if (!product) return res.status(404).json({ message: 'Product not found' });

        if (SKUid) product.SKUid = SKUid;
        if (ProductName) product.ProductName = ProductName;
        if (slug) product.slug = slug;
        if (ProductDescription) product.ProductDescription = ProductDescription;
        if (USD) product.USD = USD;
        if (ProductCategory) product.ProductCategory = ProductCategory;
        if (InStockQuantity) product.InStockQuantity = InStockQuantity;
        if (SupplierName) product.SupplierName = SupplierName;
        if (ProductImageUrl) product.ProductImageUrl = ProductImageUrl;

        product = await product.save();
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
