async function getProduct(productId) {
    try {
        const product = await fetchProductData(productId);
        console.log('Fetched product:', product);
    } catch (error) {
        console.error(error);
    }
}

// Example usage
getProduct(1);


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
