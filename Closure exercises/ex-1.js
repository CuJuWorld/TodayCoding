function createProductClickHandler(productId, productName) {
    return function() {
        console.log(`Product clicked: ID=${productId}, Name=${productName}`);
    };
}

// Example usage:
const product1Handler = createProductClickHandler(1, 'Shirt');
const product2Handler = createProductClickHandler(2, 'Shoes');

// Simulating product clicks
product1Handler(); // Product clicked: ID=1, Name=Shirt
product2Handler(); // Product clicked: ID=2, Name=Shoes