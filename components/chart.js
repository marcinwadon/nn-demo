'use strict';

let Chart = {};

Chart.generateData = function (network, file) {
    let data = [];

    for (let i = 0; i < 500; i++) {
        let item = {};
        item.time = 0.01*i;

        let d = Math.random() * ( 1000 - 1 ) + 1;
        d /= 10000;

        const temp = network.activate([item.time, d]);
        item.d = d * 10000;
        item.dh6 = temp[0] * 1000000;
        item.sh6 = temp[1] * 1000000;

        data.push(item);
    }

    require('fs')
        .writeFile(
            file,
            JSON.stringify(data),
            'utf-8'
        );
}

module.exports = Chart;
