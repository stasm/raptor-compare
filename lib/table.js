'use strict';

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

function printSig(val) {
  return !val ? '*' : '';
}

exports.summary = function(appName, app) {
  var t = new Table();

  for (var i = 0, evt; evt = KNOWN_TESTS[i]; i++) {
    t.cell(appName, evt.substr(10));
    if (app[evt]) {
      var base = summary(app[evt]);
      t.cell('Median', base.median(), Table.Number(0));
      t.cell('Mean', base.mean(), Table.Number(0));
      t.cell('Stdev', base.sd(), Table.Number(0));
    } else {
      t.cell('Median', '—', Table.LeftPadder());
      t.cell('Mean', '—', Table.LeftPadder());
      t.cell('Stdev', '—', Table.LeftPadder());
    }
    t.newRow();
  }

  return t;
};

exports.delta = function(appName, baseApp, patchedApp) {
  var t = new Table();
  var base, patch;

  for (var i = 0, evt; evt = KNOWN_TESTS[i]; i++) {
    t.cell(appName + ' (means in ms)', evt.substr(10));

    if (baseApp[evt]) {
      base = summary(baseApp[evt]);
      t.cell('Base', base.mean(), Table.Number(0));
    } else {
      t.cell('Base', '—', Table.LeftPadder());
    }

    if (patchedApp[evt]) {
      patch = summary(patchedApp[evt]);
      t.cell('Patch', patch.mean(), Table.Number(0));
    } else {
      t.cell('Patch', '—', Table.LeftPadder());
    }

    if (baseApp[evt] && patchedApp[evt]) {
      t.cell('Δ', patch.mean() - base.mean(), Table.Number(0));
      t.cell('Sig?', ttest(base._data, patch._data).valid(), printSig);
    } else {
      t.cell('Δ', '—', Table.LeftPadder());
      t.cell('Sig?', '—', Table.LeftPadder());
    }

    t.newRow();
  }

  return t;
};
