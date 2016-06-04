'use strict';

const Network = require('./components/network');

const network = Network.import('./train/network.json');

let data = [
    [ 0.02, 0.6 ],
    [ 0.02, 0.6 ],
    [ 0.04, 0.6 ],
    [ 0.06, 0.6 ],
    [ 0.2, 0.6 ],
    [ 0.22, 0.6 ],
    [ 0.26, 0.6 ],
    [ 0.3, 0.6 ],
    [ 0.3, 0.6 ],
];

for (let item of data) {
    Network.check(item, network);
}
