'use strict';

const table = require('./table');

module.exports = function(results) {
  return Array.from(results).map(
    ([origin, tries]) => table(origin, ...tries.values()));
};
