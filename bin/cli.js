#!/usr/bin/env node

'use strict';

var util = require('util');
var argv = require('minimist')(process.argv.slice(2));
var tps = require('../lib/index.js');

switch(argv._.length) {
  case 0:
    util.puts('Usage: test-perf-summary FILE1 [FILE2]');
    process.exit(1);
    break;
  case 1:
    argv.delta = false;
    break;
  case 2:
    argv.delta = true;
    break;
  default:
    util.error(Error('Too many files to compare.'));
    process.exit(1);
}

tps.execute(argv);
