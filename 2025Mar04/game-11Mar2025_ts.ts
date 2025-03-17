let pool: number[] = [];

/* Step 1: Create the pool with 49 numbers (1 to 49) */
for (let i = 1; i <= 49; i++) {
    pool.push(i);
}

console.log("\nFull Pool: ");
displayPool(pool); // Display the full pool of numbers

let drawnNumbers: number[] = []; // Array to store drawn numbers
let specialNumber: number | undefined;
let Interval: ReturnType<typeof setInterval>;
console.log("\nMark Six result: ");

Interval = setInterval(() => {
    /* Step 3: Check if six numbers have already been drawn */
    if (drawnNumbers.length < 6) {
        /* If not, randomly select a number from the pool */
        let randomIndex = Math.floor(Math.random() * pool.length);
        let drawnNumber = pool[randomIndex];

        /* Step 4: Display the drawn number in the console */
        console.log(drawnNumber);
        drawnNumbers.push(drawnNumber);

        /* Step 5: Remove the drawn number from the pool to prevent duplicates */
        pool.splice(randomIndex, 1);
    } else {
        /* Step 6: If six numbers have been drawn, select a special number and display it */
        if (specialNumber === undefined) {
            let randomIndex = Math.floor(Math.random() * pool.length);
            specialNumber = pool[randomIndex];
            console.log("Special number: " + specialNumber);
        }

        /* Stop the setInterval loop to end the drawing process */
        clearInterval(Interval);

        // Display the drawn numbers in ascending order with the special number at the end
        let sortedDrawnNumbers = [...drawnNumbers].sort((a, b) => a - b);
        sortedDrawnNumbers.push(specialNumber);
        console.log("\nMark Six result (sorted and appended with special number): " + sortedDrawnNumbers.join(", "));
    }
}, 1000); // Repeat the action every 1 second

setTimeout(() => {
    console.log("\nThe remaining pool: ");
    displayPool(pool); // Step 7: Display the remaining numbers in the pool
}, 7500); // Delay 7.5 seconds to ensure the game is completed

function displayPool(pool: number[]): void {
    for (let i = 0; i < pool.length; i += 7) {
        console.log(pool.slice(i, i + 7).join(", "));
    }
}

export {};