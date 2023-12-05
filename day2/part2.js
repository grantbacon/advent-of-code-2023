const { readFileSync } = require('fs');

const inputFile = readFileSync('./input', 'utf-8'),
    fileLines = inputFile.split('\n');

const limits = {
    'red': 12,
    'green': 13,
    'blue': 14
};

// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red

const partTwo = () => {
    var powers = [];
    fileLines.forEach(l => {
        const gameId = l.substring(l.indexOf(' '), l.indexOf(':')).trim();
        l = l.substring(l.indexOf(':') + 1).trim(); // Cut off "Game ##: " from string
        let maxCounts = {};
        Object.keys(limits).forEach((color) => {
            const allNums = Array.from(l.matchAll(/((?<num>\d+)\s(?<color>\w+))/gm));
            const colorMin = Math.max(...Array.from(allNums.map(n => n.groups).filter(i => i.color === color).values()).map(i => i.num));
            maxCounts[color] = colorMin;
        });
        powers.push(Object.values(maxCounts).reduce((a, b) => (isNaN(b)) ? a : a * b));
    });

    console.log(powers.reduce((a, b) => a + b));
    return;
};

///////////////////
app = partTwo;
app();