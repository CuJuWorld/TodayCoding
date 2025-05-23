let pool = [];

/* Step 1: Create the pool with 49 numbers (1 to 49) */
for (let i = 1; i <= 49; i++) {
    pool.push(i);
}

console.log("Full Pool: ");
console.log(pool); // Display the full pool of numbers

let drawnNumbers = []; // Array to store drawn numbers
let specialNumber;
let i = 0; //  Initialize a counter to track the number of drawn numbers
let Interval;
console.log("Mark Six result: ");

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
        if (!specialNumber) {
            let randomIndex = Math.floor(Math.random() * pool.length);
            specialNumber = pool[randomIndex];
            console.log("Special number: " + specialNumber);
        }

        /* Stop the setInterval loop to end the drawing process */
        clearInterval(Interval);
    }
}, 1000); // Repeat the action every 1 second

setTimeout(() => {
    console.log("The remaining pool: ");
    console.log(pool); // Step 7: Display the remaining numbers in the pool
}, 7500); // Delay 7.5 seconds to ensure the game is completed