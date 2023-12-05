const { readFileSync } = require('fs');
const inputData = readFileSync('./input', 'utf-8'),
splitData = inputData.split('\n');

const sum = (arr) => {
    arr.reduce((acc, curr) => acc + curr);
}
    
const readFile = (filename, encoding) => {
    try {
        const fileData = fs.readFileSync(filename, encoding || 'utf8');
        return fileData;
    } catch (err) {
        console.error("Could not read input file: " + err)
        process.exit(-1);
    }
}


const numbers = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9
};

const isASCIIDigit = (numStr) => {
    if (numStr === undefined || numStr === "") return false;
    const strVal = numStr.charCodeAt();
    if (strVal >= 48 && strVal <= 57) return true;
    return false;
}

const isTextDigit = (text) => {
    const textDigits = Object.keys(numbers);
    return textDigits.filter(a => text === a).length > 0;
}

const isDigit = (text) => {
    return isASCIIDigit(text) || isTextDigit(text);
}

const getFirstDigit = (text) => {
    let digit, idx = 0;
    while (digit === undefined && idx < text.length) {
        digit = (isASCIIDigit(text[idx])) ? text[idx] : undefined;
        idx++;
    }
    return digit;
    
}

const getLastDigit = (text) => {
    let digit, idx = text.length;
    while (digit === undefined && idx >= 0 ) {
        digit = (isASCIIDigit(text[idx])) ? text[idx] : undefined;
        idx--;
    }
    return digit;
}

const solutionOne = () => {
    let results = [];
    
    for (const i in splitData) {
        const text = splitData[i];
        if (text === "") continue;
        let firstDigit = getFirstDigit(text),
            lastDigit = getLastDigit(text);
        
        if (firstDigit !== undefined && lastDigit !== undefined) {
            results[i] = parseInt(firstDigit + lastDigit);
        } else {
            process.exit(2);
        }
    }

    console.log("Sum: " + results.reduce((a, b) => a + b));
    
};

const solutionTwo = () => {
    let results = [];

    for (i in splitData) {
        let text = splitData[i],
        firstDigit, lastDigit;
        if (text === "") continue;
        
let oldText = text;

        if (isASCIIDigit(text[0])) {
            firstDigit = text.split('').shift();
        }
        
        const lastChar = text.split('').pop();
        if (isASCIIDigit(lastChar)) {
            lastDigit = lastChar;
        }

        if (firstDigit !== undefined && lastDigit !== undefined) {
            results[i] = parseInt(firstDigit + lastDigit);
            continue;
        }

        // longest digit word is 5 chars, evaluate 5 char moving window
        for (let i = 0; i < text.length; i++) {
            let cut = text.slice(i, i+5);
            Object.keys(numbers).forEach((num) => {
                if (cut.search(num) >= 0) text = text.replace(num, numbers[num]);
            });
        }

        firstDigit = firstDigit || getFirstDigit(text);

        // when getting the last digit from we must change text to int from the right apparently
        // so 3oneight = 38 but oneight4 = 14
        text = oldText;
        for (let i = text.length; i >= 0; i--) {
            let cut = text.slice(i-5, i);
            Object.keys(numbers).forEach((num) => {
                if (cut.search(num) >= 0) text = text.replace(num, numbers[num]);
            });
        }

        lastDigit = lastDigit || getLastDigit(text);

        if (firstDigit !== undefined && lastDigit !== undefined) {
            results[i] = parseInt(firstDigit + lastDigit);
        } else {
            process.exit(2);
        }
        console.log(oldText + " -> " + text + " -> " + results[i]);
    }
//console.log();
 console.log("Sum: " + results.reduce((a, b) => a + b));
 console.log("Lines read: " + splitData.length);
    return;
};

//let app = solutionOne;
let app = solutionTwo;

app();
process.exit(0);