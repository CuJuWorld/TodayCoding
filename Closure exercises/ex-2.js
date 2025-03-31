function createDiscountGenerator(discount) {
    return (price) => {
         //const discountedPrice = price - (price * discount);
         const discountedPrice = price * (1 - discount);
         console.log(`Original Price: $${price}, Discounted Price: $${discountedPrice}`);
         return discountedPrice;
    };
    // return function(price) {
    //     //const discountedPrice = price - (price * discount);
    //     const discountedPrice = price * (1 - discount);
    //     console.log(`Original Price: $${price}, Discounted Price: $${discountedPrice}`);
    //     return discountedPrice;
    // };
}

// Example usage:
const tenPercentOff = createDiscountGenerator(0.10);
const twentyPercentOff = createDiscountGenerator(0.20);

tenPercentOff(100); // Original Price: $100, Discounted Price: $90
twentyPercentOff(100); // Original Price: $100, Discounted Price: $80