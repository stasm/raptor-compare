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

exports.exec = function(filename) {
  return read(fs.createReadStream(filename))
    .then(parse)
    .then(compare)
    .catch(console.error);
};

exports.print = function(filename) {
  return exports.exec(filename).then(print);
};
