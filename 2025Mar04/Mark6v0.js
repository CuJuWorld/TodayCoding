// Function to create a random array 'INDEX' from integers 0 to 48
function generateIndexArray() {
    const indexArray = [];
    while (indexArray.length < 49) {
        const randomIndex = Math.floor(Math.random() * 49);
        if (!indexArray.includes(randomIndex)) {
            indexArray.push(randomIndex);
        }
    }
    return indexArray;
}

// Function to split 'INDEX' into 7 position_index arrays
function splitIndexArray(indexArray) {
    const positionIndexArrays = [];
    for (let i = 0; i < 7; i++) {
        positionIndexArrays.push(indexArray.slice(i * 7, (i + 1) * 7));
    }
    return positionIndexArrays;
}

// Function to create another random array 'POOL' from integers 1 to 49
function generatePoolArray() {
    const poolArray = [];
    while (poolArray.length < 49) {
        const randomNum = Math.floor(Math.random() * 49) + 1;
        if (!poolArray.includes(randomNum)) {
            poolArray.push(randomNum);
        }
    }
    return poolArray;
}

// Function to create 7 arrays from 'POOL' according to the 7 position_index arrays
function createArraysFromPool(positionIndexArrays, poolArray) {
    const resultArrays = [];
    for (let i = 0; i < 7; i++) {
        const newArray = [];
        for (let j = 0; j < positionIndexArrays[i].length; j++) {
            newArray.push(poolArray[positionIndexArrays[i][j]]);
        }
        resultArrays.push(newArray);
    }
    return resultArrays;
}

// Example usage
const indexArray = generateIndexArray();
console.log("Index Array:", indexArray);

const positionIndexArrays = splitIndexArray(indexArray);
console.log("Position Index Arrays:", positionIndexArrays);

const poolArray = generatePoolArray();
console.log("Pool Array:", poolArray);

const arraysFromPool = createArraysFromPool(positionIndexArrays, poolArray);
console.log("Arrays from Pool:", arraysFromPool);
