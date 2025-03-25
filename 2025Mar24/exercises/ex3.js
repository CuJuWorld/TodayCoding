const orders = [
    { customerId: 1, amount: 250 },
    { customerId: 2, amount: 150 },
    { customerId: 1, amount: 200 },
    { customerId: 3, amount: 300 }
];

const mergeOrders = (orders) => {
    const totalAmounts = {};
    orders.forEach(order => {
        const { customerId, amount } = order;
        if (!totalAmounts[customerId]) totalAmounts[customerId] = 0;
        totalAmounts[customerId] += amount;
    });
    // 1st loop:
        // define and assign order.customerId = 1 to customerId variable
        // define and assign order.amount = 250 to amount variable
        // if totalAmounts[customerId] is undefined value, then set value as 0 for calculation
        // totalAmounts[customerId] = 0 + 250 = 250

    return totalAmounts;
};

console.log(mergeOrders(orders));
// Output:
// { '1': 450, '2': 150, '3': 300 }
