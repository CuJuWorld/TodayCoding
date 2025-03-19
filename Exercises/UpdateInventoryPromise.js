function updateInventory(productId, quantity) {
    return new Promise((resolve, reject) => {
        // Simulate inventory data
        const inventory = {
            'prod1': { name: 'iPhone 16 Pro Max', quantity: 10 },
            'prod2': { name: 'iPhone 16 Plus', quantity: 5 },
            'prod3': { name: 'iPhone 16e', quantity: 15 },
            'prod4': { name: 'Mac Air 15', quantity: 20 },
            'prod5': { name: 'Mac Pro 16', quantity: 8 },
            'prod6': { name: 'Mac Pro 14', quantity: 12 } // Added new product
        };

        // Check if the product ID is valid
        if (!inventory.hasOwnProperty(productId)) {
            reject(`Error: Invalid product ID ${productId}`);
            return;
        }

        // Update the inventory
        inventory[productId].quantity += quantity;

        // Resolve the promise with a success message
        resolve(`Success: Inventory updated for ${inventory[productId].name}`);
    });
}

// Example usage
updateInventory('prod1', 5)
    .then(successMessage => {
        console.log(successMessage);
    })
    .catch(errorMessage => {
        console.error(errorMessage);
    });

updateInventory('prod6', 5) // Changed 'invalidProd' to 'prod6'
    .then(successMessage => {
        console.log(successMessage);
    })
    .catch(errorMessage => {
        console.error(errorMessage);
    });
