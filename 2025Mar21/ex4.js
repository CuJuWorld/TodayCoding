const orders = [
    { products: [1, 2, 3] },
    { products: [2, 4] },
    { products: [1, 5] }
];
const retrieveUniqueProducts = (orders) => {
    const uniqueProducts = {};

    orders.forEach(order => {
        order.products.forEach(productId => {
            // Set the product ID as a key in the object, assign any value, in case the value is undefined
            uniqueProducts[productId] = 'foo'; 
        });
    });
    
    const keys = Object.keys(uniqueProducts); // Get list of unique productId as keys from uniqueProducts object
    return keys.map(Number); // Convert keys back to numbers
};

console.log(retrieveUniqueProducts(orders));
// Output:
// [ 1, 2, 3, 4, 5 ]