<<<<<<< HEAD
/*
(8) CHAN Wai Leuk
*/ 
let pool = [];

/* Step 1: Create the pool with 49 numbers (1 to 49) */
for (let i = 1; i <= 49; i++) {
    pool.push(i);
}

console.log("\nFull Pool: ");
displayPool(pool); // Display the full pool of numbers

let drawnNumbers = []; // Array to store drawn numbers
let specialNumber;
let i = 0; //  Initialize a counter to track the number of drawn numbers
let Interval;
console.log("\nMark Six result: ");

Interval = setInterval(() => {
    /* Step 3: Check if six numbers have already been drawn */
    if (drawnNumbers.length < 6) {
        i++;
        /* If not, randomly select a number from the pool */
        let randomIndex = Math.floor(Math.random() * pool.length);
        let drawnNumber = pool[randomIndex];

        /* Step 4: Display the drawn number in the console */
        let suffix;
        if (i === 1) {
            suffix = "st";
        } else if (i === 2) {
            suffix = "nd";
        } else if (i === 3) {
            suffix = "rd";
        } else {
            suffix = "th";
        }
        console.log(i + suffix + " draw: " + drawnNumber);
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

        // Display the drawn numbers in ascending order with the special number at the end
        let sortedDrawnNumbers = [...drawnNumbers].sort((a, b) => a - b);
        sortedDrawnNumbers.push(specialNumber);
        let today = new Date();
        let date = today.getFullYear()+ '-' + (today.getMonth()+1) + '-' + today.getDate();
        console.log("\nToday (" + date + ") Mark Six result (sorted and appended with special number) is :\n" + sortedDrawnNumbers.join(", "));
    }
}, 1000); // Repeat the action every 1 second

setTimeout(() => {
    console.log("\nThe remaining pool: ");
    displayPool(pool); // Step 7: Display the remaining numbers in the pool
}, 7500); // Delay 7.5 seconds to ensure the game is completed

function displayPool(pool) {
    for (let i = 0; i < pool.length; i += 7) {
        console.log(pool.slice(i, i + 7).join(", "));
    }
=======
/*
(8) CHAN Wai Leuk
*/ 
let pool = [];

/* Step 1: Create the pool with 49 numbers (1 to 49) */
for (let i = 1; i <= 49; i++) {
    pool.push(i);
}

console.log("\nFull Pool: ");
displayPool(pool); // Display the full pool of numbers

let drawnNumbers = []; // Array to store drawn numbers
let specialNumber;
let i = 0; //  Initialize a counter to track the number of drawn numbers
let Interval;
console.log("\nMark Six result: ");

Interval = setInterval(() => {
    /* Step 3: Check if six numbers have already been drawn */
    if (drawnNumbers.length < 6) {
        i++;
        /* If not, randomly select a number from the pool */
        let randomIndex = Math.floor(Math.random() * pool.length);
        let drawnNumber = pool[randomIndex];

        /* Step 4: Display the drawn number in the console */
        let suffix;
        if (i === 1) {
            suffix = "st";
        } else if (i === 2) {
            suffix = "nd";
        } else if (i === 3) {
            suffix = "rd";
        } else {
            suffix = "th";
        }
        console.log(i + suffix + " draw: " + drawnNumber);
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

        // Display the drawn numbers in ascending order with the special number at the end
        let sortedDrawnNumbers = [...drawnNumbers].sort((a, b) => a - b);
        sortedDrawnNumbers.push(specialNumber);
        let today = new Date();
        let date = today.getFullYear()+ '-' + (today.getMonth()+1) + '-' + today.getDate();
        console.log("\nToday (" + date + ") Mark Six result (sorted and appended with special number) is :\n" + sortedDrawnNumbers.join(", "));
    }
}, 1000); // Repeat the action every 1 second

setTimeout(() => {
    console.log("\nThe remaining pool: ");
    displayPool(pool); // Step 7: Display the remaining numbers in the pool
}, 7500); // Delay 7.5 seconds to ensure the game is completed

function displayPool(pool) {
    for (let i = 0; i < pool.length; i += 7) {
        console.log(pool.slice(i, i + 7).join(", "));
    }
>>>>>>> 98dc13dbf5bc4339c9329d80432d019f79dc2e77
}