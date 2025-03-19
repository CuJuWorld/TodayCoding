// Function to simulate fetching product data
function fetchProductData(productId) {
    return new Promise((resolve, reject) => {
        if (productId < 1) {
            reject(`Invalid product ID: ${productId}`);
            return;
        }
        // Simulating a successful fetch
        resolve({
            id: productId,
            name: "Laptop",
            price: 999.99,
            inStock: true
        });
    });
}

// Function to fetch multiple products
function fetchProducts(productIds) {
    // Create an array of promises
    const productPromises = productIds.map(productId => {
        return fetchProductData(productId)
            .then(product => {
                console.log(`Successfully fetched product ID: ${product.id}`);
                return product; // Return the product for the resolved promise
            })
            .catch(error => {
                console.error(error); // Log the error for the failed fetch
                return null; // Return null for the failed fetch
            });
    });

    // Use Promise.all to fetch all products concurrently
    return Promise.all(productPromises).then(products => {
        // Filter out any null values (failed fetches)
        return products.filter(product => product !== null);
    });
}

// Example usage
fetchProducts([1, 2, 0, 3]).then(products => {
    console.log('Successfully fetched products:', products);
});
