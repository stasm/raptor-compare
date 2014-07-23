'use strict';

var fs = require('fs');
var util = require('util');

var parse = require('./parse.js').parse;
var print = require('./print.js');

function printAll(deltaMode, results) {
  for (var app in results[0]) {
    if (deltaMode) {
      print.delta(app, results[0][app], results[1][app]);
    } else {
      print.summary(app, results[0][app]);
    }
  }
}

exports.execute = function(argv) {
  var len = argv._.length;
  var results = [];

  function onRead(err, data) {
    if (err) {
      util.error(err);
      process.exit(1);
    }

    results.push(parse(JSON.parse(data.toString())));
    if (--len === 0) {
      printAll(argv.delta, results);
    }
  }

  argv._.forEach(function(path) {
    fs.readFile(path, onRead);
  });
};


