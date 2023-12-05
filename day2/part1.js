const { readFileSync } = require('fs');

const inputFile = readFileSync('./input', 'utf-8'),
    fileLines = inputFile.split('\n');

const limits = {
    'red': 12,
    'green': 13,
    'blue': 14
};

// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red

const partOne = () => {
    var goodGames = [];
    fileLines.forEach(l => {
        const gameId = l.substring(l.indexOf(' '), l.indexOf(':')),
            allNums = Array.from(l.matchAll(/((?<num>[\d]+)\s(?<color>\w+))/gm));
        const badHands = allNums.filter(item => {
            if (parseInt(item.groups.num) > parseInt(limits[item.groups.color])) return true;
        });
        if (badHands.length > 0) return; // line contains bad hand
        goodGames += gameId;
    });

    console.log(goodGames.trim().split(' ').map(i => parseInt(i)).reduce((a, b) => a + b));
}


///////////////////
app = partOne;
app();