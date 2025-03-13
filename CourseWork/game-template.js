<<<<<<< HEAD
let pool = [];
/* Step 1: Create the pool with 49 numbers (1 to 49) */
console.log("Full Pool: ");
console.log(pool); // Display the full pool of numbers

let index = 0;
let i = 0; // Step 2: Initialize a counter to track the number of drawn numbers
let Interval;
console.log("Mark Six result: ");

Interval = setInterval(() => {
    /* Step 3: Check if six numbers have already been drawn */
    /* If not, randomly select a number from the pool */
    /* Step 4: Display the drawn number in the console */
    /* Step 5: Remove the drawn number from the pool to prevent duplicates */

    /* Step 6: If six numbers have been drawn, select a special number and display it */
    /* Stop the setInterval loop to end the drawing process */
}, 1000); // Repeat the action every 1 second

setTimeout(() => {
    console.log("The remaining pool: ");
    console.log(pool); // Step 7: Display the remaining numbers in the pool
=======
let pool = [];
/* Step 1: Create the pool with 49 numbers (1 to 49) */
console.log("Full Pool: ");
console.log(pool); // Display the full pool of numbers

let index = 0;
let i = 0; // Step 2: Initialize a counter to track the number of drawn numbers
let Interval;
console.log("Mark Six result: ");

Interval = setInterval(() => {
    /* Step 3: Check if six numbers have already been drawn */
    /* If not, randomly select a number from the pool */
    /* Step 4: Display the drawn number in the console */
    /* Step 5: Remove the drawn number from the pool to prevent duplicates */

    /* Step 6: If six numbers have been drawn, select a special number and display it */
    /* Stop the setInterval loop to end the drawing process */
}, 1000); // Repeat the action every 1 second

setTimeout(() => {
    console.log("The remaining pool: ");
    console.log(pool); // Step 7: Display the remaining numbers in the pool
>>>>>>> c81694a5f8d8cfecb294864b4227d4a849cc20a8
}, 7500); // Delay 7.5 seconds to ensure the game is completed