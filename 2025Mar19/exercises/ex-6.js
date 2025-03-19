// Simulated products
const products = [
    { id: 1, name: "Laptop", price: 999.99, inStock: 10 },
    { id: 2, name: "Smartphone", price: 699.99, inStock: 5 },
    { id: 3, name: "Wireless Headphones", price: 199.99, inStock: 0 },
];

let cart = [];

async function addToCart(productId, quantity) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error(`Product ID ${productId} not found.`);
        return;
    }
    if (product.inStock < quantity) {
        console.error(`Not enough stock for product ID ${productId}. Available: ${product.inStock}, Required: ${quantity}`);
        return;
    }

    const cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
        cartItem.quantity += quantity;
        console.log(`Updated ${quantity} of ${product.name} to the cart.`);
    } else {
        cart.push({ productId, quantity });
        console.log(`Added ${quantity} of ${product.name} to the cart.`);
    }
}

// Example usage
await addToCart(1, 2); // Add 2 laptops to the cart
await addToCart(2, 1); // Add 1 smartphone to the cart
await addToCart(3, 1); // Attempt to add 1 wireless headphone (out of stock)