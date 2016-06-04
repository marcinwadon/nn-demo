'use strict';

const Network = require('./components/network');
const Chart = require('./components/chart');

const network = Network.import(`./train/network.json`);
Chart.generateData(network, `./train/chart.json`);

const data = Chart.generatePlotlyData(network);
Chart.draw(data);
