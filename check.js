'use strict';

const Network = require('./components/network');

const network = Network.import('./train/network.json');

let data = [
    [ 0.02, 0.3215 ],
    [ 0.02, 0.001 ],
    [ 0.04, 0.4 ],
    [ 0.06, 0.0014 ],
    [ 0.2, 0.11803 ],
    [ 0.22, 0.001 ],
    [ 0.26, 0.4 ],
    [ 0.3, 0.39148 ],
    [ 0.3, 0.4 ]
];

for (let item of data) {
    Network.check(item, network);
}
