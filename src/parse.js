'use strict';

const extractValues = (seq, cur) =>
  Object.assign(
    seq, { [cur.Metric]: cur.Values });

module.exports = function(obj) {
  return Object.keys(obj).reduce(
    (seq, cur) =>
      Object.assign(
        seq, { [cur]: obj[cur].reduce(extractValues, {}) }),
    {});
};
