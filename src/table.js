'use strict';

const ttest = require('ttest');
const summary = require('summary');
const Table = require('easy-table');

function printPValue(val, width) {
  const sig = val < 0.05 ? '* ' : '  ';
  return Table.padLeft(sig + val.toFixed(2), width);
}

module.exports = function(origin, baseSeries, ...tries) {
  return Array.from(baseSeries.keys()).reduce((t, mark) => {
    t.cell(origin, mark);

    const numFormat = ['uss', 'pss', 'rss'].includes(mark) ?
      Table.number(3) : Table.number(0);

    const h0 = summary(baseSeries.get(mark));
    t.cell('base', h0.mean(), numFormat);

    tries.forEach((trySeries, i) => {
      i++;
      const h1 = summary(trySeries.get(mark));
      const delta = h1.mean() - h0.mean();
      const pval = ttest(h0._data, h1._data).pValue();
      t.cell('try ' + i, h1.mean(), numFormat);
      t.cell('delta ' + i, delta, numFormat);
      t.cell('p-value ' + i, pval, printPValue);
    });

    return t.newRow();
  }, new Table());
};
