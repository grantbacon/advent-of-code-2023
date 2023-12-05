const fs = require('node:fs');

const app = () => {
    
    const readFile = (filename, encoding) => {
        try {
            const fileData = fs.readFileSync(filename, encoding || 'utf8');
            return fileData;
        } catch (err) {
            console.error("Could not read input file: " + err)
            process.exit(-1);
        }
    }

    const isDigit = (numStr) => {
        if (numStr === undefined || numStr === "") return false;
        const strVal = numStr.charCodeAt();
        if (strVal >= 48 && strVal <= 57) return true;
        return false;
    }

    const inputData = readFile('./input'),
          splitData = inputData.split('\n');
    let results = [];
    
    for (i in splitData) {
        const text = splitData[i];
        if (text === "") continue;
        let firstDigit, lastDigit, idx = 0;

        while (firstDigit === undefined && idx < text.length) {
            firstDigit = (isDigit(text[idx])) ? text[idx] : undefined;
            idx++;
        }
        idx = text.length;
        while (lastDigit === undefined && idx >= 0 ) {
            lastDigit = (isDigit(text[idx])) ? text[idx] : undefined;
            idx--;
        }
        
        if (firstDigit !== undefined && lastDigit !== undefined) {
            results[i] = firstDigit + lastDigit;
        } else {
            process.exit(2);
        }
    }

    const sum = results.map(i => parseInt(i)).reduce((a, b) => a + b);
    console.log(sum);
    

};

app();
process.exit(0);