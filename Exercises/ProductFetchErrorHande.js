// Function to simulate fetching product data from an API
function fetchProductData(productId) {
  // Sample product list
  const products = {
    'prod1': { name: 'iPhone 16 Pro Max', quantity: 10 },
    'prod2': { name: 'iPhone 16 Plus', quantity: 5 },
    'prod3': { name: 'iPhone 16e', quantity: 15 },
    'prod4': { name: 'Mac Air 15', quantity: 20 },
    'prod5': { name: 'Mac Pro 16', quantity: 8 },
    'prod6': { name: 'Mac Pro 14', quantity: 12 }
  };

  // Return a new Promise
  return new Promise((resolve, reject) => {
    // Simulate a delay of 1 second
    setTimeout(() => {
      // Check if the product ID is invalid
      if (!products[productId]) {
        // Reject the Promise with an error message
        reject("Error: Invalid product ID.");
      } else {
        // If the product ID is valid, fetch the product details
        const product = {
          id: productId,
          ...products[productId]
        };
        // Resolve the Promise with the product data
        resolve(product);
      }
    }, 1000);
  });
}

// Example usage:
// Call fetchProductData with a valid product ID
fetchProductData('prod1')
  .then((product) => {
    // Log the product details if the Promise resolves successfully
    console.log("Product Details:", product);
  })
  .catch((error) => {
    // Log an error message if the Promise is rejected
    console.error("Error:", error);
  });

// Call fetchProductData with an invalid product ID
fetchProductData('invalidProd')
  .then((product) => {
    // Log the product details if the Promise resolves successfully
    console.log("Product Details:", product);
  })
  .catch((error) => {
    // Log an error message if the Promise is rejected
    console.error("Error:", error);
  });
