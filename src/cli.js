#!/usr/bin/env node

'use strict';

require('babel/polyfill');

const argv = require('minimist')(process.argv.slice(2));

if (argv.v || argv.version) {
  console.log(require('../package.json').version);
  process.exit(1);
}

if (argv.h || argv.help) {
  console.log(require('../package.json').description);
  console.log('Usage: raptor-compare [options] metrics.ldjson');
  console.log();
  console.log('Options:');
  console.log('  -h, --help     print this help');
  console.log('  -v, --version  print raptor-compare\'s version');
  process.exit(1);
}

if (argv._.length === 0) {
  console.log('Usage: raptor-compare metrics.ldjson');
  process.exit(1);
}

require('./index').main(argv._[0]);
