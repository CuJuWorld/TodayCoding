const productDatabase = {
    'prod1': { name: 'iPhone 16 Pro Max', quantity: 10 },
    'prod2': { name: 'iPhone 16 Plus', quantity: 5 },
    'prod3': { name: 'iPhone 16e', quantity: 15 },
    'prod4': { name: 'Mac Air 15', quantity: 20 },
    'prod5': { name: 'Mac Pro 16', quantity: 8 },
    'prod6': { name: 'Mac Pro 14', quantity: 12 }
};

async function fetchProductData(productId) {
    if (!productDatabase[productId]) {
        throw new Error(`Product with ID ${productId} not found`);
    }
    return productDatabase[productId];
}

async function fetchProducts(productIds) {
    const fetchPromises = productIds.map(id => 
        fetchProductData(id).then(
            product => {
                console.log(`Successfully fetched product: ${product.name}`);
                return product;
            },
            error => {
                console.error(`Failed to fetch product with ID ${id}: ${error.message}`);
                return null; // Return null for failed fetches
            }
        )
    );

    const results = await Promise.all(fetchPromises);
    return results.filter(product => product !== null); // Filter out failed fetches
}

// Example usage
const productIds = ['prod1', 'prod2', 'prod7', 'prod3', 'prod4'];
fetchProducts(productIds).then(products => {
    console.log('Fetched products:', products);
});
