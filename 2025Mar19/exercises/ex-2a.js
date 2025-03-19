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

// Function to fetch multiple products using a for loop
function fetchProducts(productIds) {
    const products = []; // Array to store successfully fetched products
    // Create an array of promises to keep track of the fetches
    const fetchPromises = [];

    for (const productId of productIds) {
        const promise = fetchProductData(productId)
            .then(product => {
                console.log(`Successfully fetched product ID: ${product.id}`);
                products.push(product); // Add the product to the results
            })
            .catch(error => {
                console.error(error); // Log the error for the failed fetch
            });

        fetchPromises.push(promise); // Store the promise
    }
    // Return a promise that resolves when all fetches are done
    return Promise.all(fetchPromises).then(() => {
        return products; // Return the array of successfully fetched products
    });
}
// Example usage
fetchProducts([1, 2, 0, 3]).then(products => {
    console.log('Successfully fetched products:', products);
});