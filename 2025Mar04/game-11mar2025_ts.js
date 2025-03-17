var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var pool = [];
/* Step 1: Create the pool with 49 numbers (1 to 49) */
for (var i = 1; i <= 49; i++) {
    pool.push(i);
}
console.log("\nFull Pool: ");
displayPool(pool); // Display the full pool of numbers
var drawnNumbers = []; // Array to store drawn numbers
var specialNumber;
var Interval;
console.log("\nMark Six result: ");
Interval = setInterval(function () {
    /* Step 3: Check if six numbers have already been drawn */
    if (drawnNumbers.length < 6) {
        /* If not, randomly select a number from the pool */
        var randomIndex = Math.floor(Math.random() * pool.length);
        var drawnNumber = pool[randomIndex];
        /* Step 4: Display the drawn number in the console */
        console.log(drawnNumber);
        drawnNumbers.push(drawnNumber);
        /* Step 5: Remove the drawn number from the pool to prevent duplicates */
        pool.splice(randomIndex, 1);
    }
    else {
        /* Step 6: If six numbers have been drawn, select a special number and display it */
        if (specialNumber === undefined) {
            var randomIndex = Math.floor(Math.random() * pool.length);
            specialNumber = pool[randomIndex];
            console.log("Special number: " + specialNumber);
        }
        /* Stop the setInterval loop to end the drawing process */
        clearInterval(Interval);
        // Display the drawn numbers in ascending order with the special number at the end
        var sortedDrawnNumbers = __spreadArray([], drawnNumbers, true).sort(function (a, b) { return a - b; });
        sortedDrawnNumbers.push(specialNumber);
        console.log("\nMark Six result (sorted and appended with special number): " + sortedDrawnNumbers.join(", "));
    }
}, 1000); // Repeat the action every 1 second
setTimeout(function () {
    console.log("\nThe remaining pool: ");
    displayPool(pool); // Step 7: Display the remaining numbers in the pool
}, 7500); // Delay 7.5 seconds to ensure the game is completed
function displayPool(pool) {
    for (var i = 0; i < pool.length; i += 7) {
        console.log(pool.slice(i, i + 7).join(", "));
    }
}
