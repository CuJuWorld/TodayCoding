// Simulated product data
const products = [
    { id: 1, name: "Laptop", price: 999.99, inStock: 10 },
    { id: 2, name: "Smartphone", price: 699.99, inStock: 5 },
    { id: 3, name: "Wireless Headphones", price: 199.99, inStock: 0}
];

// Function to update product inventory
function updateProductInventory(productId, quantity) {
    return new Promise((resolve, reject) => {
        const product = products.find(p => p.id === productId);
        if (!product) {
            reject(`Invalid product ID: ${productId}`);
            return;
        }

        product.inStock += quantity;

        // Ensure inventory doesn't go negative
        if (product.inStock < 0) {
            product.inStock = 0; // Set to 0 if negative
            reject(`Inventory cannot be negative for product ID ${productId}.`);
            return;
        }

        resolve(`Successfully updated product ID ${productId}. New quantity: ${product.inStock}`);
    });
}
updateProductInventory(1, 5) // Adding 5 units to product ID 1
    .then(successMessage => {
        console.log(successMessage);
    })
    .catch(error => {
        console.log(error);
    });

updateProductInventory(3, -1) // Trying to reduce inventory below zero
    .then(successMessage => {
        console.log(successMessage);
    })
    .catch(error => {
        console.log(error);
    });