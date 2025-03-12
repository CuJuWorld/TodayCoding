// Copy;
// 1. 將箭頭函數改寫為常規函數
function add(a, b) {
    return a + b;
}
console.log(add(5, -2)); // 輸出: 3

// 2. 函數：計算數字數組的總和
function sumArray(numbers) {
    // 檢查輸入是否為數組
    if (!Array.isArray(numbers)) {
        return "錯誤：輸入無效";
    }

    let total = 0;

    // 使用 for 循環計算總和
    for (let i = 0; i < numbers.length; i++) {
        if (typeof numbers[i] !== "number") {
            return "錯誤：輸入無效";
        }
        total += numbers[i];
    }
    return total;
}

function AsumArray(numbers) {
    // 檢查輸入是否為數組
    if (!Array.isArray(numbers)) {
        throw new Error("INVALID input");
    }

    let total = 0;

    // 使用 for 循環計算總和
    for (let i = 0; i < numbers.length; i++) {
        if (typeof numbers[i] !== "number") {
            throw new Error("INVALID input");
        }
        total += numbers[i];
    }
    return total;
}

// Handling sumArray calls
let result1 = sumArray([1, 2, 3, 4]);
console.log(typeof result1 === 'string' ? result1 : result1);

let result2 = sumArray([1.5, 2.5, 3]);
console.log(typeof result2 === 'string' ? result2 : result2);

let result3 = sumArray("FIRST ARRAY");
console.log(typeof result3 === 'string' ? result3 : result3);

// Handling AsumArray calls
try {
    let result4 = AsumArray([2, 3, 4, 5]);
    console.log(result4);

    let result5 = AsumArray([2.5, 3.5, 4, 7]);
    console.log(result5);

    let result6 = AsumArray("SECOND ARRAY");
    console.log(result6); // This line will not be reached if an error is thrown
} catch (e) {
    console.log(e.message);
}