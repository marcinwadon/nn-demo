'use strict';

const synaptic = require('synaptic');
const STrainer = synaptic.Trainer;

const TrainingSet = require('./components/trainingSet');
const Network = require('./components/network');

/* OPTIONS */

const options = {
    rate: [.5, .3,  .3, .1, .1],
    iterations: 13500000,
    error: .000001,
    shuffle: true,
    log: 100000,
    cost: STrainer.cost.CROSS_MSE
};

/* Prepare training set */

let temp = TrainingSet.get(`./data/data.json`);
temp = TrainingSet.normalize(temp);
let trainingSet = TrainingSet.createIO(temp);

/* Start logging */


/* Training set */ 
console.log('*****');
console.log('Training set:\n');
console.log(trainingSet);

/* Training options*/
console.log('\n*****');
console.log('Training options:\n');
console.log(
`Input neurons: 2,
One hidden layer, neurons: 10,
Output neurons: 2,
Architect: long short-term memory neurons,
Rate: [${options.rate}],
Min. error: ${options.error},
Max. iterations: ${options.iterations},
Shuffle: ${options.shuffle},
Log: every ${options.log} iterations,
Cost: mean squared error`);

/* Train log */
console.log('\n*****');
console.log('Train log:\n')
console.time('train');
const network = Network
    .create(
        2,
        10,
        2,
        3,
        trainingSet,
        options
    );

/* Training time */
console.log('\n*****');
console.log('Training time:\n');
console.timeEnd('train');

/* Export network */
console.log('\n*****');
Network.export(network, `train/network.json`);
console.log('Network saved in train/network.json file')

/* Some results */
console.log('\n*****');
console.log('Train results:\n');
Network.check([0.02, 0.001], network);
Network.check([ 0.24, 0.4 ], network);
Network.check([ 0.3, 0.39148 ], network);

Network.check([ 0.03, 0.02], network);
Network.check([ 0.4, 0.32 ], network);
Network.check([ 0.23, 0.52 ], network);
Network.check([ 0.15, 0.22 ], network);
