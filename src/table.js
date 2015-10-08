'use strict';

const ttest = require('ttest');
const summary = require('summary');
const Table = require('easy-table');

function printPercent(val) {
  const prcnt = Math.floor(val * 100);
  switch (Math.sign(prcnt)) {
    case 1:
      return '+' + prcnt + '%';
    case 0:
      return '';
    default:
      return prcnt + '%';
  }
}

function printSig(val) {
  return !val ? '*' : '';
}

module.exports = function(origin, try1, try2) {
  return Object.keys(try1).reduce((t, mark) => {
    t.cell(origin, mark);

    const summary1 = summary(try1[mark]);
    const summary2 = summary(try2[mark]);
    const delta = summary2.mean() - summary1.mean();
    t.cell('Try 1', summary1.mean(), Table.Number(3));
    t.cell('Try 2', summary2.mean(), Table.Number(3));
    t.cell('Δ', delta, Table.Number(3));
    t.cell('Δ %', delta / summary1.mean(), printPercent);
    t.cell('Sig?', ttest(summary1._data, summary2._data).valid(), printSig);

    return t.newRow();

  }, new Table());
};
