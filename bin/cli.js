#!/usr/bin/env node

'use strict';

var util = require('util');
var tps = require('../src/tps.js');
var argv = require('minimist')(process.argv.slice(2), {
  alias: {
    app: 'a'
  }
});

switch(argv._.length) {
  case 0:
    util.puts('Usage:   test-perf-summary [OPTIONS] FILE1 [FILE2]');
    util.puts('Options:');
    util.puts('    -a APP, --app APP    Show stats just for APP');
    util.puts('                         (can be passed more than once)');
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

tps.print(argv);
