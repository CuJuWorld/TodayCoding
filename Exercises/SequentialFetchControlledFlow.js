const productDatabase = {
  'prod1': { name: 'iPhone 16e', USD: 499, quantity: 15 },
  'prod2': { name: 'iPhone 16 Plus', USD: 699, quantity: 5 },
  'prod3': { name: 'iPhone 16 Pro Max', USD: 899, quantity: 10 },
  'prod4': { name: 'Mac Air 15', USD: 999, quantity: 20 },
  'prod5': { name: 'Mac Pro 14', USD: 1099, quantity: 12 },
  'prod6': { name: 'Mac Pro 16', USD: 1199, quantity: 8 }
};

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* The async/await syntax allows for writing asynchronous code that looks synchronous. It makes the code easier to read and understand, especially when dealing with multiple asynchronous operations.*/
async function fetchProductDetails(productIds) {
  for (const id of productIds) {
      await delay(500); // wait for 1 second
      /* The await keyword pauses the execution of the function until the promise is resolved. This makes it look like the code is executing sequentially, even though it's asynchronous. */
  }
  // console.log();
  console.log('\nProduct database after adjustments: ', productDatabase);
}

function adjustQuantity(productId, amount) {
  if (!Number.isInteger(amount)) {
      console.log(`Amount must be an integer.`);
      return;
  }
  if (productDatabase[productId]) {
      productDatabase[productId].quantity += amount;
      console.log(`${productDatabase[productId].name} stock level adjusts by ${amount}`);
  } else {
      console.log(`Product with ID ${productId} not found.`);
  }
}

/* Pros and Cons of async/await vs Promise:
Pros of async/await:
- Synchronous-looking code: Makes asynchronous code easier to read and understand.
- Error handling: Easier to handle errors using try/catch blocks.
- Debugging: Easier to debug due to synchronous code flow.

Cons of async/await:
 - Requires modern JavaScript: Not supported in older environments without transpilation.
 - Sequential execution: Can lead to slower performance if not used correctly (e.g., awaiting in a loop).

Pros of Promise:
- Flexibility: Can handle multiple asynchronous operations concurrently using Promise.all, Promise.race, etc.
 - Compatibility: Supported in older environments with polyfills.

Cons of Promise:
 - Callback hell: Can lead to deeply nested then() chains, making code harder to read and maintain.
 - Error handling: Requires chaining catch() for error handling, which can be less intuitive.
*/

// Example usage:
const productIds = ['prod1', 'prod2', 'prod3', 'prod4', 'prod5', 'prod6'];
fetchProductDetails(productIds);

console.log("Product database before adjustments:", productDatabase, '\n');

// Adjust quantity example:
adjustQuantity('prod1', -15); // Decrease quantity of prod1 by 15
adjustQuantity('prod2', 95); // Increase quantity of prod2 by 95
adjustQuantity('prod3', -10); // Decrease quantity of prod3 by 10
adjustQuantity('prod4', 80); // Increase quantity of prod4 by 80
adjustQuantity('prod5', -12); // Decrease quantity of prod5 by 12
adjustQuantity('prod6', 92); // Increase quantity of prod6 by 92

// console.log("Product database after adjustments:", productDatabase);