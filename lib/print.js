'use strict';

var util = require('util');
var ttest = require('ttest');
var summary = require('summary');
var Table = require('easy-table');

var KNOWN_TESTS = [
  'startup > moz-chrome-dom-loaded',
  'startup > moz-chrome-interactive',
  'startup > moz-app-visually-complete',
  'startup > moz-content-interactive',
  'startup > moz-app-loaded',
];

function printSig(val, width) {
  return !val ? '*' : '';
}

exports.summary = function(appName, app) {
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
};

exports.delta = function(appName, baseApp, changeApp) {
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
};
