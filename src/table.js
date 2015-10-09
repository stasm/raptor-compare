'use strict';

const ttest = require('ttest');
const summary = require('summary');
const Table = require('easy-table');

function shortrev(rev) {
  return rev.slice(0, 4);
}

function printPValue(val, width) {
  const sig = val < 0.05 ? '* ' : '  ';
  return Table.padLeft(sig + val.toFixed(2), width);
}

module.exports = function(origin, baseSeries, ...tries) {
  return Array.from(baseSeries.get('data').keys()).reduce((t, mark) => {
    t.cell(origin, mark);

    const numFormat = ['uss', 'pss', 'rss'].includes(mark) ?
      Table.number(3) : Table.number(0);

    const h0 = summary(baseSeries.get('data').get(mark));
    const h0rev = shortrev(baseSeries.get('rev'));
    t.cell('base: ' + h0rev, h0.mean(), numFormat);

    tries.forEach((trySeries, i) => {
      const num = (i + 1) + ': ';
      const h1 = summary(trySeries.get('data').get(mark));
      const h1rev = shortrev(trySeries.get('rev'));
      const delta = h1.mean() - h0.mean();
      const pval = ttest(h0._data, h1._data).pValue();
      t.cell(num + h1rev, h1.mean(), numFormat);
      t.cell(num + 'delta', delta, numFormat);
      t.cell(num + 'p-value', pval, printPValue);
    });

    return t.newRow();
  }, new Table());
};
