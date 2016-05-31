'use strict';

const fs = require('fs');

let TrainingSet = {
    normalize: 'a'
};

TrainingSet.get = function (file) {
    let data = JSON.parse(
        fs.readFileSync(file, 'utf-8')
    );

    for (let item of data) {
        delete item.d10;
        delete item.dh10;
        delete item.sh10;
    }

    return data;
}

TrainingSet.createIO = function (data) {
    let io = [];

    for (let item of data) {
        let temp = {};
        temp.input = [ item.time, item.d6 ];
        temp.output = [ item.dh6, item.sh6 ];
        io.push(temp);
    }

    return io;
}

TrainingSet.normalize = function (data) {
    for (let item of data) {
        item.time /= 10;
        item.d6 /= 10000;
        item.dh6 /= 1000000;
        item.sh6 /= 1000000;
    }

    return data;
}

module.exports = TrainingSet;
