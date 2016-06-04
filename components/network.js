'use strict';

let Network = {};

const fs = require('fs');
const synaptic = require('synaptic');
const SNetwork = synaptic.Network;
const SArchitect = synaptic.Architect;

Network.export = function (network, file) {
    fs.writeFile(
        file,
        JSON.stringify(network.toJSON()),
        'utf-8'
    );
}

Network.import = function (file) {
    const networkData = fs.readFileSync(file, 'utf-8');

    return SNetwork.fromJSON(JSON.parse(networkData));
}

Network.create = function (
    input,
    hidden,
    output,
    type,
    trainingSet,
    trainingOptions
) {

    let p;
    switch (type) {
        case 1:
            p = perceptron(input, hidden, output);
            break;
        case 2:
            p = lstm(input, hidden, output);
            break;
        case 3:
            p = liquid(input, hidden, output);
            break;
        default:
    }

    p.trainer.train(trainingSet, trainingOptions);

    return p;
}

Network.check = function (input, network) {
    const output = network.activate(input);
    console.log(
    `
t: ${input[0]*10}, d: ${input[1]},
output d: ${output[0]*1000000}, output s: ${output[1]*1000000}`
    );
}

function perceptron(input, hidden, output) {
    return new SArchitect.Perceptron(input, [hidden], output);
}

function lstm(input, hidden, output) {
    return new SArchitect.LSTM(input, hidden, output);
}

function liquid (input, hidden, output) {
    return new SArchitect.Liquid(input, hidden, output, 30, 5);
}

module.exports = Network;
