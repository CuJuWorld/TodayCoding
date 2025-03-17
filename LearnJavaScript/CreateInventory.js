function createInventory() {
    // Private variable to store product quantities
    const inventory = {};

    return {
        // Method to add a product with a specified quantity
        addProduct(name, quantity) {
            if (!inventory[name]) {
                inventory[name] = 0;
            }
            inventory[name] += quantity;
            console.log(`Added ${quantity} of ${name}.`);
        },

        // Method to sell a specified quantity of a product
        sellProduct(name, quantity) {
            if (inventory[name] && inventory[name] >= quantity) {
                inventory[name] -= quantity;
                console.log(`Sold ${quantity} of ${name}.`);
            } else {
                console.log(`Not enough stock for ${name}.`);
            }
        },

        // Method to return the current inventory
        getInventory() {
            console.log('Current Inventory:', inventory);
            return inventory;
        }
    };
}

// Example Usage:
const storeInventory = createInventory();

/*
storeInventory.addProduct('Laptop', 10); // Added 10 of Laptop.
storeInventory.addProduct('Phone', 5); // Added 5 of Phone.
*/

storeInventory.addProduct('MacbookPro 16-inch', 10); // Added 10 of MacbookPro 16-inch.
storeInventory.addProduct('MacAir 15-inch', 10); // Added 10 of MacAir 15-inch.
storeInventory.addProduct('MacAir 13-inch', 10); // Added 10 of MacAir 13-inch.
storeInventory.getInventory(); // Current Inventory: { Laptop: 10, Phone: 5 }

storeInventory.addProduct('iPhone 16 ProMax', 10); // Added 5 of iPhone 16 ProMax.
storeInventory.addProduct('iPhone 16 Plus', 10); // Added 6 of iPhone 16 Plus.
storeInventory.addProduct('iPhone 16e', 10); // Added 7 of iPhone 16e.
storeInventory.getInventory(); // Current Inventory: { Laptop: 10, Phone: 5 }

storeInventory.sellProduct('MacbookPro 16-inch', 1); // Added 10 of MacbookPro 16-inch.
storeInventory.sellProduct('MacAir 15-inch', 2); // Added 10 of MacAir 15-inch.
storeInventory.sellProduct('MacAir 13-inch', 3); // Added 10 of MacAir 13-inch.
storeInventory.sellProduct('iPhone 16 ProMax', 4); // Added 5 of iPhone 16 ProMax.
storeInventory.sellProduct('iPhone 16 Plus', 5); // Added 6 of iPhone 16 Plus.
storeInventory.sellProduct('iPhone 16e', 6); // Added 7 of iPhone 16e.
storeInventory.getInventory(); // Current Inventory: { Laptop: 8, Phone: 5 }

storeInventory.sellProduct('iPhone 16e', 6); // Added 7 of iPhone 16e.

