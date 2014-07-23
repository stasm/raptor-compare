'use strict';

var fs = require('fs');
var util = require('util');

var parse = require('./parse.js').parse;
var table = require('./table.js');

function print(deltaMode, results) {
  var t;
  for (var app in results[0]) {
    if (deltaMode) {
      t = table.delta(app, results[0][app], results[1][app]);
    } else {
      t = table.summary(app, results[0][app]);
    }
    util.puts(t.toString());
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
      print(argv.delta, results);
    }
  }

  argv._.forEach(function(path) {
    fs.readFile(path, onRead);
  });
};


