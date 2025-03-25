const products = [
    { id: 1, name: "Laptop", discount: 10 },
    { id: 2, name: "Phone", discount: 0 },
    { id: 3, name: "Tablet", discount: 5 }
];

const createDiscountSummary = (products) => {
    return products.filter(product => product.discount > 0);
};

console.log(createDiscountSummary(products));
// Output:
[
    { id: 1, name: 'Laptop', discount: 10 },
    { id: 3, name: 'Tablet', discount: 5 }
  ]