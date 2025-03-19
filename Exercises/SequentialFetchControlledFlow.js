const products = {
    'prod1': { name: 'iPhone 16 Pro Max', quantity: 10 },
    'prod2': { name: 'iPhone 16 Plus', quantity: 5 },
    'prod3': { name: 'iPhone 16e', quantity: 15 },
    'prod4': { name: 'Mac Air 15', quantity: 20 },
    'prod5': { name: 'Mac Pro 16', quantity: 8 },
    'prod6': { name: 'Mac Pro 14', quantity: 12 }
};

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchProductDetails(productIds) {
    for (const id of productIds) {
        await delay(1000); // wait for 1 second
        console.log(products[id]);
    }
}

// Example usage:
const productIds = ['prod1', 'prod2', 'prod3', 'prod4', 'prod5', 'prod6'];
fetchProductDetails(productIds);
