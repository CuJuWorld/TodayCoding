const orders = [
    { products: [1, 2, 3] },
    { products: [2, 4] },
    { products: [1, 5] }
];

// Using map, flat, and Set to get unique products
let list = orders.map(order => order.products); // Output: [[1, 2, 3], [2, 4], [1, 5]]
let arr = orders.map(order => order.products).flat(); // Output: [1, 2, 3, 2, 4, 1, 5]
const uniqueProducts = [...new Set(arr)];

console.log(uniqueProducts); // Outputs: [ 1, 2, 3, 4, 5 ]

// flat() Ref: 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat

// const products1 = [{id: 1},{id: 2},{id: 3} ]
// products1.map(p => p.id); // [1,2,3]

// const products2 = [{id: [1, 2, 3]},{id: [2, 4]},{id: [1, 5]} ]
// products2.map(p => p.id); // [[1, 2, 3], [2, 4], [1, 5]]

// const products3 = [{products: [1, 2, 3]},{products: [2, 4]},{products: [1, 5]} ]
// products2.map(p => p.id); // [[1, 2, 3], [2, 4], [1, 5]]

