'use strict';

const fs = require('fs');
const lineReader = require('line-reader');

var data = [];

var item = {
    time: "",
    d6: "",
    d10: "",
    dh6: "",
    sh6: "",
    dh10: "",
    sh10: ""
};

let counter = 1;
let tempItem;

lineReader.eachLine('data.plain', function (line, last) {
    switch (counter % 7) {
        case 1:
            tempItem = {};
            tempItem.time = parseFloat(line);
            break;
        case 2:
            tempItem.d6 = parseFloat(line);
            break;
        case 3:
            tempItem.d10 = parseFloat(line);
            break;
        case 4:
            tempItem.dh6 = parseFloat(line);
            break;
        case 5:
            tempItem.sh6 = parseFloat(line);
            break;
        case 6:
            tempItem.dh10 = parseFloat(line);
            break;
        case 0:
            tempItem.sh10 = parseFloat(line);
            data.push(tempItem);
            break;
        default:
    }
    counter++;

    if (last) {
        fs.writeFile('data.json', JSON.stringify(data), "utf-8", function (error) {
            if (error) {
                console.log('Something went wrong. ', error);
                return;
            }

            console.log('File data.json saved');
        });
    }
});
