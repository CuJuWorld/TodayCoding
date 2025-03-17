function createCart() {
    // Private variable to store cart items
    let cart = [];

    return {
        // Method to add an item to the cart
        addItem: function(name, price) {
            cart.push({ name, price });
            console.log(`Added item: ${name}, Price: ${price}`);
            console.log('Current items in cart:', cart);
        },
        
        // Method to remove an item by name
        removeItem: function(name) {
            const index = cart.findIndex(item => item.name === name);
            if (index !== -1) {
                cart.splice(index, 1);
                console.log(`Removed item: ${name}`);
            } else {
                console.log(`Item not found: ${name}`);
            }
            console.log('Current items in cart:', cart);
        },
        
        // Method to calculate the total price of items in the cart
        getTotal: function() {
            const total = cart.reduce((sum, item) => sum + item.price, 0);
            console.log(`Total price: ${total}`);
            return total;
        },
        
        // Method to return the current items in the cart
        getItems: function() {
            return cart;
        }
    };
}

// Test scenarios
const myCart = createCart();
myCart.addItem('Shirt', 20); // Added: Shirt, Price: $20
myCart.addItem('Shoes', 50); // Added: Shoes, Price: $50
myCart.getTotal(); // Total Price: $70
myCart.removeItem('Shirt'); // Removed: Shirt
console.log(myCart.getItems()); // [{ name: 'Shoes', price: 50 }]
