'use strict';

const fs = require('fs');
const credentials = JSON.parse(
    fs.readFileSync('components/secret.json', 'utf-8')
);
const plotly = require('plotly')(credentials.username, credentials.apiKey);

let Chart = {};

Chart.draw = function (data) {
    const graphOptions = {
        fileName: 'neural-network',
        fileopt: 'new'
    };
    plotly.plot(data, graphOptions, function (err, msg) {
        console.log(msg);
    });
}

Chart.generatePlotlyData = function (network) {
    let trace1 = {
        x: [],
        y: [],
        mode: "lines+markers",
    };
    let trace2 = {
        x: [],
        y: [],
        mode: "lines+markers",
    };
    let trace3 = {
        x: [],
        y: [],
        mode: "markers",
        type: "scatter",
    }
    let trace4 = {
        x: [],
        y: [],
        mode: "markers",
        type: "scatter",
    }

    let trainingSet = require('./trainingSet');
    let ts = trainingSet.get('data/data.json');
    for (let item of ts) {
        trace3.x.push(item.time);
        trace4.x.push(item.time);
        trace3.y.push(item.dh6);
        trace4.y.push(item.sh6);
    }

    for (let i = 0; i < 50; i++) {
        let item = {};
        item.time = 0.01 * i;
        item.d6 = .6;

        const temp = network.activate([item.time, item.d6]);
        item.dh6 = temp[0] * 1000000;
        item.sh6 = temp[1] * 1000000;

        trace1.x.push(item.time * 10);
        trace1.y.push(item.dh6);

        trace2.x.push(item.time * 10);
        trace2.y.push(item.sh6);
    }

    return [trace1, trace2, trace3, trace4];
}

Chart.generateData = function (network, file) {
    let data = [];

    for (let i = 0; i < 50; i++) {
        let item = {};
        item.time = 0.01 * i;
        item.d6 = .6;

        const temp = network.activate([item.time, item.d6]);
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
