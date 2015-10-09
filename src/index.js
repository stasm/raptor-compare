'use strict';

const fs = require('fs');

const read = require('./read');
const parse = require('./parse');
const table = require('./table');

function compare(results) {
  return Array.from(results).map(
    ([origin, tries]) => table(origin, ...tries.values()));
}

function print(tables) {
  return tables.forEach(
    table => console.log(table.toString()));
}

function main(filename) {
  return read(fs.createReadStream(filename))
    .then(parse)
    .then(compare)
    .then(print)
    .catch(console.error);
}

exports.compare = compare;
exports.main = main;
