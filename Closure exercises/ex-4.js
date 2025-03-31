function createCart() {
    let cart = []; // Private array to store cart items
    return {
        addItem: function(name, price) {
            cart.push({ name, price });
            console.log(`Added: ${name}, Price: $${price}`);
        },
        removeItem: function(name) {
            const initialLength = cart.length;
            cart = cart.filter(item => item.name !== name);
            if (cart.length < initialLength) {
                console.log(`Removed: ${name}`);
            } else {
                console.log(`${name} not found in cart.`);
            }
        },
        getTotal: function() {
            const total = cart.reduce((sum, item) => {
                return sum + item.price
            }, 0);
            // let total = 0;
            // for (let i = 0; i < cart.length; i++) {
            //     const cartItem = cart[i];
            //     total += cartItem.price;
            // }
            console.log(`Total Price: $${total}`);
            return total;
        },
        getItems: function() {
            return cart;
        }
    };
}

// Example usage:
const myCart = createCart();
myCart.addItem('Shirt', 20); // Added: Shirt, Price: $20
myCart.addItem('Shoes', 50); // Added: Shoes, Price: $50
myCart.getTotal(); // Total Price: $70
myCart.removeItem('Shirt'); // Removed: Shirt
console.log(myCart.getItems()); // [{ name: 'Shoes', price: 50 }]
