const salesData = [
    { productId: 1, sales: [{ amount: 100 }, { amount: 200 }] },
    { productId: 2, sales: [{ amount: 150 }, { amount: 50 }] },
    { productId: 1, sales: [{ amount: 300 }] }
];

const aggregateSales = (salesData) => {
    const totalSales = {};
    salesData.forEach(record => {
        const { productId, sales } = record;
        if (!totalSales[productId]) totalSales[productId] = 0;
        sales.forEach(sale => {
            totalSales[productId] += sale.amount;
        });
    });
    return totalSales;
};

console.log(aggregateSales(salesData));
// Output:
// { '1': 600, '2': 200 }
