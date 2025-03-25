
const orders = [
    { customerId: 1, orderDetails: [{ items: 
        [{ productId: 101, amount: 50 }, { productId: 102, amount: 150 }] }] },
    { customerId: 2, orderDetails: [{ items: 
        [{ productId: 103, amount: 200 }] }] },
    { customerId: 1, orderDetails: [{ items: 
        [{ productId: 101, amount: 100 }] }] },
    { customerId: 3, orderDetails: [{ items: 
        [{ productId: 104, amount: 300 }, { productId: 105, amount: 150 }] }] }
];

const total = orders.reduce((acc, order) => order.total + acc, defaultValue);

const summary = orders.reduce((acc, order) => {
    const { customerId } = order;

    // Initialize total for the customer if not already done
    if (!acc[customerId]) {
        acc[customerId] = 0;
    }

    // Sum amounts from orderDetails
    order.orderDetails.forEach(detail => {
        detail.items.forEach(item => {
            acc[customerId] += item.amount;
        });
    });

    return acc;
}, {});

console.log(summary);
// Output:
// { '1': 300, '2': 200, '3': 450 }