let count = 10;
if (count > 5) {
  let count = 5; // New block-scoped variable
  console.log("Inside block:", count);
}
console.log("Outside block:", count);

var name1 = "John";
if (true) {
  var name = "Doe"; // Reassigning a variable declared with var
}
console.log("\nName:", name1, "\n" ); 
// ?

// const values = [1, 2, 3];
// for (const value of values) {
//   value = value + 1; // Attempting to reassign a constant variable
// }
// console.log("\nArray values:", values);
// Answer:
//  Error occurs.
//  Cannot assign value to constant variable.

console.log(aa); // Hoisted declaration
var aa = 5;
console.log("aa:", aa);


const arr = [];
for (let i = 0; i < 3; i++) {
  const value = i * 2;
  arr.push(value);
}
console.log("\nArray.arr:",arr);

const obj = { key: "value" };
obj.key = "newValue"; // Mutating the object
console.log("\nObject.obj:", obj);

const a = 10;
const b = 5;
const sum = a + b;
const product = a * b;
console.log("\nSum:", sum);
console.log("Product:", product);

const numerator = 20;
const denominator = 0;
const result = numerator / denominator;
console.log("\nResult:", result);

const value = "hello" * 2;
console.log("\nValue:", value);
console.log("Is NaN:", isNaN(value));

const floatNumber = 3.14159;
const roundedNumber = Math.round(floatNumber);
console.log("\nRounded Number:", roundedNumber.toFixed(2));

const randomNum = Math.random() * 100;
console.log("\nRandom Number:", randomNum.toFixed(0));


function greet(name2) {  // 常規函數
    return "\nHello, " + name2 + "!";
  }
  
  console.log(greet("Alice"));
  

  function square(x) {  // 常規函數
    return x * x;
  }
  console.log("\nSquare:", square(5),"\n");
  

  function print() {
    var x = n * n;
    console.log(x);
    var n = 50;
    var z = n * n;
    console.log(z,"\n");
  }
  print();


  function squareArray1(arr) {
    return arr.map(num => num * num);
  }
console.log("Square Array1:", squareArray1([1, 2, 3, 4, 5]),"\n");

  
  const squareArrayI = arr => arr.map(num => num * num);
  console.log("Square ArrayI:", squareArrayI([1, 2, 3, 4, 5]),"\n");

