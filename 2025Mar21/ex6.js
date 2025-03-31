const orders = [
    { customerId: 1, orderDetails: [{ items: [{ productId: 101, amount: 50 }, { productId: 102, amount: 150 }] }] },
    { customerId: 2, orderDetails: [{ items: [{ productId: 103, amount: 200 }] }] },
    { customerId: 1, orderDetails: [{ items: [{ productId: 101, amount: 100 }] }] },
    { customerId: 3, orderDetails: [{ items: [{ productId: 104, amount: 300 }, { productId: 105, amount: 150 }] }] }
];

const summarizeOrders = (orders) => {
    const totalAmounts = {};
    orders.forEach(order => {
        const { customerId, orderDetails } = order;
        if (!totalAmounts[customerId]) totalAmounts[customerId] = 0;
        orderDetails.forEach(detail => {
            detail.items.forEach(item => {
                totalAmounts[customerId] += item.amount;
            });
        });
    });
    return totalAmounts;
};

console.log(summarizeOrders(orders));
// Output:
// { '1': 300, '2': 200, '3': 450 }


