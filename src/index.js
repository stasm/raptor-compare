'use strict';

const promisify = require('promisify-node');
const fs = promisify('fs');

const parse = require('./parse.js');
const table = require('./table.js');

function read(filenames) {
  return Promise.all(
    filenames.map(file => fs.readFile(file).then(
      blob => parse(JSON.parse(blob))))).catch(
        console.error);
}

function compare(try1, try2) {
  return Object.keys(try1).map(
    origin => table(origin, try1[origin], try2[origin]));
}

function print(tables) {
  return tables.forEach(
    table => console.log(table.toString()));
}

exports.print = function(argv) {
  return read(argv._).then(
    Function.prototype.apply.bind(compare, null)).then(
    print);
};
