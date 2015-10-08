'use strict';

const ttest = require('ttest');
const summary = require('summary');
const Table = require('easy-table');

function printSig(val) {
  return !val ? '*' : '';
}

module.exports = function(origin, try1, try2) {
  return Object.keys(try1).reduce((t, mark) => {
    t.cell(origin, mark);

    const summary1 = summary(try1[mark]);
    const summary2 = summary(try2[mark]);
    t.cell('Try 1', summary1.mean(), Table.Number(0));
    t.cell('try 2', summary2.mean(), Table.Number(0));
    t.cell('Δ', summary2.mean() - summary1.mean(), Table.Number(0));
    t.cell('Sig?', ttest(summary1._data, summary2._data).valid(), printSig);

    return t.newRow();

  }, new Table());
};
