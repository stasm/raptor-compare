'use strict';

/* global suite, suiteSetup, test */

const path = require('path');
const assert = require('assert');

const fs = require('fs');

require('babel/register');
const read = require('../src/read');
const parse = require('../src/parse');
const compare = require('../src/index').compare

const noop = () => undefined;

suite('Parse', function() {
  const metrics = path.join(__dirname, 'fixtures', 'metrics1.ldjson');
  let expected;

  suiteSetup(function() {
    expected = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, 'fixtures', 'parse1.json')).toString());
  });

  test('parses LDJSON', function(done) {
    return read(fs.createReadStream(metrics))
      .then(parse)
      .then(JSON.stringify)
      .then(JSON.parse)
      .then(data => assert.deepEqual(data, expected))
      .then(noop)
      .then(done, done);
  });
});

const removePrinters = cell => {
  delete cell.__printers;
  return cell;
};

suite('Compare', function() {
  const metrics = path.join(__dirname, 'fixtures', 'metrics1.ldjson');
  let expected;

  suiteSetup(function() {
    expected = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, 'fixtures', 'compare1.json')).toString());
  });

  test('compares series of runs', function(done) {
    return read(fs.createReadStream(metrics))
      .then(parse)
      .then(compare)
      .then(tables => tables[0].rows.map(removePrinters))
      .then(data => assert.deepEqual(data, expected))
      .then(noop)
      .then(done, done);
  });
});
