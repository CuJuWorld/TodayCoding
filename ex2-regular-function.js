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
console.log(sumArray('\n'+ [1, 2, 3, 4])); // 輸出: 10
console.log(sumArray([1.5, 2.5, 3])); // 輸出: 7
console.log(sumArray("FIRST ARRAY")); // 輸出: 錯誤：輸入無效

console.log(AsumArray([2, 3, 4, 5])); // 輸出: 14
console.log(AsumArray([2.5, 3.5, 4, 7])); // 輸出: 17
console.log(AsumArray("SECOND ARRAY")); // INVALID Input