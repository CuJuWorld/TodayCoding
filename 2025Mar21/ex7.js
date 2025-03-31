const warehouses = [
    { warehouseId: 1, stock: [{ productId: 101, quantity: 50 }, { productId: 102, quantity: 20 }] },
    { warehouseId: 2, stock: [{ productId: 101, quantity: 30 }, { productId: 103, quantity: 15 }] },
    { warehouseId: 3, stock: [{ productId: 102, quantity: 10 }, { productId: 104, quantity: 5 }] }
];

const productAvailability = (warehouses) => {
    const totalStock = {};
    warehouses.forEach(warehouse => {
        warehouse.stock.forEach(item => {
            const { productId, quantity } = item;
            if (!totalStock[productId]) totalStock[productId] = 0;
            totalStock[productId] += quantity;
        });
    });
    return totalStock;
};

console.log(productAvailability(warehouses));
// Output:
// { '101': 80, '102': 30, '103': 15, '104': 5 }
