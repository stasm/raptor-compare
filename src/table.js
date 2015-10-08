'use strict';

var ttest = require('ttest');
var summary = require('summary');
var Table = require('easy-table');

function printSig(val) {
  return !val ? '*' : '';
}

exports.delta = function(appName, baseApp, patchedApp) {
  var t = new Table();
  var base, patch;

  for (var i = 0, evt; evt = Object.keys(baseApp)[i]; i++) {
    t.cell(appName, evt);

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
