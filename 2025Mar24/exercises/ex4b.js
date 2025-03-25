const orders = [
    { products: [1, 2, 3] },
    { products: [2, 4] },
    { products: [1, 5] }
];

const retrieveUniqueProducts = (orders) => {
    const uniqueProducts = new Set();
    orders.forEach(order => {
        order.products.forEach(productId => {
            count++;
            uniqueProducts.add(productId);
        });
    });
    // uniqueProducts Output: Set(5) [1,2,3,4,5]
    return [...uniqueProducts]; // Method 1: convert Set to Array
    return Array.from(uniqueProducts); // Method 2: convert Set to Array
};

console.log(retrieveUniqueProducts(orders));
// Output:
// [ 1, 2, 3, 4, 5 ]