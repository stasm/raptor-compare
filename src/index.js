'use strict';

const fs = require('fs');

const read = require('./read');
const parse = require('./parse');
const build = require('./build');

function print(tables) {
  return tables.forEach(
    table => console.log(table.toString()));
}

function main(filename) {
  return read(fs.createReadStream(filename))
    .then(parse)
    .then(build)
    .then(print)
    .catch(console.error);
}

exports.main = main;
