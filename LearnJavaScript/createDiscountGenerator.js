function createDiscountGenerator(discount) {
    return function(price) {
        return price - (price * discount);
    };
}

// Example Usage:
const tenPercentOff = createDiscountGenerator(0.10);
const twentyPercentOff = createDiscountGenerator(0.20);

console.log(tenPercentOff(100)); // Original Price: $100, Discounted Price: $90
console.log(twentyPercentOff(100)); // Original Price: $100, Discounted Price: $80
