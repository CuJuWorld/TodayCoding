function fetchProductData(productId) {
    return new Promise((resolve, reject) => {
        if (productId < 1) {
            reject(`Invalid product ID: ${productId}`);
            return;
        }
        // Simulate fetching product data
        resolve({
            id: productId,
            name: "Laptop",
            price: 999.99,
            inStock: true
        });
    });
}

// Example usage:
fetchProductData(1).then(product => {
    console.log('Fetched product:', product);
}).catch(error => {
    console.log(error);
});