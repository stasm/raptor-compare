'use strict';

/* jshint node:true, boss:true */

var fs = require('fs');
var util = require('util');

var argv = require('minimist')(process.argv.slice(2));
var ttest = require('ttest');
var summary = require('summary');
var Table = require('easy-table');

var DELTA_MODE = false;

switch(argv._.length) {
  case 0:
    util.puts('Usage: test-perf-summary FILE1 [FILE2]');
    process.exit(1);
    break;
  case 1:
    break;
  case 2:
    DELTA_MODE = true;
    break;
  default:
    util.error(Error('Too many files to compare.'));
    process.exit(1);
}

var KNOWN_TESTS = [
  'startup > moz-chrome-dom-loaded',
  'startup > moz-chrome-interactive',
  'startup > moz-app-visually-complete',
  'startup > moz-content-interactive',
  'startup > moz-app-loaded',
];

function parse(json) {
  var apps = {};
  for (var i = 0, app; app = json[i]; i++) {
    var name = app.stats.application.trim();
    apps[name] = {};

    for (var j = 0, pass; pass = app.passes[j]; j++) {
      apps[name][pass.title.trim()] = pass.mozPerfDurations;
    }

  }
  return apps;
}

function printSummary(appName, app) {
  var t = new Table();

  for (var i = 0, evt; evt = KNOWN_TESTS[i]; i++) {
    t.cell(appName, evt.substr(10));
    var base = summary(app[evt]);
    t.cell('Median', base.median(), Table.Number(0));
    t.cell('Mean', base.mean(), Table.Number(0));
    t.cell('Stdev', base.sd(), Table.Number(0));
    t.newRow();
  }

  util.puts(t.toString());
}

function printDelta(appName, baseApp, changeApp) {
  var t = new Table();

  for (var i = 0, evt; evt = KNOWN_TESTS[i]; i++) {
    t.cell(appName + ' (means in ms)', evt.substr(10));
    var base = summary(baseApp[evt]);
    var change = summary(changeApp[evt]);
    t.cell('Base', base.mean(), Table.Number(0));
    t.cell('Patch', change.mean(), Table.Number(0));
    t.cell('Δ', change.mean() - base.mean(), Table.Number(0));
    t.cell('Sig?', ttest(base._data, change._data).valid(), printSig);
    t.newRow();
  }

  util.puts(t.toString());
}

function printSig(val, width) {
  return !val ? '*' : '';
}

function printAll(results) {
  /* jshint boss:true */
  for (var app in results[0]) {
    if (DELTA_MODE) {
      printDelta(app, results[0][app], results[1][app]);
    } else {
      printSummary(app, results[0][app]);
    }
  }
}


function onRead(err, data) {
  if (err) {
    util.error(err);
    process.exit(1);
  }

  results.push(parse(JSON.parse(data.toString())));
  if (--len === 0) {
    printAll(results);
  }
}

var len = argv._.length;
var results = [];

argv._.forEach(function(path) {
  fs.readFile(path, onRead);
});

