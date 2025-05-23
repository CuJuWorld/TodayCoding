/*
Standard Function Expression: Declared using the `function` keyword.
Key Characteristics of Standard Function Expressions:
Functions are assigned to variables.
They are not immediately invoked (unlike IIFEs).
They can be reused like predefined functions.
Uses the function keyword.
Functions are assigned to variables.
Reusable and straightforward.
*/
const square = function (num) {
    return num * num;
};
const addsquare1 = function (a, b) {
    return square(a) + square(b);
};
console.log("addSquares1:", addsquare1(1, 2)); // Output: 25 (3^2 + 4^2 = 9 + 16)

function addsquareI(a, b) {
    function square(x) {
      return x * x;
    }
    return square(a) + square(b);
  }
console.log("addsquaresI:", addsquareI(1, 2),"\n");

/*
Predefined Function: Declared separately and reused.
Uses arrow functions for both square2 and addsquare2.
square2 is predefined and reused in addsquare2.
*/
const square2 = (num) => num * num;
const addsquare2 = (a, b) => square2(a) + square2(b);
console.log("addSquares2:", addsquare2(2, 3)); // Output: 25 (3^2 + 4^2 = 9 + 16)

const addSquaresII = (a, b) => {
    const square = (x) => x * x;
    return square(a) + square(b);
  };
  console.log("addSquaresII:", addSquaresII(2, 3), "\n");

/*
Inline Arrow Functions: Used directly within the expression.
The square calculation is done inline using arrow functions.
No predefined square function; everything is inline.
characteristics:
Compact and concise.
Used for one-time operations within a larger function or expression.
Cannot be reused since the function is not assigned to a variable.

*/
const addsquare3 = (a, b) => ((x) => x * x)(a) + ((x) => x * x)(b);
console.log("addSquares3:", addsquare3(3, 4),"\n"); // Output: 25 (3^2 + 4^2 = 9 + 16)

/*
IIFE: Executes immediately after definition, useful for one-time calculations.
Uses IIFEs to calculate the square of a and b.
Useful for one-time calculations.
characteristics:Useful for one-time calculations or operations.
Can encapsulate logic to avoid polluting the global scope.
Often used in older JavaScript patterns (e.g., module patterns) before let, const, and ES6 modules became common.
*/
const addsquare4 = (a, b) => 
    ((() => a * a)()) + ((() => b * b)());
console.log("addSquares4:", addsquare4(4, 5)); // Output: 25 (3^2 + 4^2 = 9 + 16)

/*
When to Use Which?
Scenario	Use Inline Arrow Functions	Use IIFE
One-time calculation	✅ Yes	✅ Yes
Compact and concise code	✅ Yes	❌ No (IIFE syntax is verbose)
Encapsulation of logic	❌ No	✅ Yes
Avoid polluting global scope	❌ No	✅ Yes
Modern JavaScript code	✅ Yes	❌ No (IIFE is less common now)

Key Takeaways
Use inline arrow functions for simple, one-time operations within expressions.
Use IIFE when you need to encapsulate logic or avoid polluting the global scope, especially in older JavaScript patterns. However, in modern JavaScript, let, const, and modules often replace the need for IIFEs.
*/