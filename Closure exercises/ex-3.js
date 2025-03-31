function createInventory() {
    let inventory = {}; // Private object to store product quantities

    return {
        addProduct: function(name, quantity) {
            // if not find item from inventory[name], then assign default value (0) for number calculation
            if (!inventory[name]) {
                inventory[name] = 0; 
            }
            inventory[name] += quantity;
            // inventory[name] = inventory[name] + quantity;
            console.log(`Added ${quantity} of ${name}.`);
        },
        sellProduct: function(name, quantity) {
            let isItemExist = inventory[name];
            if (isItemExist && inventory[name] >= quantity) {
                inventory[name] -= quantity;
                console.log(`Sold ${quantity} of ${name}.`);
                return true; // Sale successful
            } else {
                console.log(`Not enough stock for ${name}.`);
                return false; // Not enough stock
            }
        },
        getInventory: function() {
            console.log('Current Inventory:', inventory);
            return inventory;
        }
    };
}

// Example usage:
const storeInventory = createInventory();
storeInventory.addProduct('Laptop', 10); // Added 10 of Laptop.
// state: inventory = {'Laptop': 10};
storeInventory.addProduct('Phone', 5); // Added 5 of Phone.
// state: inventory = {'Laptop': 10, 'Phone': 5};
storeInventory.getInventory(); // Current Inventory: { Laptop: 10, Phone: 5 }
storeInventory.sellProduct('Laptop', 2); // Sold 2 of Laptop.
// state: { Laptop: 8, Phone: 5 }
storeInventory.getInventory(); // Current Inventory: { Laptop: 8, Phone: 5 }
storeInventory.sellProduct('Phone', 10); // Not enough stock for Phone.