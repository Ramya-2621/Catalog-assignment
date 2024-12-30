function decodeValue(base, value) {
    return parseInt(value, base);
}

function lagrangeInterpolation(xValues, yValues) {
    let secret = 0;
    const k = xValues.length;

    for (let i = 0; i < k; i++) {
        const xi = xValues[i];
        const yi = yValues[i];
        let li = 1;

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                li *= xi / (xi - xValues[j]);
            }
        }

        secret += li * yi;
    }

    return Math.floor(secret);
}

function main(jsonInput) {
    const data = JSON.parse(jsonInput);
    const n = data.keys.n;
    const k = data.keys.k;

    const xValues = [];
    const yValues = [];

    // Decode Y values
    for (let key = 1; key <= n; key++) {
        if (data[key]) { // Check if data[key] exists
            const base = parseInt(data[key].base);
            const value = data[key].value;

            xValues.push(key); // x is simply the key
            yValues.push(decodeValue(base, value)); // Decode y values
        } else {
            console.error(`Key ${key} is undefined in the input data.`);
        }
    }

    // Calculate the constant term c using Lagrange interpolation
    if (xValues.length >= k) { // Ensure we have enough points to calculate
        const secretC = lagrangeInterpolation(xValues.slice(0, k), yValues.slice(0, k));
        console.log(`The secret (constant term c) is: ${secretC}`);
    } else {
        console.log("Not enough valid points to calculate the secret.");
    }
}

// Example usage with provided test cases
const testCase1 = `{
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "4": {
        "base": "4",
        "value": "213"
    }
}`;

const testCase2 = `{
    "keys": {
        "n": 10,
        "k": 7
     },
     "1": {
         "base": "6",
         "value": "13444211440455345511"
     },
     "2": {
         "base": "15",
         "value": "aed7015a346d63"
     },
     "3": {
         "base": "15",
         "value": "6aeeb69631c227c"
     },
     "4": {
         "base": "16",
         "value": "e1b5e05623d881f"
     },
     "5": {
         "base": "8",
         "value": "316034514573652620673"
     },
     "6": {
         "base": "3",
         "value": "2122212201122002221120200210011020220200"
     },
     "7": {
         "base": "3",
         "value": "20120221122211000100210021102001201112121"
     },
     "8": {
         "base": "6",
         "value": "20220554335330240002224253"
     },
     "9": {
         "base": "12",
         "value": "45153788322a1255483"
     },
     "10": {
         "base": "7",
         "value": "1101613130313526312514143"
     }
}`;

// Run for both test cases
console.log("Test Case 1:");
main(testCase1);

console.log("\nTest Case 2:");
main(testCase2);
